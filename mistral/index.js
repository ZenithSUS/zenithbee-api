import { Mistral } from "@mistralai/mistralai";
import { SYSTEM_PROMPT } from "../utils/system-prompt.js";
import { tools } from "../tools/tools.js";
import {
  fetchProducts,
  fetchProductByLength,
  fetchPopularProducts,
  fetchReservedByLength,
  fetchProductByAttribute
} from "../tools/agents.js";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;

// Pre-map function references for faster lookups
const availableFunctions = {
  fetchProducts,
  fetchProductByLength,
  fetchPopularProducts,
  fetchReservedByLength,
  fetchProductByAttribute
};

// Create a singleton client to reuse connections
const client = new Mistral({
  apiKey: apiKey,
});

export const AI_Response = async (message) => {
  // Initialize messages array with system prompt and user message
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: message },
  ];

  // Set a maximum number of iterations to prevent infinite loops
  const MAX_ITERATIONS = 5;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    try {
      // Make API request with timeout
      const response = await client.chat.complete({
        model: "mistral-large-latest",
        messages: messages,
        tools: tools,
        temperature: 0.7, // Adjust based on your needs
      });

      const responseMessage = response.choices[0].message;
      messages.push(responseMessage);

      if (response.choices[0].finishReason === "stop") {
        return responseMessage.content;
      } else if (response.choices[0].finishReason === "tool_calls") {
        // Process all tool calls in parallel for speed improvement
        const toolCalls = responseMessage.toolCalls;

        // Map each tool call to a promise
        const toolPromises = toolCalls.map(async (toolCall) => {
          const fnObj = toolCall.function;
          const fnName = fnObj.name;
          let fnArgs;

          try {
            fnArgs = JSON.parse(fnObj.arguments);
            console.log(`Function ${fnName} arguments:`, fnArgs);
          } catch (e) {
            console.error(`Invalid JSON in tool arguments: ${fnObj.arguments}`);
            return {
              role: "tool",
              toolCallId: toolCall.id,
              name: fnName,
              content: JSON.stringify({ error: "Invalid arguments format" }),
            };
          }

          if (!availableFunctions[fnName]) {
            console.error(`Function ${fnName} not found`);
            return {
              role: "tool",
              toolCallId: toolCall.id,
              name: fnName,
              content: JSON.stringify({
                error: `Function ${fnName} not available`,
              }),
            };
          }

          try {
            const fnRes = await availableFunctions[fnName](fnArgs);
            console.log(`Function ${fnName} result:`, fnRes);
            return {
              role: "tool",
              toolCallId: toolCall.id,
              name: fnName,
              content: JSON.stringify(fnRes),
            };
          } catch (error) {
            console.error(`Error executing ${fnName}:`, error);
            return {
              role: "tool",
              toolCallId: toolCall.id,
              name: fnName,
              content: JSON.stringify({
                error: error.message || "Tool execution failed",
              }),
            };
          }
        });

        // Wait for all tool calls to complete and add results to messages
        const toolResults = await Promise.all(toolPromises);
        messages.push(...toolResults);
      }
    } catch (error) {
      console.error("Error in AI_Response:", error);

      // Return a meaningful error message after retries fail
      if (i === MAX_ITERATIONS - 1) {
        return `Sorry, I encountered an error: ${error.message}`;
      }

      // Add a small delay before retry
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return "I wasn't able to complete the response after several attempts.";
};

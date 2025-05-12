import { Mistral } from "@mistralai/mistralai";
import { SYSTEM_PROMPT } from "../utils/system-prompt.js";
import { tools } from "../tools/tools.js";
import {
  fetchProducts,
  fetchProductByLength,
  fetchPopularProducts,
  fetchReservedByLength,
  fetchProductByAttribute,
} from "../tools/agents.js";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;

const availableFunctions = {
  fetchProducts,
  fetchProductByLength,
  fetchPopularProducts,
  fetchReservedByLength,
  fetchProductByAttribute,
};

const client = new Mistral({
  apiKey: apiKey,
});

export const AI_Response = async (message) => {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: message },
  ];

  const MAX_ITERATIONS = 5;
  const MAX_TOOL_CALLS = 3;
  let toolCallCount = 0;
  const toolCache = new Map();

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    try {
      const response = await client.chat.complete({
        model: "mistral-large-latest",
        messages,
        tools,
        temperature: 0.7,
        maxTokens: 10000,
        toolChoice: "auto",
      });

      const responseMessage = response.choices[0].message;
      messages.push(responseMessage);

      if (response.choices[0].finishReason === "stop") {
        return responseMessage.content;
      }

      if (response.choices[0].finishReason === "tool_calls") {
        const toolCalls = responseMessage.toolCalls;
        toolCallCount += toolCalls.length;

        if (toolCallCount > MAX_TOOL_CALLS) {
          console.warn("[AI_Response] Exceeded tool call limit.");
          return "Too many tool calls. Ending session to avoid infinite loop.";
        }

        const toolPromises = toolCalls.map(async (toolCall) => {
          const fnObj = toolCall.function;
          const fnName = fnObj.name;
          let fnArgs;

          try {
            fnArgs = JSON.parse(fnObj.arguments);
            console.log(`[ToolCall] ${fnName} args:`, fnArgs);
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

          const cacheKey = `${fnName}-${JSON.stringify(fnArgs)}`;
          if (toolCache.has(cacheKey)) {
            console.log(`[ToolCache] Returning cached result for ${fnName}`);
            return {
              role: "tool",
              toolCallId: toolCall.id,
              name: fnName,
              content: JSON.stringify(toolCache.get(cacheKey)),
            };
          }

          try {
            console.time(`[ToolExec] ${fnName}`);
            const fnRes = await availableFunctions[fnName](fnArgs);
            console.timeEnd(`[ToolExec] ${fnName}`);
            toolCache.set(cacheKey, fnRes);
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

        const toolResults = await Promise.all(toolPromises);
        messages.push(...toolResults);
      }
    } catch (error) {
      console.error("Error in AI_Response:", error);

      if (i === MAX_ITERATIONS - 1) {
        return `Sorry, I encountered an error: ${error.message}`;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return {
    message: "I wasn't able to complete the response after several attempts.",
    product: [],
    reserved: [],
  };
};

import { Mistral } from "@mistralai/mistralai";
import { SYSTEM_PROMPT } from "../utils/system-prompt.js";
import { tools } from "../tools/tools.js";
import {
  fetchProducts,
  fetchProductByLength,
  fetchPopularProducts,
  fetchReservedByLength
} from "../tools/agents.js";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;

const availableFunctions = {
  fetchProducts,
  fetchProductByLength,
  fetchPopularProducts,
  fetchReservedByLength
};

const client = new Mistral({ apiKey: apiKey });

export const AI_Response = async (message) => {
  const messages = [
    { role: "system", content: `${SYSTEM_PROMPT}` },
    { role: "user", content: message },
  ];

  for (let i = 0; i < 5; i++) {
    const response = await client.chat.complete({
      model: "mistral-large-latest",
      messages: messages,
      temperature: 0.5,
      tools: tools,
    
    });

    

    messages.push(response.choices[0].message);
    console.log(response.choices[0].finishReason);

    if (response.choices[0].finishReason === "stop") {
      return response.choices[0].message.content;
    } else if (response.choices[0].finishReason === "tool_calls") {
      const fnObj = response.choices[0].message.toolCalls[0].function;
      const fnName = fnObj.name;
      const fnArgs = JSON.parse(fnObj.arguments);

      const fnRes = await availableFunctions[fnName](fnArgs);

      messages.push({
        role: "tool",
        toolCallId: response.choices[0].message.toolCalls[0].id,
        name: fnName,
        content: JSON.stringify(fnRes),
      });
    }
  }
};

import { AI_Response } from "../mistral/index.js";

export const getMistralResponse = async (req, res) => {
  try {
    const response = await AI_Response(
      "Give me the most lowest price of ZenithBee Product"
    );

    return res.status(200).json(JSON.parse(response));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const postMistralResponse = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).json({
        message: "Unprocessable Entity",
      });
    }

    const { input, userId } = req.body;
    const finalInput = `User: ${userId} ${input}`;
    console.log(finalInput);
    const response = await AI_Response(finalInput);

    return res.status(200).json(JSON.parse(response));
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

import { AI_Response } from "../mistral/index.js";

export const getMistraResponse = async (req, res) => {
  try {
    const response = await AI_Response("Give me 5 ZenithBee Products");

    return res.status(200).json(JSON.parse(response));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const MistralAI = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).json({
        message: "Unprocessable Entity",
      });
    }

    const { message } = req.body;
    const response = await AI_Response(message);
    return res.status(200).json(JSON.parse(response));
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

import { createUser } from "../appwrite/users";

export const addUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).json({
        message: "Unprocessable Entity",
      });
    }

    await createUser(req.body);
    return res.status(200).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

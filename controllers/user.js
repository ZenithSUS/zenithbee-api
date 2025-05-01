import { createUser, getUsers } from "../appwrite/users.js";

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

export const fetchUsers = async (req, res) => {
  try {

    if (req.method !== 'GET') {
      return res.status(405).json({
        status: 405,
        message: "Method Not Allowed",
      });
    }

    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};
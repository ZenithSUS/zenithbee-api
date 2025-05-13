import {
  createUser,
  getUsers,
  getUser,
  getUserAddresses,
  updateUserAddress,
} from "../appwrite/users.js";

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
    if (req.method !== "GET") {
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

export const fetchUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUser(userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const fetchUserAddresses = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unprocessable Entity",
      });
    }

    const addresses = await getUserAddresses(userId);
    return res.status(200).json(addresses);
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const changeUserAddress = async (req, res) => {
  try {
    const documentId = req.params.id;

    if (!req.body) {
      return res.status(401).json({
        message: "Unprocessable Entity",
      });
    }

    await updateUserAddress(req.body, documentId);
    return res.status(200).json({
      message: "Address Updated Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

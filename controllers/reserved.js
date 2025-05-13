import {
  createReserved,
  deleteReserved,
  getReserved,
} from "../appwrite/reserved.js";

export const fetchReserved = async (req, res) => {
  try {
    const userId = req.params.id;
    const reserved = await getReserved(userId);
    res.status(200).json(reserved);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const removeReserved = async (req, res) => {
  try {
    const reserveId = req.params.id;

    await deleteReserved(reserveId);
    res.status(200).json({ message: "Reserved deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const addReserved = async (req, res) => {
  try {
    const reserved = await createReserved(req.body);
    res.status(200).json(reserved);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

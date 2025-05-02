import {
  createReserved,
  deleteReserved,
  getReserved,
} from "../appwrite/reserved.js";

export const fetchReserved = async (req, res) => {
  try {
    const { userId } = req.params;
    const reserved = await getReserved(userId);
    res.status(200).send(reserved);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const removeReserved = async (req, res) => {
  try {
    const { reservedId } = req.params;
    const reserved = await deleteReserved(reservedId);
    res.status(200).send(reserved);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const addReserved = async (req, res) => {
  try {
    const reserved = await createReserved(req.body);
    res.status(200).send(reserved);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

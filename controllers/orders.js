import {
  createOrder,
  deleteOrder,
  getOrdersByUser,
} from "../appwrite/orders.js";

export const addOrder = async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const fetchOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const removeOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await deleteOrder(orderId);
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

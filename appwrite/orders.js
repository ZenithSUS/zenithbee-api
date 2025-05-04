import { DATABASE_ID, ORDER_ID, databases } from "./index.js";
import { ID, Query, Permission, Role } from "node-appwrite";

export const createOrder = async (data) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      ORDER_ID,
      ID.unique(),
      data,
      [Permission.read(Role.any()), Permission.write(Role.user(data.user))]
    );
  } catch (error) {
    console.error(error);
  }
};

export const getOrdersByUser = async (userId) => {
  try {
    let allOrders = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        ORDER_ID,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc("$createdAt"),
        ]
      );

      if (documents.length === 0) break;

      allOrders = [...allOrders, ...documents];
      offset += limit;
    }

    const allOrdersByUser = allOrders.filter((o) => o.userId === userId);

    const groupOrders = new Map();

    allOrdersByUser.forEach((o) => {
      if (!groupOrders.has(o.orderId)) {
        groupOrders.set(o.orderId, []);
      }
      groupOrders.get(o.orderId).push(o);
    });

    return Array.from(groupOrders.entries()).map(([id, orders]) => {
      const totalPrice = orders.reduce(
        (total, order) => total + parseFloat(order.price) || 0,
        0
      );

      const totalQuantity = orders.reduce(
        (total, order) => total + parseFloat(order.quantity) || 0,
        0
      );
      return {
        orderId: id,
        orders,
        totalPrice,
        totalQuantity,
        status: orders[0].status,
      };
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    return await databases.deleteDocument(DATABASE_ID, ORDER_ID, orderId);
  } catch (error) {
    console.error(error);
  }
};

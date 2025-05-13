import { DATABASE_ID, ORDER_ID, PRODUCT_ID, databases } from "./index.js";
import { ID, Query, Permission, Role } from "node-appwrite";

export const createOrder = async (data) => {
  try {
    await databases.createDocument(DATABASE_ID, ORDER_ID, ID.unique(), data, [
      Permission.read(Role.any()),
      Permission.write(Role.user(data.user)),
    ]);

    const product = await databases.getDocument(
      DATABASE_ID,
      PRODUCT_ID,
      data.product
    );

    return await databases.updateDocument(
      DATABASE_ID,
      PRODUCT_ID,
      data.product,
      {
        bought: (product.bought || 0) + parseInt(data.quantity),
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
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
          Query.equal("user", userId),
          Query.orderDesc("$createdAt"),
        ]
      );

      if (documents.length === 0) break;

      allOrders = [...allOrders, ...documents];
      offset += limit;
    }

    const allOrdersByUser = allOrders;

    const groupOrders = new Map();

    allOrdersByUser.forEach((o) => {
      if (!groupOrders.has(o.orderId)) {
        groupOrders.set(o.orderId, {
          orderId: o.orderId,
          address: o.address,
          status: o.status,
          orders: [],
        });
      }
      groupOrders.get(o.orderId).orders.push(o);
    });

    return Array.from(groupOrders.values()).map((group) => {
      const totalPrice = group.orders.reduce(
        (total, order) => total + (parseFloat(order.price) || 0),
        0
      );

      const totalQuantity = group.orders.reduce(
        (total, order) => total + (parseFloat(order.quantity) || 0),
        0
      );

      return {
        ...group,
        totalPrice,
        totalQuantity,
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

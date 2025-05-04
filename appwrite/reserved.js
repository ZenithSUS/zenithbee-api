import { DATABASE_ID, RESERVED_ID, databases } from "./index.js";
import { ID, Query, Permission, Role } from "node-appwrite";

export const createReserved = async (data) => {
  try {
    console.log(data);
    return await databases.createDocument(
      DATABASE_ID,
      RESERVED_ID,
      ID.unique(),
      data,
      [Permission.read(Role.any()), Permission.write(Role.user(data.user))]
    );
  } catch (error) {
    console.error(error);
  }
};

export const getReserved = async (userId) => {
  try {
    let allReserved = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        RESERVED_ID,
        [Query.limit(limit), Query.offset(offset), Query.orderDesc("$createdAt")]
      );

      if (documents.length === 0) break;

      allReserved = [...allReserved, ...documents];
      offset += limit;
    }

    const allReservedByUser = allReserved.filter((r) => r.userId === userId);
    
    const groupReserved = new Map();

    allReservedByUser.forEach((r) => {
      if(!groupReserved.has(r.reservedId)) {
        groupReserved.set(r.reservedId, []);
      } 
        groupReserved.get(r.reservedId).push(r);
      
    });

    return Array.from(groupReserved.entries()).map(([id, items]) => {
      const totalPrice = items.reduce(
        (sum, item) =>
          sum + (parseFloat(item.price) || 0),
        0,
      );
      const totalQuantity = items.reduce(
        (sum, item) =>
          sum + (parseInt(item.quantity) || 0),
        0,
      );

      return {
        reservedId: id,
        items,
        totalPrice,
        totalQuantity,
      };
    });
  } catch (error) {
    console.error("Error fetching reserved:", error);
    throw error;
  }
};

export const deleteReserved = async (reservedId) => {
  try {
    
    let allReserved = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        RESERVED_ID,
        [Query.limit(limit), Query.offset(offset)]
      );

      if (documents.length === 0) break;

      allReserved = [...allReserved, ...documents];
      offset += limit;
    }

    allReserved.forEach(async (r) => {
      if (r.reservedId === reservedId) {
        await databases.deleteDocument(DATABASE_ID, RESERVED_ID, r.$id);
      }
    });

  } catch (error) {
    console.error(error);
  }
};

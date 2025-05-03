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
        [Query.limit(limit), Query.offset(offset), Query.orderAsc("$createdAt")]
      );

      if (documents.length === 0) break;

      allReserved = [...allReserved, ...documents];
      offset += limit;
    }

    return allReserved.filter((r) => r.userId === userId);
  } catch (error) {
    console.error("Error fetching reserved:", error);
    throw error;
  }
};

export const deleteReserved = async (reservedId) => {
  try {
    console.log(reservedId);
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

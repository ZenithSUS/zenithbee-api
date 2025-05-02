import { DATABASE_ID, PRODUCT_ID, databases } from "./index.js";
import { ID, Query, Permission, Role } from "node-appwrite";

export const createProduct = async (data) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      PRODUCT_ID,
      ID.unique(),
      data,
      [Permission.read(Role.any()), Permission.write(Role.user(data.userId))]
    );
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    let allProducts = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        PRODUCT_ID,
        [Query.limit(limit), Query.offset(offset)]
      );


      if (documents.length === 0) break;

      allProducts = [...allProducts, ...documents];
      offset += limit;
    }

    return allProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

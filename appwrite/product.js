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

export const getPopularProducts = async () => {
  try {
    const { documents } = await databases.listDocuments(
      DATABASE_ID,
      PRODUCT_ID,
      [Query.limit(3), Query.orderDesc("bought")]
    );

    return documents;
  } catch (error) {
    console.error("Error counting ordered products:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const limit = 1000;
    const { documents } = await databases.listDocuments(
      DATABASE_ID,
      PRODUCT_ID,
      [Query.limit(limit)]
    );

    return documents;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductsByAttribute = async (value) => {
  try {
    const searchValue = value.trim().toLowerCase();
    const { documents } = await databases.listDocuments(
      DATABASE_ID,
      PRODUCT_ID,
      [
        Query.or([
          Query.search("name", searchValue),
          Query.search("description", searchValue),
          Query.search("foodType", searchValue),
        ]),
        Query.limit(10),
      ]
    );

    return documents;
  } catch (error) {
    console.error("Error fetching products by attribute:", error);
    throw error;
  }
};
export const getProductsByLength = async (length) => {
  try {
    const limit = parseInt(length);
    const { documents } = await databases.listDocuments(
      DATABASE_ID,
      PRODUCT_ID
    );

    const shuffled = documents.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, limit);
  } catch (error) {
    console.error("Error fetching products by length:", error);
    throw error;
  }
};

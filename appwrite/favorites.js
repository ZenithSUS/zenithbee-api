import { DATABASE_ID, FAVORITE_ID, databases } from "./index.js";
import { ID, Query, Permission, Role } from "node-appwrite";

export const createFavorite = async (data) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      FAVORITE_ID,
      ID.unique(),
      data,
      [Permission.read(Role.any()), Permission.write(Role.user(data.user))]
    );
  } catch (error) {
    console.error(error);
  }
};

export const getFavorites = async (userId) => {
  try {
    let allFavorites = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        FAVORITE_ID,
        [Query.limit(limit), Query.offset(offset)]
      );

      if (documents.length === 0) break;

      allFavorites = [...allFavorites, ...documents];
      offset += limit;
    }

    return allFavorites.filter((f) => f.userId === userId);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const deleteFavorite = async (favoriteId) => {
  try {
    console.log(favoriteId);
    return await databases.deleteDocument(
      DATABASE_ID,
      FAVORITE_ID,
      favoriteId
    )
  } catch (error) {
    console.error(error);
  }
};
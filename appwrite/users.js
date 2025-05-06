import { DATABASE_ID, USER_ID, databases, users } from "./index.js";
import sdk, { Query, Permission, Role } from "node-appwrite";

export const createUser = async (data) => {
  try {
    const { password, userId, ...values } = data;
    await users.updateLabels(userId, ["user", "user"]);

    return await databases.createDocument(
      DATABASE_ID,
      USER_ID,
      userId,
      values,
      [Permission.read(Role.any()), Permission.write(Role.user(userId))]
    );
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
    let allUsers = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        USER_ID,
        [Query.limit(limit), Query.offset(offset)]
      );

      if (documents.length === 0) break;

      allUsers = [...allUsers, ...documents];
      offset += limit;
    }

    return allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const { documents } = await databases.listDocuments(
      DATABASE_ID,
      USER_ID,
      userId
    );

    const { email, profileImage, address, $createdAt } = documents[0];

    return {
      fullname: `${documents[0].firstName} ${documents[0].middleName} ${documents[0].lastName}`,
      email,
      address,
      profileImage,
      $createdAt,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const getUserAddresses = async (userId) => {
  try {
    const { documents } = await databases.listDocuments(
      DATABASE_ID,
      USER_ID,
      userId
    );

    const { address, email } = documents[0];

    return {
      address,
      email,
    };
  } catch (error) {
    console.error("Error getting user addresses:", error);
  }
};

export const updateUserAddress = async (data, documentId) => {
  try {
    const result = await databases.updateDocument(
      DATABASE_ID,
      USER_ID,
      documentId,
      { address: data }
    );

    return result;
  } catch (error) {
    console.error("Error Updating Address:", error);
  }
};

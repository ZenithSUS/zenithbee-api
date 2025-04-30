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
  let allUsers = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const { documents } = await databases.listDocuments(DATABASE_ID, USER_ID, [
      Query.limit(limit),
      Query.offset(offset),
    ]);
    if (documents.length === 0) break;

    allUsers += [...allUsers, ...documents];

    offset += limit;
  }

  return allUsers;
};

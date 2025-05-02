import { Client, Databases, Users, Storage } from "node-appwrite";

const client = new Client();
const ENDPOINT = process.env.APPWRITE_ENDPOINT;
const API_KEY = process.env.APPWRITE_API_KEY;
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;

client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);

export const databases = new Databases(client);
export const users = new Users(client);
export const storage = new Storage(client);

export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
export const USER_ID = process.env.APPWRITE_USER_ID;
export const PRODUCT_ID = process.env.APPWRITE_PRODUCT_ID;
export const FAVORITE_ID = process.env.APPWRITE_FAVORITE_ID;
export const RESERVED_ID = process.env.APPWRITE_RESERVED_ID;
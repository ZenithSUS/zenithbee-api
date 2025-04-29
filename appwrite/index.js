import { Client } from "node-appwrite";

const client = new Client();

client
  .setEndpoint("https://<REGION>.cloud.appwrite.io/v1")
  .setProject("<PROJECT_ID>")
  .setKey("<YOUR_API_KEY>");

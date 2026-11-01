import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USESRNAME}:${process.env.MONGODB_PASSWOED}@cluster0.4dwew1j.mongodb.net/`);
const db = client.db("studio-space");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
   emailAndPassword: { 
    enabled: true, 
  },
});
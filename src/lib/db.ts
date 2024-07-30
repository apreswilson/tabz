import mongoose, { Mongoose } from "mongoose";

interface MongooseDefaults {
   conn: Mongoose | null;
   promise: Promise<Mongoose> | null;
}

let mongooseDefaults: MongooseDefaults = {
   conn: null,
   promise: null
}

export async function dbConnect () {
   try {
      if (mongooseDefaults.conn) {
         console.log("Connected from previous");
         return mongooseDefaults.conn;
      } else {
         const connectionString = process.env.MONGODB_URI as string;

         const promise = mongoose.connect(connectionString, {
            autoIndex: true,
         })

         mongooseDefaults = {
            conn: await promise,
            promise,
         }

         console.log("Newly Connected");
         return await promise;
      }
   } catch (error) {
      console.error("Error connecting to the database:", error);
      throw new Error("Database connection failed");
   }
}

export const disconnect = () => {
   if (!mongooseDefaults.conn) {
      return;
   }
   mongooseDefaults.conn = null;
   mongoose.disconnect();
}
import mongoose from "mongoose";

const connectionStr = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@next-translate-db.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;

if (!connectionStr) {
  throw new Error("Please provide a valid connection string.");
}

const connectDB = async () => {
  if (mongoose.connection?.readyState >= 1) {
    console.log("Database is already connected.");
    return;
  }
  try {
    await mongoose.connect(connectionStr);
    console.log("Connected to the database successfully.");
  } catch (err) {
    console.error("Failed to connect to the database.", err);
  }
};

export default connectDB;

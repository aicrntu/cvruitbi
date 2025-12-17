import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    const DB_NAME = process.env.DB_NAME || "cvruitbi";

    if (!MONGO_URI) {
      throw new Error("❌ MONGO_URI is missing in .env file");
    }

    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });

    console.log(`✅ MongoDB Connected Successfully → DB: ${DB_NAME}`);

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;



import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; 

const encodedDbName = encodeURIComponent("Course2_Python");
const connectionSrt = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.j9gms.mongodb.net/${encodedDbName}?retryWrites=true&w=majority&appName=Cluster0`;

const projectSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true }, 
  answer: { type: String, required: true },
});

const Project = mongoose.models.Basic || mongoose.model("Basic", projectSchema, "Basic");

mongoose.set("debug", true);

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("✅ Already connected to MongoDB.");
    return;
  }
  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(connectionSrt);
    console.log("✅ Successfully connected to MongoDB.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error(`Database connection failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function GET() {
  try {
    await connectDB();

    const data = await Project.find();
    
    if (!data || data.length === 0) {
      return NextResponse.json({ result: "No data found" }, { status: 404 });
    }

    return NextResponse.json({ result: data });
  } catch (error) {
    console.error("Error in GET route:", error);
    return NextResponse.json({ 
      error: "Failed to fetch data", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
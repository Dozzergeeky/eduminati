import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; 

const coursedetailsDB = encodeURIComponent("Course");

//const connectionSrt = `mongodb+srv://${process.env.MONGODB_USERNAME}:${cP4AQnQhPBBImzly}@cluster1.rltwq.mongodb.net/${coursedetailsDB}?retryWrites=true&w=majority&appName=Cluster1`;
const connectionSrt = `mongodb+srv://abhattacharya215:cP4AQnQhPBBImzly@cluster1.rltwq.mongodb.net/${coursedetailsDB}?retryWrites=true&w=majority&appName=Cluster1`;

const courseSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  sections: { type: [{ type: [{ type: String, required: true }, { type: [String], required: true }], required: true }], required: true }
});

const CourseNew = mongoose.models.C_Details || mongoose.model("C_Details", courseSchema, "C_Details");

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

export async function GET(request: Request) {
  try {
    await connectDB();
    const data = await CourseNew.find();
    
    if (!data || data.length === 0) {
      return NextResponse.json({ result: "No data found" }, { status: 404 });
    }
    return NextResponse.json({ result: data });
  } 
  catch (error) {
    console.error("Error in GET route:", error);
    return NextResponse.json({ 
      error: "Failed to fetch data", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
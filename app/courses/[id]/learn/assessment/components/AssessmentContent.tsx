"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

const Project = (mongoose.models && mongoose.models.Basic) || mongoose.model("Basic", projectSchema, "Basic");

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

let data: { question: string; options: string[]; answer: string }[] = [];

export async function GET() {
  try {
    await connectDB();

    data = await Project.find();
    
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

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface CourseData {
  id: string;
  title: string;
  instructor: string;
  chapters: never[];
}

interface AssessmentContentProps {
  courseData: CourseData;
}

export default function AssessmentContent({
  courseData,
}: AssessmentContentProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [attemptedQuestions, setAttemptedQuestions] = useState<number[]>([]);
  const totalQuestions = 10;
  const score = "5/10";

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("/api/projects");
        const result = await response.json();
        const fetchedQuestions = result.result.map((item: any, index: number) => ({
          id: index + 1,
          text: item.question,
          options: item.options.map((option: string, idx: number) => ({
            id: String.fromCharCode(65 + idx), 
            text: option,
          })),
        }));
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, []);

  const getQuestionStatus = (questionNumber: number) => {
    if (questionNumber === currentQuestion) return "current";
    if (attemptedQuestions.includes(questionNumber)) return "attempted";
    return "not-visited";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6  grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="space-y-6 pl-4 py-4 pr-8 border-r">
          <h1 className="text-2xl font-bold text-center">{courseData.title}</h1>
          <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md font-semibold">
            Start Test
          </Button>

          {/* Test Statistics */}
          <div className="flex justify-center bg-gray-50 p-2 rounded-2xl shadow w-20 mx-auto">
            <div className="text-xl font-bold text-indigo-600">{score}</div>
          </div>

          {/* Question Grid */}
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(
              (num) => (
                <button
                  key={num}
                  onClick={() => setCurrentQuestion(num)}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold shadow-md transition-all duration-200",
                    getQuestionStatus(num) === "current" &&
                      "bg-red-500 text-white",
                    getQuestionStatus(num) === "attempted" &&
                      "bg-green-500 text-white",
                    getQuestionStatus(num) === "not-visited" &&
                      "bg-gray-300 text-gray-700"
                  )}
                >
                  {num}
                </button>
              )
            )}
          </div>

          {/* Legend for Question Status */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500"></div>
              <span className="text-sm text-gray-700">Attempted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500"></div>
              <span className="text-sm text-gray-700">Current</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 justify-center">
              <div className="w-4 h-4 bg-gray-300"></div>
              <span className="text-sm text-gray-700">Unattempted</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="my-auto md:col-span-3 space-y-6 p-4">
          {questions.map(
            (question) =>
              question.id === currentQuestion && (
                <div key={question.id} className="space-y-6">
                  {/* Question */}
                  <div className="bg-indigo-100 p-4 rounded-lg shadow flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-400 text-white flex items-center justify-center text-lg font-semibold rounded-full">
                      {question.id}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {question.text}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="space-y-4">
                    {question.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedOption(option.id)}
                        className={cn(
                          "w-full p-4 text-left rounded-lg shadow-sm transition-colors font-medium border",
                          selectedOption === option.id
                            ? "bg-indigo-500 text-white border-indigo-700"
                            : "bg-white hover:bg-gray-100 border-gray-300"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-indigo-600">
                            {option.id}
                          </span>
                          <span>{option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 1}
              className="bg-gray-200 hover:bg-gray-300 text-gray-600"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={currentQuestion === totalQuestions}
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

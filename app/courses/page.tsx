"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, Mail, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const courses = [
  {
    id: 1,
    title: "C++ Programming: From Zero to Hero 🚀",
    category: "PROGRAMMING",
    instructor: {
      name: "Subhajit S",
      role: "DSA Expert",
      avatar:
        "https://ui-avatars.com/api/?name=S+S&background=random",
    },
    thumbnail:
      "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
  },
  {
    id: 2,
    title: "Python Prodigy: From Penny to Shelly 📈",
    category: "PROGRAMMING",
    instructor: {
      name: "Debargha B",
      role: "Software Developer",
      avatar:
        "https://ui-avatars.com/api/?name=D+B&background=random",
    },
    thumbnail:
      "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg",
  },
  {
    id: 3,
    title: "Figma to Frontend: UI/UX Design Masterclass 🔥",
    category: "FRONTEND",
    instructor: {
      name: "Tridib P",
      role: "Frontend Developer",
      avatar:
        "https://ui-avatars.com/api/?name=T+P&background=random",
    },
    thumbnail:
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
  },
  {
    id: 4,
    title: "Basic Manufacturing Processes & Techniques 🏭🔧",
    category: "ENGINEERING",
    instructor: {
      name: "Anirban B",
      role: "Civil Engineer",
      avatar:
        "https://ui-avatars.com/api/?name=A+B&background=random",
    },
    thumbnail:
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
  },
  {
    id: 5,
    title: "Master Thermodynamics: Energy, Heat & Work 🔥❄️",
    category: "PHYSICS",
    instructor: {
      name: "Ayan B",
      role: "Thermodynamics Expert",
      avatar:
        "https://ui-avatars.com/api/?name=A+B&background=random",
    },
    thumbnail:
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
  }
];

const mentors = [
  {
    name: "Subhajit S",
    role: "DSA Expert",
    avatar: "https://ui-avatars.com/api/?name=S+S&background=random",
  },
  {
    name: "Debargha B",
    role: "Software Developer",
    avatar: "https://ui-avatars.com/api/?name=D+B&background=random",
  },
  {
    name: "Tridib P",
    role: "Frontend Developer",
    avatar: "https://ui-avatars.com/api/?name=T+P&background=random",
  },
  {
    name: "Anirban B",
    role: "Civil Engineer",
    avatar: "https://ui-avatars.com/api/?name=A+B&background=random",
  },
  {
    name: "Ayan B",
    role: "Thermodynamics Expert",
    avatar: "https://ui-avatars.com/api/?name=A+B&background=random",
  },
];

export default function CoursesPage() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get("search") || "";
  const [index, setIndex] = useState(0);
  
  // Split comma-separated categories
  const categories = searchCategory
    .split(",")
    .map((cat) => cat.trim().toLowerCase())
    .filter(Boolean);

  // Filter courses if any category is given
  const filteredCourses = categories.length
    ? courses.filter((c) =>
        categories.some((cat) =>
          c.category.toLowerCase().includes(cat)
        )
      )
    : courses;

  return (
    <div className="min-h-screen bg-slate-50 pl-10">
      <div className="flex">
        <div className="flex-1">
          <div className="p-8">
            {/* Featured Banner */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl p-8 mb-12 text-primary-foreground">
              <h1 className="text-4xl font-bold mb-4">
                Sharpen Your Skills With
                <br />
                Professional Online Courses
              </h1>
                
              <Button variant="secondary" className="mt-4">
                Join Now
              </Button>
            </div>

            {/* Continue Watching */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Courses</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Link
                    href={`/courses/${course.id}`}
                    key={course.id}
                    className="transition-transform hover:scale-[1.02]"
                  >
                    <Card className="overflow-hidden">
                      <div className="aspect-video relative">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="space-y-2">
                        <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {course.category}
                        </div>
                        <CardTitle className="line-clamp-2 text-lg">
                          {course.title}
                        </CardTitle>
                      </CardHeader>
                      <CardFooter>
                        <div className="flex items-center gap-3">
                          <Image
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <div className="font-medium">
                              {course.instructor.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {course.instructor.role}
                            </div>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 flex-shrink-0 border-l min-h-screen sticky top-0 overflow-y-auto max-h-screen scroll-smooth transition-all duration-300">
          <div className="p-10 space-y-8">
            {/* User Profile */}
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center gap-4 mb-2">
                <Link href="/profile">
                  <Image
                    src={user?.imageUrl || "User"}
                    alt={user?.fullName || "User"}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </Link>
                <div className="text-center">
                  <h2 className="font-semibold text-lg">Welcome Back {user?.firstName || "User"}!</h2>
                  <p className="text-sm text-muted-foreground">
                    Continue Your Journey
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Mail className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Your Mentor */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Your Mentor</h2>
                <Button variant="link" className="text-primary text-sm">
                  See All
                </Button>
              </div>

              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={mentor.avatar}
                        alt={mentor.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {mentor.role}
                        </div>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

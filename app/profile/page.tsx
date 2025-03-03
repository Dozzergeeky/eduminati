"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  GraduationCap,
  Users,
  Clock,
  MapPinned,
  Activity,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaReact, FaJs } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";

const skills = [
  "C++",
  "Java",
  "Python",
  "C",
  "HTML",
  "CSS",
  "JS",
  "SQL",
  "Git",
  "Rust",
  "React",
  "Node",
];

const badges = [
  {
    icon: "🎨",
  },
  {
    icon: "🚀",
  },
  {
    icon: "✅",
  },
];

const certificates = [
  {
    icon: <FaReact className="text-blue-500" />,
  },
  {
    icon: <FaJs className="text-yellow-500" />,
  },
  {
    icon: <RiTailwindCssFill className="text-teal-500" />,
  },
];

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
  }
];

const weeklyActivity = [
  { day: "Mon", count: 4 },
  { day: "Tue", count: 2 },
  { day: "Wed", count: 5 },
  { day: "Thu", count: 3 },
  { day: "Fri", count: 4 },
  { day: "Sat", count: 7 },
  { day: "Sun", count: 6 },
];

export default function ProfilePage() {
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  const handleEditProfile = () => {
    openUserProfile();
  };

  return (
    <div className="min-h-screen bg-gray-50 mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Profile Info */}
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src={user?.imageUrl || "User"}
                  alt={user?.fullName || "User"} 
                  width={100}
                  height={100}
                  className="rounded-full"
                />

              </div>
              <h2 className="mt-4 text-xl font-semibold">{user?.fullName || "User"}</h2>
              <p className="text-sm text-muted-foreground">{user?.username || "User"}</p>

              <Button 
              onClick={handleEditProfile}
              className="mt-4 w-full bg-indigo-400 hover:bg-indigo-300" variant="secondary">
                Edit Profile
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>Jadavpur University</span>
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">SKILL STACK</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Extras */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">EXTRAS</h3>
            <div className="space-y-4">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Users className="h-4 w-4" />
                <span>Discussion</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Clock className="h-4 w-4" />
                <span>Notes</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <MapPinned className="h-4 w-4" />
                <span>Transaction History</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          {/* Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Badges */}
            <Card className="my-auto p-6 bg-gradient-to-r from-slate-100 via-slate-200 to-indigo-200 transition-transform hover:scale-[1.02]">
              <div className="flex items-center mb-4">
                <span className="text-4xl font-bold mr-3">20</span>
                <h3 className="font-semibold">Badges</h3>
              </div>
              <div className="flex justify-center gap-5">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-3xl`}
                  >
                    {badge.icon}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Recent Badges
              </p>
            </Card>

            {/* Certificates */}
            <Card className="my-auto p-6 bg-gradient-to-r from-slate-100 via-slate-200 to-fuchsia-200 transition-transform hover:scale-[1.02]">
              <div className="flex items-center mb-4">
                <span className="text-4xl font-bold mr-3">5</span>
                <h3 className="font-semibold">Certificates</h3>
              </div>
              <div className="flex justify-center gap-5">
                {certificates.map((certificate, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-4xl`}
                  >
                    {certificate.icon}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Recent Certificates
              </p>
            </Card>

            {/* Streak */}
            <Card className="p-6 bg-gradient-to-r from-slate-100 via-slate-200 to-violet-300 transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <h3 className="font-semibold">Weekly Activity</h3>
              </div>

              <div className="flex items-end justify-between h-28 gap-1">
                {weeklyActivity.map((day, index) => (
                  <div
                    key={day.day}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-8 bg-amber-300 hover:bg-amber-400 transition-colors rounded"
                      style={{ height: `${day.count * 10}px` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Courses</h2>
              <select className="text-sm bg-transparent border-none">
                <option>March 2023</option>
              </select>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all" className="w-20 mr-4">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="w-20 mr-4">
                    Recent
                  </TabsTrigger>
                  <TabsTrigger value="archived" className="w-20">
                    Archived
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
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
                </TabsContent>
                <TabsContent value="recent">
                  <p className="text-center text-muted-foreground py-8">
                    No recent courses
                  </p>
                </TabsContent>

                <TabsContent value="archived">
                  <p className="text-center text-muted-foreground py-8">
                    No archived courses
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

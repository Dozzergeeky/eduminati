"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CourseContentProps {
  courseData: {
    id: string;
    title: string;
    instructor: string;
    chapters: {
      title: string;
      duration: string;
      totalVideos: string;
      lessons: {
        title: string;
        duration: string;
        completed: boolean;
      }[];
    }[];
  };
}

const comments = [
  {
    id: 1,
    name: "Leonardo Da Vinci",
    avatar: "https://ui-avatars.com/api/?name=L+V&background=random",
    comment:
      "Loved the course. I've learned some very subtle techniques, especially on leaves.",
  },
  {
    id: 2,
    name: "Titania S",
    avatar: "https://ui-avatars.com/api/?name=Titania+S&background=random",
    comment:
      "Loved the course, it had been a while since I had experimented with watercolors and now I will.",
  },
  {
    id: 3,
    name: "Zhirkov",
    avatar: "https://ui-avatars.com/api/?name=Z+K&background=random",
    comment:
      "Loved the course. I've learned some very subtle techniques, especially on leaves.",
  },
  {
    id: 4,
    name: "Miphoska",
    avatar: "https://ui-avatars.com/api/?name=M+P&background=random",
    comment:
      "Loved the course. I've learned some very subtle techniques, especially on leaves.",
  },
];

export function CourseContent({ courseData }: CourseContentProps) {
  const [activeChapters, setActiveChapters] = useState<number[]>([]);
  const [activeLesson, setActiveLesson] = useState(0);

  const toggleChapter = (chapterIndex: number) => {
    setActiveChapters((prevActiveChapters) =>
      prevActiveChapters.includes(chapterIndex)
        ? prevActiveChapters.filter((index) => index !== chapterIndex)
        : [...prevActiveChapters, chapterIndex]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="aspect-video relative bg-black rounded-lg overflow-hidden mb-8">
              <Image
                src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80"
                alt="Course Preview"
                fill
                className="object-cover"
              />
            </div>

            {/* Course Title */}
            <h1 className="text-2xl font-bold mb-6">VUE JS SCRATCH COURSE</h1>

            {/* Instructor */}
            <div className="flex items-center gap-4 mb-8">
              <Image
                src="https://ui-avatars.com/api/?name=K+S&background=random"
                alt="Kitani Studio"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">Kitani Studio</div>
                <div className="text-sm text-muted-foreground">
                  Design Studio
                </div>
              </div>
            </div>

            {/* About Course */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About Course</h2>
              <p className="text-muted-foreground">
                Vue (pronounced /vjuː/, like view) is a progressive framework
                for building user interfaces. Unlike other monolithic
                frameworks, Vue is designed from the ground up to be
                incrementally adoptable. The core library is focused on the view
                layer only, and is easy to pick up and integrate with other
                libraries or existing projects. On the other hand, Vue is also
                perfectly capable of powering sophisticated Single-Page
                Applications when used in combination with modern tooling and
                supporting libraries.
              </p>
            </div>

            {/* Comments */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
              <div className="space-y-6">
                {comments.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-52 mx-auto flex items-center"
                >
                  Load more comments
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:border-l">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Course Content</h2>
              <div className="space-y-4">
                {courseData.chapters.map((chapter, chapterIndex) => (
                  <div key={chapter.title} className="border rounded-lg">
                    <button
                      className="w-full flex items-center justify-between p-4 hover:bg-accent"
                      onClick={() => toggleChapter(chapterIndex)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{chapter.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {chapter.totalVideos} • {chapter.duration}
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5" />
                    </button>
                    {activeChapters.includes(chapterIndex) && (
                      <div className="border-t">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <button
                            key={lesson.title}
                            className={`w-full flex items-center justify-between p-4 hover:bg-accent ${
                              activeLesson === lessonIndex ? "bg-accent" : ""
                            }`}
                            onClick={() => setActiveLesson(lessonIndex)}
                          >
                            <div className="text-left">
                              <div className="font-medium">{lesson.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </div>
                            </div>
                            {lesson.completed && (
                              <div className="text-green-500">✓</div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
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

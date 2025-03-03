import { Suspense } from "react";
import { CourseContent } from "./components/CourseContent";

const chapters = [
  {
    title: "Chapter 1: Course Overview",
    duration: "28m",
    totalVideos: "1/12 Videos",
    lessons: [
      { title: "Course Introduction", duration: "5m", completed: true },
      { title: "Setting Up Environment", duration: "8m", completed: true },
      { title: "Project Overview", duration: "15m", completed: false },
    ],
  },
  {
    title: "Chapter 2: Curriculum",
    duration: "1h 26m",
    totalVideos: "1/12 Videos",
    lessons: [
      { title: "Installing Vue JS", duration: "15m", completed: true },
      { title: "Understand Vue Components", duration: "25m", completed: false },
      { title: "Vue Templating", duration: "20m", completed: false },
      { title: "Vue Forms", duration: "15m", completed: false },
      { title: "Vue Styling", duration: "11m", completed: false },
    ],
  },
  {
    title: "Chapter 3: Components",
    duration: "1h 26m",
    totalVideos: "1/12 Videos",
    lessons: [
      { title: "Component Basics", duration: "20m", completed: false },
      { title: "Props and Events", duration: "25m", completed: false },
      { title: "Slots and Scoped Slots", duration: "41m", completed: false },
    ],
  },
];

async function getCourseData(id: string) {
  // Simulate API call - replace with actual data fetching
  return {
    id,
    title: "VUE JAVASCRIPT COURSE",
    instructor: "Kitani Studio",
    chapters: chapters,
  };
}

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const courseData = await getCourseData(params.id);

  return (
    <Suspense fallback={<div>Loading course content...</div>}>
      <CourseContent courseData={courseData} />
    </Suspense>
  );
}

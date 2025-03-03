import { Suspense } from "react";
import AssessmentContent from "./components/AssessmentContent";

type CourseData = {
  id: string;
  title: string;
  instructor: string;
  chapters: never[];
};

async function getCourseData(id: string): Promise<CourseData> {
  return {
    id,
    title: "Dynamic Programming",
    instructor: "Kitani Studio",
    chapters: [],
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
      <AssessmentContent courseData={courseData} />
    </Suspense>
  );
}
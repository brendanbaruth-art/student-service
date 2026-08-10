import { notFound } from "next/navigation";
import { CourseCard } from "@/components/academic/CourseCard";
import { MentorCard } from "@/components/academic/MentorCard";
import { NoteCard } from "@/components/academic/NoteCard";
import { PageShell } from "@/components/PageShell";
import { courses, formatCourseContext, getCourse, mentorsForCourse, notesForCourse } from "@/lib/academic";

type CoursePageProps = {
  params: Promise<{ university: string; course: string }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ university: course.universityId, course: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { course: courseSlug } = await params;
  const course = getCourse(courseSlug);
  return {
    title: course ? course.title : "Course",
    description: course?.description || "View course mentors and notes on Etudo.",
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { university, course: courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course || course.universityId !== university) notFound();
  const context = formatCourseContext(course.id);
  const mentors = mentorsForCourse(course.id);
  const notes = notesForCourse(course.id);
  const related = courses.filter((item) => item.id !== course.id && item.subject === course.subject).slice(0, 3);

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">{context.university?.name}</p>
          <h1 className="mt-3 text-page-heading font900 text-[var(--color-brand-dark)]">{course.title}</h1>
          <p className="mt-3 text-lg font800 text-[var(--color-text-secondary)]">{course.code} - {context.professor?.name} - {course.subject}</p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">{course.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font900 text-[var(--color-brand)]">
            <span className="rounded-full bg-[var(--color-blue-soft)] px-3 py-1">{mentors.length} available mentors</span>
            <span className="rounded-full bg-[var(--color-blue-soft)] px-3 py-1">{notes.length} note packs</span>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Available mentors</h2>
          <div className="mt-5 grid gap-5">
            {mentors.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} courseId={course.id} />)}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Notes for this course</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => <NoteCard key={note.id} note={note} />)}
          </div>
        </section>
        {related.length ? (
          <section>
            <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Related courses</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => <CourseCard key={item.id} course={item} />)}
            </div>
          </section>
        ) : null}
      </section>
    </PageShell>
  );
}

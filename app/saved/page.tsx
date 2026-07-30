import { PageShell } from "@/components/PageShell";
import { SavedStudentsClient } from "@/components/SavedStudentsClient";
import { students } from "@/lib/data";

export const metadata = {
  title: "Saved students",
  description: "View your saved Etudo student helpers.",
};

export default function SavedPage() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
            Saved
          </p>
          <h1 className="mt-3 text-4xl font900 tracking-tight text-[#152238] sm:text-5xl">
            Saved students
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#667085]">
            Keep track of students you may want to book again.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SavedStudentsClient students={students} />
      </section>
    </PageShell>
  );
}

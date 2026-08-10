import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "About",
  description: "About Etudo.",
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About"
      title="Course-specific academic support, built for Paris."
      body="Etudo helps university students find verified mentors and study notes from students who already took the same course."
      items={[
        "Courses connect mentors, professors, universities, and notes in one academic marketplace.",
        "Students compare mentors by course, professor, rating, price, format, and availability.",
        "Etudo keeps verification, clear pricing, previews, and reviews at the center of the experience.",
      ]}
    />
  );
}

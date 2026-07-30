import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "About",
  description: "About Etudo.",
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About"
      title="Student-to-student help, built for Paris."
      body="Etudo connects students who need everyday help with verified peers who want flexible paid work."
      items={[
        "The marketplace focuses on practical services: moving, tutoring, errands, tech support, pet care, and assembly.",
        "The product is designed for university communities, compact city living, and flexible schedules.",
        "Etudo keeps trust, clear pricing, and simple booking details at the center of the experience.",
      ]}
    />
  );
}

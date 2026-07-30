import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Safety",
  description: "Etudo safety principles.",
};

export default function SafetyPage() {
  return (
    <InfoPage
      eyebrow="Safety"
      title="Designed for safer student-to-student bookings."
      body="Etudo’s safety model combines verification, clear task details, ratings, and reporting."
      items={[
        "Student verification helps keep the network focused on university communities.",
        "Booking requests should include time, place, task scope, access details, and estimated duration.",
        "Reviews and reporting help the marketplace identify reliable helpers and address concerns.",
      ]}
    />
  );
}

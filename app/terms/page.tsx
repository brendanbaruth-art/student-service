import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Terms",
  description: "Etudo terms.",
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Terms"
      title="Etudo terms overview."
      body="Etudo’s terms will define marketplace roles, booking rules, acceptable services, and user responsibilities."
      items={[
        "Users are expected to provide accurate profile and booking information.",
        "Helpers set their own prices and availability while following marketplace standards.",
        "Bookings should remain respectful, lawful, and appropriate for student communities.",
      ]}
    />
  );
}

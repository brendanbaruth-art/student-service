import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Contact",
  description: "Contact Etudo.",
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact"
      title="Get in touch with Etudo."
      body="Questions, partnerships, and early community requests can be routed through the Etudo team."
      items={[
        "Students can contact Etudo for booking questions, profile support, and verification help.",
        "University associations can reach out about campus launches and community partnerships.",
        "A dedicated support inbox and help centre will be part of the wider launch experience.",
      ]}
    />
  );
}

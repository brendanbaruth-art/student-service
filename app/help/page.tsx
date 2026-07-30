import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Help centre",
  description: "Etudo help centre.",
};

export default function HelpPage() {
  return (
    <InfoPage
      eyebrow="Help centre"
      title="Support for booking and offering services."
      body="Find guidance for using Etudo as a customer or helper."
      items={[
        "Before booking, compare profiles, prices, reviews, service areas, and availability.",
        "Before offering services, complete your profile with clear pricing and realistic availability.",
        "For safety questions, review verification status and keep all booking details clear.",
      ]}
    />
  );
}

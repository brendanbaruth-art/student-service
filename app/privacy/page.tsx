import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Privacy",
  description: "Etudo privacy principles.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Privacy principles for Etudo."
      body="Etudo is designed to collect only the information needed to operate student profiles, verification, and booking requests."
      items={[
        "Profile details should be limited to useful marketplace information.",
        "Student verification information should be handled carefully and only used for trust and safety purposes.",
        "Users should have clear controls for account, profile, and communication preferences.",
      ]}
    />
  );
}

import { PageShell } from "@/components/PageShell";
import { SignupFlow } from "@/components/SignupFlow";

export const metadata = {
  title: "Get started",
  description: "Create an Etudo account to find help or offer student services in Paris.",
};

export default function SignupPage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <div>
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
            Get started
          </p>
          <h1 className="mt-3 text-4xl font900 tracking-tight text-[#152238] sm:text-5xl">
            Join a trusted student network in Paris.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#667085]">
            Create your account, choose how you want to use Etudo, and complete
            student verification when you are ready to book or offer services.
          </p>
          <div className="mt-8 grid gap-4">
            {[
              "Find reliable help for everyday tasks",
              "Offer services around your schedule",
              "Use one profile for booking and earning",
            ].map((item) => (
              <div key={item} className="rounded-lg border border-[#E5E7EB] bg-white p-4 text-sm font800 text-[#172033]">
                {item}
              </div>
            ))}
          </div>
        </div>
        <SignupFlow />
      </section>
    </PageShell>
  );
}

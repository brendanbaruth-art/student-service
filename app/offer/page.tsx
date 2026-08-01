import { BriefcaseBusiness, Calendar, Handshake, ShieldCheck, Star } from "lucide-react";
import { ActionNoticeButton } from "@/components/ActionNoticeButton";
import { PageShell } from "@/components/PageShell";
import { SelectField, TextAreaField, TextInput } from "@/components/FormField";
import { Toast } from "@/components/Toast";
import { capabilityCatalog, categories } from "@/lib/data";

export const metadata = {
  title: "Offer a service",
  description: "Earn money helping students around Paris with Etudo.",
};

const benefits = [
  ["Set your own schedule", Calendar],
  ["Choose your rates", BriefcaseBusiness],
  ["Accept only the jobs you want", Handshake],
  ["Build your reputation", Star],
  ["Meet verified students", ShieldCheck],
];

export default function OfferPage() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="min-w-0">
            <Toast message="Helper applications are open" />
            <p className="mt-8 text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Offer a service
            </p>
            <h1 className="mt-3 text-4xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-5xl">
              Earn money helping students around Paris.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
              Choose the services you offer, set your own prices, and work around your studies.
            </p>
            <div className="mt-8 grid gap-3">
              {benefits.map(([benefit, Icon]) => (
                <div key={benefit as string} className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                  <Icon size={19} className="text-[var(--color-success)]" aria-hidden />
                  <span className="text-sm font800 text-[var(--color-text)]">{benefit as string}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="min-w-0 rounded-lg border border-[var(--color-border)] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.06)] sm:p-6">
            <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Create your service listing</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Add one service to start. You can add more categories from your profile later.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <TextInput id="service-title" label="Service title" placeholder="Maths tutoring" required />
              <SelectField id="category" label="Category" required>
                {categories.map((category) => (
                  <option key={category.slug}>{category.name}</option>
                ))}
              </SelectField>
              <TextAreaField id="description" label="Description" placeholder="Explain what you offer, who it is for, and what is included." />
              <SelectField id="pricing-type" label="Pricing type">
                <option>Hourly</option>
                <option>Fixed price</option>
              </SelectField>
              <TextInput id="price-amount" label="Price amount" placeholder="€25/hour" required />
              <TextInput id="available-days" label="Available days" placeholder="Monday, Wednesday, Saturday" />
              <TextInput id="available-times" label="Available times" placeholder="18:00-21:00" />
              <TextInput id="service-areas" label="Service areas" placeholder="5e, 6e, 13e" />
              <TextInput id="tools" label="Tools or transport available" placeholder="Basic toolkit, cargo bike" />
              <TextInput id="languages" label="Languages" placeholder="French, English" />
            </div>
            <div className="mt-6 rounded-lg bg-[var(--color-surface-soft)] p-4">
              <h3 className="font900 text-[var(--color-text)]">Profile capability selector</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                Select every job you are comfortable offering. Each selected service can have its own price.
              </p>
              <div className="mt-4 grid max-h-72 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                {capabilityCatalog.map((capability, index) => (
                  <label key={capability} className="flex items-center gap-3 rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm font800 text-[var(--color-text)]">
                    <input type="checkbox" className="size-4 accent-[var(--color-success)]" defaultChecked={index < 8} />
                    <span className="min-w-0 flex-1">{capability}</span>
                    <input
                      aria-label={`${capability} price`}
                      className="w-20 rounded-md border border-[var(--color-border)] px-2 py-1 text-xs"
                      defaultValue={index % 3 === 0 ? "€25" : "€30/h"}
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ActionNoticeButton variant="secondary" message="Your listing draft is ready to continue." className="sm:w-auto">
                Save draft
              </ActionNoticeButton>
              <ActionNoticeButton message="Preview updated with your current listing details." className="sm:w-auto">
                Preview listing
              </ActionNoticeButton>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

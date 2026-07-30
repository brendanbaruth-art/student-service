import { BriefcaseBusiness, Calendar, Handshake, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { SelectField, TextAreaField, TextInput } from "@/components/FormField";
import { Toast } from "@/components/Toast";
import { categories } from "@/lib/data";

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
          <div>
            <Toast message="Helper applications are open" />
            <p className="mt-8 text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
              Offer a service
            </p>
            <h1 className="mt-3 text-4xl font900 tracking-tight text-[#152238] sm:text-5xl">
              Earn money helping students around Paris.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#667085]">
              Choose the services you offer, set your own prices, and work around your studies.
            </p>
            <div className="mt-8 grid gap-3">
              {benefits.map(([benefit, Icon]) => (
                <div key={benefit as string} className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-[#F8F7F3] p-4">
                  <Icon size={19} className="text-[#4FAE8A]" aria-hidden />
                  <span className="text-sm font800 text-[#172033]">{benefit as string}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.06)] sm:p-6">
            <h2 className="text-2xl font900 text-[#152238]">Create your service listing</h2>
            <p className="mt-2 text-sm leading-6 text-[#667085]">
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
            <div className="mt-6 rounded-lg bg-[#F8F7F3] p-4">
              <h3 className="font900 text-[#172033]">Listing preview</h3>
              <p className="mt-2 text-sm leading-6 text-[#667085]">
                Your preview will show the service title, category, price, availability,
                and service area before publishing.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary">Save draft</Button>
              <Button type="button">Preview listing</Button>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

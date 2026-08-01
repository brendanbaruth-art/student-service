"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";
import { SelectField, TextAreaField, TextInput } from "./FormField";

const steps = ["Use", "Details", "Verify", "Profile"];

export function SignupFlow() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="rounded-lg border border-[var(--color-border)] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.06)] sm:p-6">
      <div className="grid grid-cols-4 gap-2" aria-label="Signup progress">
        {steps.map((step, index) => (
          <div key={step} className="min-w-0">
            <div className={`h-2 rounded-full ${index === 0 ? "bg-[var(--color-brand)]" : "bg-[var(--color-border)]"}`} />
            <p className="mt-2 truncate text-xs font800 text-[var(--color-text-secondary)]">{step}</p>
          </div>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="text-xl font900 text-[var(--color-brand-dark)]">Step 1: How would you like to use Etudo?</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {["Find help", "Offer services", "Both"].map((option) => (
            <label key={option} className="flex min-h-12 items-center gap-3 rounded-md border border-[var(--color-border)] px-3 text-sm font800 text-[var(--color-text)]">
              <input name="role" type="radio" className="size-4 accent-[var(--color-brand)]" required />
              {option}
            </label>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font900 text-[var(--color-brand-dark)]">Step 2: Basic information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextInput id="first-name" label="First name" placeholder="First name" required />
          <TextInput id="last-name" label="Last name" placeholder="Last name" required />
          <TextInput id="university" label="University" placeholder="Your university" required />
          <TextInput id="university-email" label="University email" type="email" placeholder="name@university.fr" hint="Use your university email where possible." required />
          <label className="grid gap-2 text-sm font800 text-[var(--color-text)] sm:col-span-2" htmlFor="password">
            Password
            <span className="flex rounded-md border border-[var(--color-border)] bg-white focus-within:border-[var(--color-brand)] focus-within:ring-4 focus-within:ring-[var(--color-brand)]/10">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                minLength={8}
                required
                className="min-h-11 min-w-0 flex-1 rounded-l-md px-3 text-sm outline-none"
              />
              <button
                type="button"
                className="grid min-h-11 w-12 place-items-center text-[var(--color-text-secondary)]"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
              </button>
            </span>
            <span className="text-xs font600 text-[var(--color-text-secondary)]">Use at least 8 characters.</span>
          </label>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font900 text-[var(--color-brand-dark)]">Step 3: Student verification</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
          Students verify university affiliation before offering services and before accessing some booking features.
        </p>
        <div className="mt-4 rounded-md border border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-4 text-sm font700 text-[var(--color-success)]">
          University email and student document checks keep the network safer for everyone.
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font900 text-[var(--color-brand-dark)]">Step 4: Complete profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextInput id="photo" label="Profile photo" type="file" accept="image/*" />
          <TextInput id="languages" label="Languages" placeholder="French, English" />
          <SelectField id="helper-category" label="Service category">
            <option>Moving help</option>
            <option>Tutoring</option>
            <option>Furniture assembly</option>
            <option>Pet care</option>
          </SelectField>
          <TextInput id="price" label="Starting price" placeholder="€22/hour" />
          <TextInput id="availability" label="Availability" placeholder="Evenings, weekends" />
          <TextInput id="areas" label="Paris service areas" placeholder="5e, 6e, 13e" />
          <TextAreaField id="bio" label="Short bio" placeholder="Write two or three sentences about how you can help." />
        </div>
      </section>

      <label className="mt-6 flex items-start gap-3 text-sm font700 text-[var(--color-text-secondary)]">
        <input type="checkbox" className="mt-1 size-4 accent-[var(--color-brand)]" required />
        <span>I agree to the Etudo terms and privacy policy.</span>
      </label>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="secondary">Back</Button>
        <Button type="button">Continue</Button>
      </div>
      <p className="mt-3 text-sm font700 text-[var(--color-danger)]">
        Complete required fields before continuing.
      </p>
    </form>
  );
}

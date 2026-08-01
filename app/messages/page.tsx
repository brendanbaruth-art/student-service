import Image from "next/image";
import { Send } from "lucide-react";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { TextInput } from "@/components/FormField";
import { conversations } from "@/lib/data";

type MessagesPageProps = {
  searchParams?: Promise<{ thread?: string; request?: string }>;
};

export const metadata = {
  title: "Messages",
  description: "Messages for Etudo bookings and student requests.",
};

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
  const params = await searchParams;
  const active = conversations.find((item) => item.id === params?.thread) || conversations[0];

  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[340px_1fr] lg:px-8">
        <aside className="rounded-lg border border-[var(--color-border)] bg-white p-4 shadow-[0_1px_2px_rgba(21,34,56,0.04)]">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Inbox</p>
          <h1 className="mt-2 text-3xl font900 text-[var(--color-brand-dark)]">Messages</h1>
          <div className="mt-5 grid gap-2">
            {conversations.map((conversation) => (
              <Button
                key={conversation.id}
                href={`/messages?thread=${conversation.id}`}
                variant={conversation.id === active.id ? "primary" : "secondary"}
                className="justify-start"
              >
                {conversation.name}
              </Button>
            ))}
          </div>
        </aside>

        <section className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-[0_18px_35px_rgba(21,34,56,0.06)]">
          <div className="flex items-center gap-3 border-b border-[var(--color-border)] p-5">
            <div className="relative size-12 overflow-hidden rounded-md bg-[#F2F4F7]">
              <Image src={active.avatar} alt={`Profile photograph of ${active.name}`} fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <h2 className="text-xl font900 text-[var(--color-brand-dark)]">{active.name}</h2>
              <p className="text-sm font700 text-[var(--color-text-secondary)]">Usually replies quickly</p>
            </div>
          </div>
          <div className="min-h-[430px] bg-[var(--color-surface-soft)] p-5">
            <div className="grid gap-3">
              {active.messages.map((message) => (
                <div
                  key={`${message.time}-${message.text}`}
                  className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 shadow-[0_8px_18px_rgba(21,34,56,0.06)] ${
                    message.from === "me"
                      ? "ml-auto bg-[var(--color-brand-dark)] text-white"
                      : "bg-white text-[var(--color-text)]"
                  }`}
                >
                  {message.text}
                  <span className={`mt-1 block text-xs ${message.from === "me" ? "text-white/60" : "text-[var(--color-text-secondary)]"}`}>{message.time}</span>
                </div>
              ))}
              <div className="max-w-[82%] rounded-lg bg-white px-4 py-3 text-sm leading-6 text-[var(--color-text)] shadow-[0_8px_18px_rgba(21,34,56,0.06)]">
                Sounds good. I&apos;ll send a booking request now.
                <span className="mt-1 block text-xs text-[var(--color-text-secondary)]">Draft</span>
              </div>
            </div>
          </div>
          <form className="flex gap-3 border-t border-[var(--color-border)] p-4">
            <TextInput id="message" label="Message" placeholder="Write a message" />
            <Button type="button" className="mt-6 shrink-0">
              <Send size={16} aria-hidden /> Send
            </Button>
          </form>
        </section>
      </section>
    </PageShell>
  );
}

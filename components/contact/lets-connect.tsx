"use client";

import { useId, useState } from "react";

export interface LetsConnectProps {
  /** Recipient address resolved from env (`NEXT_PUBLIC_CONTACT_EMAIL`) by the
   * server section component and passed in here so the client bundle never
   * imports the data layer. */
  email: string;
}

/**
 * LetsConnect — the contact form. A controlled form that composes a
 * `mailto:` URL with a prefilled subject and body, then hands off to the
 * user's mail client. No server round-trip, no third-party service — the
 * portfolio stays static and dependency-free.
 *
 * Upgraded from the wireframe for production:
 * - Email is passed in as a prop (server resolves env) so the data layer
 *   stays out of the client bundle.
 * - Confirmation uses `aria-live="polite"` so screen-readers announce it
 *   without moving focus, per DESIGN.md ("No interaction should depend solely
 *   on animation").
 * - All inputs have explicit `<label htmlFor>` + `id` pairing; `required` on
 *   name/email/message; `type="email"` on the email field.
 * - Touch targets ≥48px (inputs and button use `py-3` + body text → ~50px).
 * - Visible focus ring (accent) on top of the border-color shift.
 * - Unique ids via `useId` so the form can be rendered multiple times without
 *   id collisions (defensive; the section is single-instance today).
 *
 * The subject defaults to `Portfolio message from {name}` when left blank, so
 * the mail client always opens with a meaningful subject line.
 */
export function LetsConnect({ email }: LetsConnectProps) {
  const [name, setName] = useState("");
  const [emailField, setEmailField] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const idPrefix = useId();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const finalSubject = subject || `Portfolio message from ${name}`;
    const body = `Name: ${name}\nEmail: ${emailField}\n\n${message}`;
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      finalSubject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  const inputClass =
    "w-full bg-bg border border-line px-4 py-3 text-ink-2 placeholder:text-ink-3 focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors";
  const labelClass =
    "block font-mono text-caption uppercase tracking-wider text-ink-3 mb-2";

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-bg p-6 md:p-10"
      aria-label="Contact form"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelClass}>
            Your Name
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="[Your name]"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>
            Your Email
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            required
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
            placeholder="[you@email.com]"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={`${idPrefix}-subject`} className={labelClass}>
          Subject
        </label>
        <input
          id={`${idPrefix}-subject`}
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="[Optional — defaults to your name]"
          className={inputClass}
        />
      </div>

      <div className="mt-6">
        <label htmlFor={`${idPrefix}-message`} className={labelClass}>
          Message
        </label>
        <textarea
          id={`${idPrefix}-message`}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="[Type your message here...]"
          rows={6}
          className={`${inputClass} min-h-[160px] resize-y`}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          className="border border-ink px-6 py-3 font-display text-body text-ink transition-colors hover:bg-ink hover:text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          [Send Message]
        </button>
        <p aria-live="polite" className="font-mono text-caption text-ink-3">
          {sent
            ? `Thanks${name ? `, ${name}` : ""} — opening your email client...`
            : ""}
        </p>
      </div>
    </form>
  );
}

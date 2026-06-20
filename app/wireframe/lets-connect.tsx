"use client";

import { useState } from "react";

const CONTACT_EMAIL = "hello@example.com";

export function LetsConnect() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const finalSubject = subject || `Portfolio message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      finalSubject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  const inputClass =
    "w-full bg-bg border border-line px-4 py-3 text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none transition-colors";
  const labelClass =
    "block font-mono text-xs uppercase tracking-wider text-ink-3 mb-2";

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line p-6 md:p-10 bg-bg"
      aria-label="Contact form"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="lc-name" className={labelClass}>
            Your Name
          </label>
          <input
            id="lc-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="[Your name]"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lc-email" className={labelClass}>
            Your Email
          </label>
          <input
            id="lc-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="[you@email.com]"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="lc-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="lc-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="[Optional — defaults to your name]"
          className={inputClass}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="lc-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="lc-message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="[Type your message here...]"
          rows={6}
          className={`${inputClass} resize-y min-h-[160px]`}
        />
      </div>

      <div className="mt-8 flex items-center gap-6">
        <button
          type="submit"
          className="border border-ink px-6 py-3 font-display text-base text-ink hover:bg-ink hover:text-bg transition-colors"
        >
          [Send Message]
        </button>
        {sent && (
          <p className="font-mono text-sm text-ink-3">
            Thanks{name ? `, ${name}` : ""} — opening your email client...
          </p>
        )}
      </div>
    </form>
  );
}

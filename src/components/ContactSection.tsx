import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  PORTFOLIO_PROFILE,
  SOCIAL_LINKS,
  SocialLink,
} from '../data/portfolio';
import { MagneticButton } from './MagneticButton';

interface ContactSectionProps {
  onNotify: (message: string) => void;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onNotify,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_PROFILE.email);
      setCopiedEmail(true);
      onNotify(`Copied ${PORTFOLIO_PROFILE.email} to clipboard.`);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      onNotify(`Email: ${PORTFOLIO_PROFILE.email}`);
    }
  };

  const handleSocialClick = (e: React.MouseEvent, link: SocialLink) => {
    if (link.isPlaceholder) {
      e.preventDefault();
      onNotify(
        `${link.label} URL is a replaceable placeholder — update it in portfolio data when ready.`
      );
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) {
      next.name = 'Please enter your name.';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please provide a valid email address.';
    }
    if (form.message.trim().length < 10) {
      next.message = 'Please write a short message (at least 10 characters).';
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const subject = encodeURIComponent(
      form.subject.trim() || `Portfolio Inquiry from ${form.name.trim()}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`
    );

    window.location.href = `mailto:${PORTFOLIO_PROFILE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    onNotify('Email draft prepared for Nandeep.');
  };

  const getSocialIcon = (id: SocialLink['id']) => {
    if (id === 'email') return <Mail className="h-4 w-4" strokeWidth={1.75} />;
    if (id === 'github')
      return <Github className="h-4 w-4" strokeWidth={1.75} />;
    return <Linkedin className="h-4 w-4" strokeWidth={1.75} />;
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Headline & Direct Channels */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between gap-10"
          >
            <div>
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.16em] text-[var(--text-muted)] tabular-nums mb-3">
                05 · CONTACT
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-medium leading-[1.08] tracking-tight text-[var(--text-primary)] balance-text">
                {PORTFOLIO_PROFILE.contactHeadline}
              </h2>
              <p className="mt-5 text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                {PORTFOLIO_PROFILE.contactSupporting}
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-4 pt-6 border-t border-[var(--border-hairline)]">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-3.5">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--text-muted)]">
                    Direct Email
                  </p>
                  <a
                    href={`mailto:${PORTFOLIO_PROFILE.email}`}
                    className="block truncate text-sm font-medium text-[var(--text-primary)] hover:underline underline-offset-4"
                  >
                    {PORTFOLIO_PROFILE.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5" strokeWidth={1.75} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target={
                      link.id === 'email' || link.isPlaceholder
                        ? undefined
                        : '_blank'
                    }
                    rel={
                      link.id === 'email' || link.isPlaceholder
                        ? undefined
                        : 'noopener noreferrer'
                    }
                    onClick={(e) => handleSocialClick(e, link)}
                    className="group flex items-center justify-between gap-4 py-3.5 text-sm transition-colors hover:text-[var(--text-primary)]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                        {getSocialIcon(link.id)}
                      </span>
                      <span className="font-medium text-[var(--text-primary)]">
                        {link.label}
                      </span>
                      <span className="truncate text-xs text-[var(--text-muted)]">
                        {link.handle}
                      </span>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--text-primary)]"
                      strokeWidth={1.75}
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 md:p-10 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium tracking-[0.1em] uppercase text-[var(--text-muted)] mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, name: e.target.value }));
                      if (errors.name) {
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }
                    }}
                    placeholder="Alex Morgan"
                    className="w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--border-strong)] focus:outline-none"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium tracking-[0.1em] uppercase text-[var(--text-muted)] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) {
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }
                    }}
                    placeholder="you@domain.com"
                    className="w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--border-strong)] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium tracking-[0.1em] uppercase text-[var(--text-muted)] mb-2"
                >
                  Topic
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  placeholder="Project collaboration, opportunity, or inquiry"
                  className="w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--border-strong)] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium tracking-[0.1em] uppercase text-[var(--text-muted)] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, message: e.target.value }));
                    if (errors.message) {
                      setErrors((prev) => ({ ...prev, message: undefined }));
                    }
                  }}
                  placeholder="Tell me about what you are building or how we can collaborate."
                  className="w-full resize-none rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm leading-[1.6] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--border-strong)] focus:outline-none"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <MagneticButton
                  type="submit"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--text-primary)] px-6 py-3.5 text-sm font-medium text-[var(--bg-canvas)] transition-opacity duration-200 hover:opacity-90 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--silver-accent)]"
                >
                  <span>Send Message</span>
                  <Send className="h-3.5 w-3.5" strokeWidth={1.75} />
                </MagneticButton>

                {submitted && (
                  <p
                    role="status"
                    className="text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Mail client opened with your message. You can also copy{' '}
                    {PORTFOLIO_PROFILE.email} directly.
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

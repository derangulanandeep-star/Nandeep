import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="py-24 md:py-32 border-b border-[var(--border-hairline)]"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Section Index & Heading */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.16em] text-[var(--text-muted)] tabular-nums mb-3">
              01 · ABOUT
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-medium leading-[1.08] tracking-tight text-[var(--text-primary)] balance-text">
              {PORTFOLIO_PROFILE.aboutTitle}
            </h2>
          </motion.div>

          {/* Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col justify-between gap-12"
          >
            <p className="text-lg md:text-xl leading-[1.68] text-[var(--text-primary)] font-normal max-w-2xl">
              {PORTFOLIO_PROFILE.aboutLead}
            </p>

            {/* 3-Column Editorial Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[var(--border-hairline)]">
              {PORTFOLIO_PROFILE.aboutDetails.map((detail, idx) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + idx * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col gap-2.5"
                >
                  <span className="text-xs font-medium tracking-[0.14em] uppercase text-[var(--text-muted)]">
                    {detail.label}
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
                    {detail.title}
                  </h3>
                  <p className="text-sm leading-[1.65] text-[var(--text-secondary)]">
                    {detail.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  EXPERTISE_CATEGORIES,
  EXPERTISE_SKILLS,
  ExpertiseCategory,
} from '../data/portfolio';

export const ExpertiseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | ExpertiseCategory>(
    'All'
  );
  const shouldReduceMotion = useReducedMotion();

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return EXPERTISE_SKILLS;
    return EXPERTISE_SKILLS.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="expertise"
      className="py-24 md:py-32 border-b border-[var(--border-hairline)]"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Header & Interactive Domain Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[var(--border-hairline)]">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.16em] text-[var(--text-muted)] tabular-nums mb-3">
              02 · EXPERTISE
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-medium leading-[1.08] tracking-tight text-[var(--text-primary)] balance-text">
              Disciplined Craft Across Stack &amp; Automation.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter technical expertise by category"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-1 self-start md:self-auto"
          >
            {EXPERTISE_CATEGORIES.map((category) => {
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-3.5 py-2 text-xs font-medium rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--silver-accent)] ${
                    selected
                      ? 'text-[var(--bg-canvas)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="expertise-tab-bg"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 35,
                      }}
                      className="absolute inset-0 rounded-lg bg-[var(--text-primary)]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirmed Skills Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.article
              key={skill.name}
              layout={!shouldReduceMotion}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.42,
                delay: index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-colors duration-200 hover:border-[var(--border-strong)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                  <span>{skill.category}</span>
                  <span className="font-[family-name:var(--font-mono)] tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                  {skill.name}
                </h3>

                <p className="mt-2.5 text-sm leading-[1.6] text-[var(--text-secondary)]">
                  {skill.summary}
                </p>
              </div>

              {/* Tasteful structural depth indicator — no percentage clichés */}
              <div className="mt-6 pt-4 border-t border-[var(--border-hairline)]">
                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-2">
                  <span>{skill.focusLabel}</span>
                </div>
                <div className="h-[2px] w-full overflow-hidden rounded-full bg-[var(--border-hairline)]">
                  <motion.div
                    initial={{ scaleX: shouldReduceMotion ? skill.levelRatio : 0 }}
                    whileInView={{ scaleX: skill.levelRatio }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.1 + index * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ transformOrigin: 'left' }}
                    className="h-full w-full bg-[var(--silver-highlight)]"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

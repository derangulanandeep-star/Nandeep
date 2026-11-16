import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { JOURNEY_MILESTONES } from '../data/portfolio';

export const JourneySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="journey"
      className="py-24 md:py-32 border-b border-[var(--border-hairline)]"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left Sticky Editorial Intro */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.16em] text-[var(--text-muted)] tabular-nums mb-3">
              04 · MY JOURNEY
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-medium leading-[1.08] tracking-tight text-[var(--text-primary)] balance-text">
              From First Lines to Intelligent Systems.
            </h2>
            <p className="mt-5 text-sm leading-[1.7] text-[var(--text-secondary)]">
              An honest progression of how curiosity led from core Computer
              Science fundamentals at NIAT to automation workflows and modern
              full-stack engineering.
            </p>
          </div>

          {/* Right Vertical Interactive Timeline */}
          <div className="lg:col-span-8">
            <div className="relative pl-7 md:pl-10">
              {/* Vertical Rail */}
              <div
                aria-hidden="true"
                className="absolute left-[9px] md:left-[11px] top-3 bottom-3 w-px bg-[var(--border-hairline)]"
              />

              <div className="space-y-6">
                {JOURNEY_MILESTONES.map((milestone, idx) => {
                  const isExpanded = activeIndex === idx;
                  return (
                    <motion.div
                      key={milestone.step}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        duration: 0.45,
                        delay: idx * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative"
                    >
                      {/* Timeline Node Marker */}
                      <button
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Select milestone ${milestone.step}: ${milestone.title}`}
                        className={`absolute -left-7 md:-left-10 top-6 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border transition-colors duration-200 ${
                          isExpanded
                            ? 'border-[var(--text-primary)] bg-[var(--text-primary)]'
                            : 'border-[var(--border-strong)] bg-[var(--bg-canvas)] hover:border-[var(--text-primary)]'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            isExpanded
                              ? 'bg-[var(--bg-canvas)]'
                              : 'bg-[var(--text-muted)]'
                          }`}
                        />
                      </button>

                      {/* Milestone Interactive Card */}
                      <div
                        className={`rounded-2xl border transition-colors duration-200 ${
                          isExpanded
                            ? 'border-[var(--border-strong)] bg-[var(--bg-surface)]'
                            : 'border-[var(--border-hairline)] bg-transparent hover:border-[var(--border-strong)]'
                        }`}
                      >
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setActiveIndex(isExpanded ? -1 : idx)
                          }
                          className="flex w-full items-start justify-between gap-4 p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--silver-accent)] rounded-2xl"
                        >
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2.5 text-xs text-[var(--text-muted)]">
                              <span className="font-[family-name:var(--font-mono)] tabular-nums">
                                {milestone.step}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{milestone.phase}</span>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                              {milestone.title}
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)]">
                              {milestone.subtitle}
                            </p>
                          </div>

                          <ChevronDown
                            className={`mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[var(--text-primary)]' : ''
                            }`}
                            strokeWidth={1.75}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: shouldReduceMotion ? 0.01 : 0.25,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-1 space-y-4">
                                <p className="text-sm leading-[1.7] text-[var(--text-secondary)]">
                                  {milestone.description}
                                </p>
                                <p className="text-xs font-medium text-[var(--text-muted)]">
                                  {milestone.focus.join(' · ')}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

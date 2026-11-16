import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';
import { MagneticButton } from './MagneticButton';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [portraitFailed, setPortraitFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const portraitParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 44]
  );

  const frameScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 0.97]
  );

  const entranceTransition = {
    duration: shouldReduceMotion ? 0.01 : 0.65,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  const hasPortrait =
    Boolean(PORTFOLIO_PROFILE.portraitUrl) && !portraitFailed;

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 md:pt-32 md:pb-12 border-b border-[var(--border-hairline)]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Left Column: Editorial Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center py-2">
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...entranceTransition, delay: 0.04 }}
              className="text-xs font-medium tracking-[0.22em] text-[var(--text-muted)] uppercase mb-5"
            >
              {PORTFOLIO_PROFILE.heroKicker}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...entranceTransition, delay: 0.12 }}
              className="font-[family-name:var(--font-display)] font-medium text-[clamp(2.65rem,4.9vw,4.5rem)] leading-[1.04] tracking-[-0.02em] text-[var(--text-primary)] balance-text"
            >
              {PORTFOLIO_PROFILE.heroHeadline}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...entranceTransition, delay: 0.2 }}
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[var(--silver-highlight)]"
            >
              <span>{PORTFOLIO_PROFILE.role}</span>
              <span aria-hidden="true" className="text-[var(--text-muted)]">
                ·
              </span>
              <span className="text-[var(--text-secondary)] font-normal">
                {PORTFOLIO_PROFILE.tagline}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...entranceTransition, delay: 0.28 }}
              className="mt-6 max-w-xl text-[15px] md:text-base leading-[1.7] text-[var(--text-secondary)]"
            >
              {PORTFOLIO_PROFILE.heroSupporting}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...entranceTransition, delay: 0.36 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--text-primary)] px-6 py-3.5 text-sm font-medium text-[var(--bg-canvas)] transition-transform duration-200 hover:opacity-90 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--silver-accent)]"
              >
                <span>View My Projects</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </MagneticButton>

              <MagneticButton
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-transparent px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--bg-surface)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--silver-accent)]"
              >
                <span>Let&apos;s Connect</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Replaceable Editorial Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 0.22 }}
            className="lg:col-span-5 flex"
          >
            <motion.div
              style={{ scale: frameScale }}
              className="relative w-full min-h-[400px] sm:min-h-[460px] lg:min-h-[520px] lg:h-full overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]"
            >
              {hasPortrait ? (
                <motion.img
                  style={{ y: portraitParallaxY }}
                  src={PORTFOLIO_PROFILE.portraitUrl ?? undefined}
                  alt={PORTFOLIO_PROFILE.portraitAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setPortraitFailed(true)}
                  className="h-full w-full object-cover object-center scale-[1.06]"
                />
              ) : (
                <motion.div
                  style={{ y: portraitParallaxY }}
                  className="relative flex h-full w-full flex-col justify-between p-7 md:p-8"
                >
                  {/* Subtle architectural studio light field */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_32%_24%,rgba(220,224,232,0.12),transparent_62%)] dark:bg-[radial-gradient(circle_at_32%_24%,rgba(220,224,232,0.09),transparent_62%)]"
                  />

                  {/* Top studio framing markers */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-[family-name:var(--font-mono)] tracking-[0.14em] text-[var(--text-muted)]">
                    <span>PORTRAIT FRAME</span>
                    <span className="tabular-nums">01 / STUDIO</span>
                  </div>

                  {/* Architectural Portrait Silhouette & Monogram Composition */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center py-8">
                    <div className="relative flex h-44 w-44 sm:h-52 sm:w-52 items-center justify-center">
                      <svg
                        viewBox="0 0 200 200"
                        fill="none"
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full text-[var(--border-strong)]"
                      >
                        <circle
                          cx="100"
                          cy="100"
                          r="92"
                          stroke="currentColor"
                          strokeWidth="0.75"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="68"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          strokeDasharray="3 5"
                        />
                        <line
                          x1="100"
                          y1="0"
                          x2="100"
                          y2="24"
                          stroke="currentColor"
                          strokeWidth="0.75"
                        />
                        <line
                          x1="100"
                          y1="176"
                          x2="100"
                          y2="200"
                          stroke="currentColor"
                          strokeWidth="0.75"
                        />
                        <line
                          x1="0"
                          y1="100"
                          x2="24"
                          y2="100"
                          stroke="currentColor"
                          strokeWidth="0.75"
                        />
                        <line
                          x1="176"
                          y1="100"
                          x2="200"
                          y2="100"
                          stroke="currentColor"
                          strokeWidth="0.75"
                        />
                      </svg>
                      <span className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl italic font-normal tracking-tight text-[var(--text-primary)]">
                        N
                      </span>
                    </div>
                  </div>

                  {/* Quiet bottom replaceable caption */}
                  <div className="relative z-10 flex items-end justify-between gap-4 border-t border-[var(--border-hairline)] pt-4">
                    <div>
                      <p className="text-xs font-medium text-[var(--text-primary)]">
                        {PORTFOLIO_PROFILE.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        Replaceable portrait placeholder
                      </p>
                    </div>
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)] whitespace-nowrap">
                      NIAT · CS
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Hero Metadata Strip & Scroll Indicator */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)]">
            <span className="text-[var(--text-secondary)] font-medium">
              Computer Science at NIAT
            </span>
            <span aria-hidden="true">·</span>
            <span>AI, Automation &amp; Full-Stack Craft</span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="group inline-flex items-center gap-2.5 self-start sm:self-auto text-xs font-medium tracking-[0.14em] uppercase text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--silver-accent)]"
          >
            <span>Scroll to explore</span>
            <motion.span
              animate={shouldReduceMotion ? undefined : { y: [0, 3, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border-hairline)] group-hover:border-[var(--border-strong)]"
            >
              <ArrowDown className="h-3 w-3" strokeWidth={1.75} />
            </motion.span>
          </button>
        </div>
      </div>
    </section>
  );
};

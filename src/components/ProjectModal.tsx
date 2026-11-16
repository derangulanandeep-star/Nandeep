import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Code2, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ProjectItem } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onPlaceholderNotice: (message: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onPlaceholderNotice,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6 md:p-10"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 18,
              scale: shouldReduceMotion ? 1 : 0.98,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 12,
              scale: shouldReduceMotion ? 1 : 0.98,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] shadow-2xl"
          >
            {/* Top Modal Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/92 backdrop-blur-md px-6 py-4 md:px-8">
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="font-[family-name:var(--font-mono)] tabular-nums">
                  {project.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--silver-accent)]"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-8">
              <div className="overflow-hidden rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] aspect-[16/10]">
                {!imgError ? (
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
                    <Code2
                      className="h-8 w-8 text-[var(--text-muted)]"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                      {project.title}
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-7 space-y-4">
                  <h3
                    id="project-modal-title"
                    className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)]"
                  >
                    {project.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                    {project.overview}
                  </p>
                </div>

                <div className="md:col-span-5 space-y-6">
                  <div>
                    <p className="text-xs font-medium tracking-[0.14em] uppercase text-[var(--text-muted)] mb-2.5">
                      Technologies
                    </p>
                    <p className="text-sm text-[var(--text-primary)]">
                      {project.technologies.join(' · ')}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium tracking-[0.14em] uppercase text-[var(--text-muted)] mb-2.5">
                      Architecture Notes
                    </p>
                    <ul className="space-y-2 text-sm leading-[1.55] text-[var(--text-secondary)]">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--text-muted)]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Row */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--border-hairline)]">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-5 py-2.5 text-sm font-medium text-[var(--bg-canvas)] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
                  >
                    <span>Open Live Demo</span>
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onPlaceholderNotice(
                        `${project.title} live demo link is ready to be connected in portfolio data.`
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-5 py-2.5 text-sm font-medium text-[var(--bg-canvas)] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
                  >
                    <span>Live Preview Pending</span>
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                )}

                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface)] whitespace-nowrap shrink-0"
                  >
                    <span>GitHub Repository</span>
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onPlaceholderNotice(
                        `${project.title} GitHub repository link is ready to be connected in portfolio data.`
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface)] whitespace-nowrap shrink-0"
                  >
                    <span>GitHub Repository</span>
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { ArrowUpRight, Code2, Github } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { FEATURED_PROJECTS, ProjectItem } from '../data/portfolio';
import { ProjectModal } from './ProjectModal';

interface ProjectsSectionProps {
  onNotify: (message: string) => void;
}

const ProjectImageFrame: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[var(--bg-surface)] p-8 text-center">
        <Code2 className="h-8 w-8 text-[var(--text-muted)]" strokeWidth={1.5} />
        <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
          {project.title}
        </p>
        <p className="text-xs text-[var(--text-muted)]">{project.category}</p>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={project.imageAlt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
    />
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onNotify,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="py-24 md:py-32 border-b border-[var(--border-hairline)]"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-[var(--border-hairline)]">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.16em] text-[var(--text-muted)] tabular-nums mb-3">
              03 · SELECTED WORKS
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-medium leading-[1.08] tracking-tight text-[var(--text-primary)] balance-text">
              Featured Projects &amp; Systems.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-[1.65] text-[var(--text-secondary)]">
            A curated collection of AI assistants, automation pipelines, and
            full-stack web interfaces built through curiosity and iteration.
          </p>
        </div>

        {/* Editorial Project Rows */}
        <div className="divide-y divide-[var(--border-hairline)]">
          {FEATURED_PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Preview Image Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Inspect ${project.title} project preview`}
                    className="block w-full overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] aspect-[4/3] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--silver-accent)]"
                  >
                    <ProjectImageFrame project={project} />
                  </button>
                </div>

                {/* Editorial Detail Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span className="font-[family-name:var(--font-mono)] tabular-nums">
                      {project.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                  </div>

                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)]">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                    {project.shortDescription}
                  </p>

                  {/* Unboxed Technologies List (Zero Pills) */}
                  <div className="mt-6 pt-5 border-t border-[var(--border-hairline)]">
                    <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--text-muted)] mb-1.5">
                      Built With
                    </p>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      {project.technologies.join(' · ')}
                    </p>
                  </div>

                  {/* Functional Action Buttons */}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-5 py-2.5 text-sm font-medium text-[var(--bg-canvas)] transition-opacity duration-200 hover:opacity-90 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--silver-accent)]"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                    </button>

                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--bg-surface)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--silver-accent)]"
                      >
                        <Github className="h-4 w-4" strokeWidth={1.75} />
                        <span>GitHub</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          onNotify(
                            `GitHub link for ${project.title} is a replaceable placeholder — add the repository URL in portfolio data.`
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--bg-surface)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--silver-accent)]"
                      >
                        <Github className="h-4 w-4" strokeWidth={1.75} />
                        <span>GitHub</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPlaceholderNotice={onNotify}
      />
    </section>
  );
};

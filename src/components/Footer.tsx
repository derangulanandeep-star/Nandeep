import React from 'react';
import { ArrowUp } from 'lucide-react';
import { NAV_ITEMS, PORTFOLIO_PROFILE } from '../data/portfolio';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-hairline)] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-1.5">
            <p className="text-base font-semibold tracking-[0.18em] text-[var(--text-primary)]">
              {PORTFOLIO_PROFILE.brand}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {PORTFOLIO_PROFILE.role} · {PORTFOLIO_PROFILE.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[var(--text-secondary)]"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className="transition-colors hover:text-[var(--text-primary)] whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="Scroll back to top"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] self-start md:self-auto"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <p className="tabular-nums">
            © {year} {PORTFOLIO_PROFILE.name}. All rights reserved.
          </p>
          <p>Computer Science at NIAT</p>
        </div>
      </div>
    </footer>
  );
};

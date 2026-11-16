/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { JourneySection } from './components/JourneySection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ScrollProgress } from './components/ScrollProgress';
import { NAV_ITEMS, ThemeMode } from './data/portfolio';

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem('nandeep-theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Fallback to default dark theme
  }
  return 'dark';
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('nandeep-theme', theme);
    } catch {
      // Ignore storage access restrictions
    }
  }, [theme]);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(sectionId);
  }, []);

  const showNotice = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3600);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        <ScrollProgress />
        <Navbar
          theme={theme}
          onToggleTheme={handleToggleTheme}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        <main>
          <HeroSection onNavigate={handleNavigate} />
          <AboutSection />
          <ExpertiseSection />
          <ProjectsSection onNotify={showNotice} />
          <JourneySection />
          <ContactSection onNotify={showNotice} />
        </main>

        <Footer onNavigate={handleNavigate} />

        {/* Transient Feedback Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-3 text-xs font-medium text-[var(--text-primary)] shadow-lg"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

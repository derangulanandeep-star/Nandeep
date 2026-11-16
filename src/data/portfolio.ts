import developerPortfolioImg from '../assets/images/project_developer_portfolio_1794809478449.jpg';
import gradeCalculatorImg from '../assets/images/project_grade_calculator_1794809478209.jpg';
import hackathonRadarImg from '../assets/images/project_hackathon_radar_1794809477651.jpg';
import nanexAiImg from '../assets/images/project_nanex_ai_1794809476570.jpg';
import weatherNewsImg from '../assets/images/project_weather_news_1794809477875.jpg';

export type ThemeMode = 'dark' | 'light';

export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLink {
  id: 'email' | 'github' | 'linkedin';
  label: string;
  handle: string;
  href: string;
  isPlaceholder?: boolean;
}

export type ExpertiseCategory = 'Programming' | 'Frontend' | 'Automation';

export interface SkillItem {
  name: string;
  category: ExpertiseCategory;
  focusLabel: string;
  levelRatio: number; // 0 to 1 structural indicator (never displayed as percentage)
  summary: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  shortDescription: string;
  overview: string;
  highlights: string[];
  technologies: string[];
  image: string;
  imageAlt: string;
  liveUrl: string | null;
  githubUrl: string | null;
}

export interface JourneyMilestone {
  step: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  focus: string[];
}

export const PORTFOLIO_PROFILE = {
  brand: 'NANDEEP.',
  name: 'Nandeep',
  role: 'AI & Full-Stack Developer',
  tagline: 'Turning Ideas Into Intelligent Digital Experiences.',
  heroKicker: "Hello, I'm Nandeep",
  heroHeadline: 'Building Digital Experiences That Think Beyond.',
  heroSupporting:
    'I build intelligent applications, explore emerging technologies and transform creative ideas into meaningful digital experiences.',
  /**
   * Replace `null` with your hosted portrait URL or local `/src/assets/...` path
   * when your photograph is ready.
   */
  portraitUrl: null as string | null,
  portraitAlt: 'Portrait of Nandeep, AI & Full-Stack Developer',
  aboutTitle: 'Curiosity Drives Innovation.',
  aboutLead:
    "I'm Nandeep, a Computer Science student at NIAT, passionate about artificial intelligence, full-stack development and automation. I enjoy exploring emerging technologies and turning ideas into practical digital solutions.",
  aboutDetails: [
    {
      label: 'Education',
      title: 'Computer Science Student at NIAT',
      description:
        'Building a strong foundation in algorithms, software architecture, and practical engineering through continuous hands-on experimentation.',
    },
    {
      label: 'Engineering Focus',
      title: 'Intelligent Systems & Clean Interfaces',
      description:
        'Bridging thoughtful user interfaces with automated workflows and AI-driven tooling to remove friction from everyday tasks.',
    },
    {
      label: 'Interests',
      title: 'Emerging Tech & Creative Problem Solving',
      description:
        'Drawn to minimalist product craft, desktop assistants, automated research pipelines, and learning how modern software scales.',
    },
  ],
  contactHeadline: "Let's Create Something Meaningful.",
  contactSupporting:
    "Have an idea, collaboration or opportunity? I'd love to hear from you.",
  email: 'nandeepn786@gmail.com',
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'email',
    label: 'Email',
    handle: 'nandeepn786@gmail.com',
    href: 'mailto:nandeepn786@gmail.com',
    isPlaceholder: false,
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'github.com/nandeepn786-dotcom',
    href: 'https://github.com/nandeepn786-dotcom',
    isPlaceholder: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'linkedin.com/in/derangula-nandeep-nandeep-a92627439',
    href: 'https://www.linkedin.com/in/derangula-nandeep-nandeep-a92627439/',
    isPlaceholder: false,
  },
];

export const EXPERTISE_CATEGORIES: Array<'All' | ExpertiseCategory> = [
  'All',
  'Programming',
  'Frontend',
  'Automation',
];

export const EXPERTISE_SKILLS: SkillItem[] = [
  {
    name: 'Python',
    category: 'Programming',
    focusLabel: 'Core Language',
    levelRatio: 0.85,
    summary:
      'Scripting, logical problem solving, CLI utilities, and backend automation foundations.',
  },
  {
    name: 'JavaScript',
    category: 'Programming',
    focusLabel: 'Core Language',
    levelRatio: 0.84,
    summary:
      'Interactive application logic, asynchronous data flows, and modern ES6+ patterns.',
  },
  {
    name: 'HTML & CSS',
    category: 'Frontend',
    focusLabel: 'Web Foundations',
    levelRatio: 0.9,
    summary:
      'Semantic document structure, responsive grid architecture, and refined visual layout systems.',
  },
  {
    name: 'React',
    category: 'Frontend',
    focusLabel: 'Interface Engineering',
    levelRatio: 0.82,
    summary:
      'Component-driven architecture, custom hooks, accessible modals, and fluid state management.',
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    focusLabel: 'Type-Safe Architecture',
    levelRatio: 0.8,
    summary:
      'Predictable interfaces, structured data modeling, and maintainable application codebases.',
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    focusLabel: 'Design Systems',
    levelRatio: 0.88,
    summary:
      'Tokenized theming, dual light/dark parity, precision spacing, and editorial typography.',
  },
  {
    name: 'n8n',
    category: 'Automation',
    focusLabel: 'Orchestration',
    levelRatio: 0.82,
    summary:
      'Visual node-based pipelines connecting external APIs, triggers, webhooks, and scheduled notifications.',
  },
  {
    name: 'Workflow Automation',
    category: 'Automation',
    focusLabel: 'Applied Systems',
    levelRatio: 0.84,
    summary:
      'Designing repeatable, low-friction automations that aggregate signals and deliver timely updates.',
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'nanex-ai',
    index: '01',
    title: 'NANEX AI',
    category: 'Intelligent Assistant',
    shortDescription:
      'A personal AI assistant project inspired by intelligent desktop assistants.',
    overview:
      'Designed as a focused desktop companion concept that streamlines daily developer tasks, contextual queries, and quick command execution through an uncluttered conversational interface.',
    highlights: [
      'Modular command parsing built around clean Python execution flows',
      'Assistant persona tuned for rapid task recall and distraction-free interaction',
      'Architected for extensible local and automated action triggers',
    ],
    technologies: ['Python', 'Automation', 'Desktop Workflow'],
    image: nanexAiImg,
    imageAlt:
      'Minimalist matte charcoal and brushed silver hardware concept representing Nanex AI',
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 'hackathon-radar-ai',
    index: '02',
    title: 'HACKATHON RADAR AI',
    category: 'Discovery Automation',
    shortDescription:
      'An automation system designed to discover hackathons and deliver notifications.',
    overview:
      'An automated opportunity radar that monitors upcoming hackathon listings, filters relevant events, and pushes structured alerts so builders never miss key registration windows.',
    highlights: [
      'Scheduled discovery workflow orchestrated through n8n automation nodes',
      'Structured filtering and deduplication to surface high-signal events',
      'Automated notification delivery built for consistent awareness',
    ],
    technologies: ['n8n', 'JavaScript', 'Workflow Automation'],
    image: hackathonRadarImg,
    imageAlt:
      'Concentric brushed aluminum and smoked glass rings representing Hackathon Radar AI',
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 'ai-weather-news-assistant',
    index: '03',
    title: 'AI WEATHER & NEWS ASSISTANT',
    category: 'Automated Briefing',
    shortDescription:
      'An intelligent workflow that combines weather and news information and sends updates through email.',
    overview:
      'A daily morning briefing automation that collects real-time weather conditions alongside curated news summaries and formats them into a crisp, readable email digest.',
    highlights: [
      'Multi-source aggregation combining atmospheric forecasts and current headlines',
      'Clean email formatting pipeline triggered on a reliable daily cadence',
      'Built to replace fragmented morning checks with one calm digest',
    ],
    technologies: ['n8n', 'Workflow Automation', 'JavaScript'],
    image: weatherNewsImg,
    imageAlt:
      'Fluted optical glass prism refracting light onto dark stone representing the Weather and News Assistant',
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 'student-grade-calculator',
    index: '04',
    title: 'STUDENT GRADE CALCULATOR',
    category: 'Core Programming',
    shortDescription: 'A beginner-friendly programming project.',
    overview:
      'A clean foundational programming project focused on accurate score weighting, input validation, and clear grade calculation logic—serving as an early milestone in structured software thinking.',
    highlights: [
      'Clear conditional logic and boundary validation for reliable calculations',
      'Readable, modular function design prioritizing beginner clarity',
      'Built as a practical academic utility during early CS coursework',
    ],
    technologies: ['Python', 'HTML', 'CSS', 'JavaScript'],
    image: gradeCalculatorImg,
    imageAlt:
      'Matte charcoal geometric blocks with brushed steel vernier caliper representing the Student Grade Calculator',
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 'developer-portfolio',
    index: '05',
    title: 'DEVELOPER PORTFOLIO',
    category: 'Editorial Web Experience',
    shortDescription:
      'A personal website showcasing my technical journey.',
    overview:
      'An editorial-grade personal web platform built with React, TypeScript, and Tailwind CSS—featuring dual charcoal and warm-white themes, tactile micro-interactions, and a unified showcase of my projects.',
    highlights: [
      'Dual-theme dark and light design system with persisted visitor preference',
      'Accessible motion choreography respecting reduced-motion preferences',
      'Centralized typed data architecture for effortless ongoing updates',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    image: developerPortfolioImg,
    imageAlt:
      'Open architectural monograph beside milled dark aluminum on stone representing the Developer Portfolio',
    liveUrl: null,
    githubUrl: null,
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    step: '01',
    phase: 'Foundation',
    title: 'Starting My Computer Science Journey',
    subtitle: 'NIAT · Core Computing Principles',
    description:
      'Began formal Computer Science studies at NIAT, immersing myself in computational thinking, problem decomposition, and the fundamentals of how modern software systems operate.',
    focus: ['Computer Science', 'Problem Solving', 'NIAT'],
  },
  {
    step: '02',
    phase: 'Syntax & Logic',
    title: 'Learning Programming Foundations',
    subtitle: 'Python · JavaScript · Web Basics',
    description:
      'Moved from theory into writing code every day—building confidence with Python, JavaScript, HTML, and CSS through foundational exercises like the Student Grade Calculator.',
    focus: ['Python', 'JavaScript', 'HTML & CSS'],
  },
  {
    step: '03',
    phase: 'Exploration',
    title: 'Exploring Artificial Intelligence',
    subtitle: 'Intelligent Assistants · Practical AI Concepts',
    description:
      'Started exploring how intelligent interfaces and language-driven tools can augment human workflows, leading to personal concepts like Nanex AI.',
    focus: ['AI Exploration', 'Assistant Design', 'Digital Systems'],
  },
  {
    step: '04',
    phase: 'Orchestration',
    title: 'Building Automation Projects',
    subtitle: 'n8n · Automated Pipelines',
    description:
      'Translated curiosity into working workflows—connecting APIs, schedulers, and email delivery in projects such as Hackathon Radar AI and the AI Weather & News Assistant.',
    focus: ['n8n', 'Workflow Automation', 'API Pipelines'],
  },
  {
    step: '05',
    phase: 'Craft & Architecture',
    title: 'Developing Full-Stack Applications',
    subtitle: 'React · TypeScript · Tailwind CSS',
    description:
      'Advancing into structured frontend and full-stack engineering—combining type-safe React architectures, intentional typography, and intelligent systems into cohesive digital experiences.',
    focus: ['React', 'TypeScript', 'Tailwind CSS'],
  },
];

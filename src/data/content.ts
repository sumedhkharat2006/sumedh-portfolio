import { media, type VideoSource } from '../config/media';

export const site = {
  name: 'SUMEDH',
  role: 'FULL STACK DEVELOPER',
  sub: 'SYSTEM BUILDER | PROBLEM SOLVER',
  tagline: "I don't just write code. I build systems, solve problems, and turn ideas into working solutions.",
  email: 'sumedhkharat2006@gmail.com',
  phone: '+91 98192 12579',
  whatsapp: '919819212579', // country code + number, digits only (used for wa.me links)
  // Pre-filled message for the WhatsApp and email buttons
  greeting: 'Hi Sumedh, we are looking for a Full Stack Developer for our project and would like to discuss it with you. Please let us know a good time to connect.',
  emailSubject: 'Looking for a Full Stack Developer',
  github: 'https://github.com/sumedhkharat2006',
  linkedin: '', // optional
};

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export const skillGroups = [
  { title: 'Backend', items: ['C#', 'ASP.NET MVC', 'ASP.NET Web API'] },
  { title: 'Frontend', items: ['Angular', 'JavaScript'] },
  { title: 'Databases', items: ['Oracle 19c', 'SQL Server', 'MySQL'] },
  { title: 'Delivery & Testing', items: ['Git', 'GitHub', 'IIS', 'Selenium'] },
];
export const allSkills = skillGroups.flatMap((g) => g.items);

export const focusAreas = [
  { title: 'Enterprise applications', text: 'Line-of-business software that teams depend on every day.' },
  { title: 'Database management', text: 'Schemas, queries and data integrity across Oracle, SQL Server and MySQL.' },
  { title: 'Automation', text: 'Removing repetitive work with scheduled jobs and Selenium.' },
  { title: 'Backend architecture', text: 'Layered APIs and service boundaries designed to stay maintainable.' },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  summary: string;
  details: string[];
  tech: string[];
  hue: number;          // drives the generated fallback visual
  video?: VideoSource;  // cinematic background loop (no client data)
  image?: string;       // optional still image instead of video
  repo?: string;
};

export const projects: Project[] = [
  {
    id: 'taxone', index: '01', title: 'TAXONE', kicker: 'Enterprise Tax Compliance',
    summary: 'An enterprise tax compliance and TDS application that turns complex statutory rules into structured, auditable workflows.',
    details: [
      'TDS computation, deductee management and statutory form generation',
      'Background jobs for long-running filings and bulk processing',
      'Excel, CSV and PDF import/export for finance teams',
      'Selenium-driven automation for repetitive portal workflows',
    ],
    tech: ['C#', 'ASP.NET Web API (.NET 8)', 'Angular', 'Oracle 19c', 'Hangfire', 'Selenium', 'IIS'],
    hue: 222,
    video: media.taxone,
  },
  {
    id: 'hrms', index: '02', title: 'HRMS', kicker: 'Human Resource Management',
    summary: 'A human resource management system built on a clean, layered architecture for the everyday operations of people teams.',
    details: [
      'Domain / Application / Infrastructure layering for maintainability',
      'JWT-secured, role-based access for HR, managers and staff',
      'Attendance, leave and approval workflows with scheduled jobs',
      'Validated APIs with Swagger documentation',
    ],
    tech: ['C#', 'ASP.NET Web API (.NET 8)', 'Angular', 'Oracle 19c', 'Quartz', 'FluentValidation'],
    hue: 262,
    video: media.hrms,
  },
  {
    id: 'boutique', index: '03', title: 'SOFT PETAL BOUTIQUE', kicker: 'E-commerce',
    summary: 'An e-commerce application for a boutique fashion store, from catalogue and wishlist to checkout and inventory.',
    details: [
      'Product catalogue with categories and a shop storefront',
      'Wishlist, cart and order flow for customers',
      'Admin area for products, inventory, orders and customers',
      'Responsive storefront for mobile shoppers',
    ],
    tech: ['C#', 'ASP.NET MVC', 'Entity Framework', 'SQL Server', 'JavaScript', 'Bootstrap'],
    hue: 318,
    video: media.boutique,
    repo: 'https://github.com/sumedhkharat2006/SoftPetalBoutiqueECOMMERCE',
  },
];

// Add a `period` (e.g. '2024') to each chapter when ready.
export const journey: { chapter: string; title: string; text: string; period?: string }[] = [
  { chapter: 'Chapter 01', title: 'Foundations', text: 'Learned C#, .NET and relational databases, and started building with ASP.NET MVC.' },
  { chapter: 'Chapter 02', title: 'Commerce', text: 'Shipped Soft Petal Boutique, a full e-commerce storefront with an admin back office.' },
  { chapter: 'Chapter 03', title: 'Compliance at scale', text: 'Worked on TaxOne, an enterprise tax compliance and TDS application on Oracle 19c.' },
  { chapter: 'Chapter 04', title: 'People systems', text: 'Built an HRMS on a layered .NET 8 + Angular architecture.' },
  { chapter: 'Next', title: 'Builder mode', text: 'Deeper backend architecture, automation, and products of my own.' },
];

export const interests = [
  { id: 'cricket', title: 'Cricket', text: 'Reading conditions, building partnerships, playing the long innings. The same patience good systems need.' },
  { id: 'film', title: 'Filmmaking', text: "Frames, pacing and story. It's why this portfolio plays like a film." },
  { id: 'business', title: 'Business & Entrepreneurship', text: 'Understanding why software exists before deciding how to build it.' },
  { id: 'automation', title: 'Automation', text: 'If a task repeats, it should be scripted. Pipelines that remove busywork.' },
];

import { useState, useEffect, useCallback } from 'react';
import { siteConfig, getFullAvailability } from './siteConfig';

/* ─── Dedicated Flutter SVG Icon (Guaranteed to render crisply) ─── */
function FlutterIcon({ className = '', size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM6.002 15.698l6 6.002 7.37-7.37H12l-6 6z" />
    </svg>
  );
}

/* ─── Scroll Spy Active Section Hook ────────────────────────────── */
function useActiveSection(ids) {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActive(ids[i]);
          return;
        }
      }
      setActive(ids[0]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids]);

  return active;
}

/* ─── Subtle Scroll Reveal Hook (Single-fire, 200-300ms) ─────────── */
function useReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll('.reveal');

    if (prefersReduced) {
      els.forEach(el => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px 0px 0px' }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Print CV Helper (Sets document.title to Yeab-T-Mekasha-CV for PDF export) ── */
function triggerPrintCV() {
  document.title = 'Yeab-T-Mekasha-CV';
  window.print();
}

/* ─── ATS-Friendly Printable CV Document Component (Fits 1 A4 Page, Left-Aligned) ─── */
function CVDocument() {
  const availabilityLine = getFullAvailability();

  return (
    <article className="cv-document" aria-label="Curriculum Vitae of Yeab T. Mekasha">
      {/* CV Header: Name, Title, Contact Lines, Availability Line, Divider */}
      <div className="cv-header">
        <h1 className="cv-name">Yeab T. Mekasha</h1>
        <p className="cv-role-title">Frontend Developer with full-stack experience</p>
        <div className="cv-contact-bar">
          <div className="cv-contact-line">
            <a href={`mailto:${siteConfig.email}`} className="cv-link">
              {siteConfig.email}
            </a>
            <span className="cv-sep">•</span>
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="cv-link">
              {siteConfig.phone}
            </a>
            <span className="cv-sep">•</span>
            <span>Addis Ababa, Ethiopia</span>
          </div>
          <div className="cv-contact-line">
            <a href={siteConfig.siteUrl} target="_blank" rel="noreferrer" className="cv-link">
              yeabtmekasha.netlify.app
            </a>
            <span className="cv-sep">•</span>
            <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="cv-link">
              github.com/yeab350
            </a>
            <span className="cv-sep">•</span>
            <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="cv-link">
              linkedin.com/in/yeab-tsegaye
            </a>
          </div>
        </div>
        <p className="cv-avail-line">{availabilityLine}</p>
        <div className="cv-header-rule" />
      </div>

      {/* Professional Summary */}
      <div className="cv-section">
        <h2 className="cv-heading">Summary</h2>
        <p className="cv-summary-text">
          Frontend developer with full-stack experience building responsive web and mobile applications with React, TypeScript, Node.js, NestJS, PostgreSQL, and Flutter. Built e-commerce platforms with admin dashboards and role-based access. BSc Software Engineering candidate at HiLCoE (expected January 2027).
        </p>
      </div>

      {/* Technical Skills (4 Inline Rows, Frontend first with React & TypeScript first) */}
      <div className="cv-section">
        <h2 className="cv-heading">Skills</h2>
        <div className="cv-skills-inline">
          <p>
            <strong>Frontend:</strong> React, TypeScript, Next.js, JavaScript, HTML &amp; CSS
          </p>
          <p>
            <strong>Backend &amp; Databases:</strong> Node.js / Express, NestJS, PostgreSQL
          </p>
          <p>
            <strong>Mobile:</strong> Flutter (Dart), Kotlin
          </p>
          <p>
            <strong>Tools &amp; Workflow:</strong> Git &amp; GitHub, Docker, Figma, Vite
          </p>
        </div>
      </div>

      {/* Work Experience (Newest Start Date First: Atlascorp, Swift Rides, Sweaven, Freelance) */}
      <div className="cv-section">
        <h2 className="cv-heading">Experience</h2>

        {/* 1. Atlascorp Inc */}
        {/* TODO: add one measurable result here if true */}
        <div className="cv-entry">
          <div className="cv-entry-head">
            <div className="cv-entry-left">
              <strong className="cv-entry-role">Frontend Developer Assistant</strong>,{' '}
              <span className="cv-entry-company">Atlascorp Inc</span>{' '}
              <span className="cv-entry-meta">— Remote, Part-time</span>
            </div>
            <span className="cv-entry-dates">Apr 2026 – Present</span>
          </div>
          <ul className="cv-bullet-list">
            <li>Develop and maintain frontend features using React.</li>
            <li>Implement UI/UX improvements from design mockups.</li>
            <li>Assist with internal reporting dashboards for stakeholder data.</li>
          </ul>
        </div>

        {/* 2. Swift Rides LLC */}
        {/* TODO: add one measurable result here if true */}
        <div className="cv-entry">
          <div className="cv-entry-head">
            <div className="cv-entry-left">
              <strong className="cv-entry-role">Data Entry Specialist</strong>,{' '}
              <span className="cv-entry-company">Swift Rides LLC</span>{' '}
              <span className="cv-entry-meta">— Remote</span>
            </div>
            <span className="cv-entry-dates">May 2025 – Aug 2025</span>
          </div>
          <ul className="cv-bullet-list">
            <li>Managed and verified operational data records to ensure reporting accuracy.</li>
          </ul>
        </div>

        {/* 3. Sweaven Solutions */}
        {/* TODO: add one measurable result here if true */}
        <div className="cv-entry">
          <div className="cv-entry-head">
            <div className="cv-entry-left">
              <strong className="cv-entry-role">Full-Stack Developer</strong>,{' '}
              <span className="cv-entry-company">Sweaven Solutions</span>{' '}
              <span className="cv-entry-meta">— Addis Ababa, Ethiopia</span>
            </div>
            <span className="cv-entry-dates">Jan 2024 – Apr 2025</span>
          </div>
          <ul className="cv-bullet-list">
            <li>Built full-stack web applications using Next.js, NestJS, and PostgreSQL.</li>
            <li>Designed and integrated REST APIs for core features and database workflows.</li>
          </ul>
        </div>

        {/* 4. Freelance */}
        {/* TODO: add one measurable result here if true */}
        <div className="cv-entry">
          <div className="cv-entry-head">
            <div className="cv-entry-left">
              <strong className="cv-entry-role">Freelance Web Designer</strong>,{' '}
              <span className="cv-entry-company">Self-Employed</span>
            </div>
            <span className="cv-entry-dates">2023 – Present</span>
          </div>
          <ul className="cv-bullet-list">
            <li>Designed and delivered responsive websites for small businesses and individuals.</li>
          </ul>
        </div>
      </div>

      {/* Selected Projects (The Same 3 as Site, 2 Lines Each, No Repetitive General Links) */}
      <div className="cv-section">
        <h2 className="cv-heading">Projects</h2>

        <div className="cv-project-compact">
          <div className="cv-project-line1">
            <strong>UI Store</strong> — E-commerce platform for UI templates and components with user accounts and admin order management.
          </div>
          <div className="cv-project-line2">
            Tech: Express, PostgreSQL, Node.js, React
            {/* TODO: add project link when available */}
          </div>
        </div>

        <div className="cv-project-compact">
          <div className="cv-project-line1">
            <strong>Coffee E-commerce Website</strong> — Online specialty coffee shop with product browsing, cart, checkout, and admin dashboard with role-based access.
          </div>
          <div className="cv-project-line2">
            Tech: React, JavaScript, CSS3, REST API
            {/* TODO: add project link when available */}
          </div>
        </div>

        <div className="cv-project-compact">
          <div className="cv-project-line1">
            <strong>Coffee Shop App</strong> — Cross-platform companion app built with Flutter with reusable widgets, clean navigation, and admin dashboard with role-based access.
          </div>
          <div className="cv-project-line2">
            Tech: Flutter, Dart
            {/* TODO: add project link when available */}
          </div>
        </div>
      </div>

      {/* 3-Column Bottom Row: Education, Certifications, Languages */}
      <div className="cv-section cv-bottom-grid">
        <div className="cv-bottom-col">
          <h2 className="cv-heading">Education</h2>
          <div className="cv-sub-entry">
            <strong>BSc in Software Engineering</strong>
            <p>HiLCoE (Expected Jan 2027)</p>
          </div>
          <div className="cv-sub-entry">
            <strong>High School Diploma</strong>
            <p>Gibson Youth Academy (Jul 2021)</p>
          </div>
        </div>

        <div className="cv-bottom-col">
          <h2 className="cv-heading">Certifications</h2>
          <ul className="cv-sub-list">
            <li>Flutter Masterclass (Udemy)</li>
            <li>Programming Fundamentals (Udacity)</li>
            <li>English Proficiency &amp; SAT {/* TODO: add test names or scores */}</li>
          </ul>
        </div>

        <div className="cv-bottom-col">
          <h2 className="cv-heading">Languages</h2>
          <ul className="cv-sub-list">
            <li>English (Advanced)</li>
            <li>Amharic (Native)</li>
          </ul>
        </div>
      </div>
    </article>
  );
}

/* ─── Dedicated CV Preview View (#cv route) ─────────────────────── */
function CVPreviewView({ onBack, onDownload }) {
  return (
    <div className="cv-preview-page">
      {/* Top action bar */}
      <div className="cv-preview-bar no-print">
        <div className="cv-preview-bar-inner">
          <button type="button" onClick={onBack} className="btn-text">
            ← Back to Portfolio
          </button>
          <div className="cv-preview-actions">
            <span className="cv-print-hint">
              Tip: Destination: Save as PDF, A4 size, Margins: Default. Saved as Yeab-T-Mekasha-CV.pdf
            </span>
            <button type="button" onClick={onDownload} className="btn btn-solid">
              <i className="fas fa-print" aria-hidden="true" />
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Rendered CV paper */}
      <div className="cv-sheet-container">
        <CVDocument />
      </div>
    </div>
  );
}

/* ─── 3D Flip Project Card Component (Richer Front Face, No Featured Badge) ─── */
function ProjectCard({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => setIsFlipped(prev => !prev);

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <div className="project-card-col reveal">
      <article
        className={`project-card-wrapper ${isFlipped ? 'is-flipped' : ''}`}
        tabIndex={0}
        role="button"
        aria-label={`Project: ${project.title}. ${isFlipped ? 'Showing detailed back face' : 'Click or press Enter to view details'}`}
        aria-pressed={isFlipped}
        onClick={toggleFlip}
        onKeyDown={handleKeyDown}
      >
        <div className="flip-card-inner">
          {/* Front Face: Rich, informative, compact, no boxed icons, no featured badges */}
          <div className="flip-card-front">
            <div className="card-front-header">
              <span className="card-category-label">{project.category}</span>
              <div className="card-soft-icon" aria-hidden="true">
                {project.customIcon ? project.customIcon : <i className={project.icon} />}
              </div>
            </div>

            <div className="card-front-body">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-front-desc">{project.frontDescription}</p>
            </div>

            <div className="card-front-footer">
              <div className="card-tech-pills">
                {project.frontTech.map(tech => (
                  <span key={tech} className="tech-pill font-mono">
                    {tech}
                  </span>
                ))}
              </div>
              <span className="card-view-details">View details ↶</span>
            </div>
          </div>

          {/* Back Face: Longer overview, key features, role, live/github links */}
          <div className="flip-card-back">
            <div className="card-back-header">
              <h4 className="project-back-title">{project.title}</h4>
              <span className="project-back-role">{project.role}</span>
            </div>

            <p className="project-back-desc">{project.backDescription}</p>

            <ul className="project-features-list">
              {project.features.map((feat, idx) => (
                <li key={idx}>
                  <span className="feat-bullet">•</span> {feat}
                </li>
              ))}
            </ul>

            <div className="project-back-links">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-action-link"
                  onClick={e => e.stopPropagation()}
                  onKeyDown={e => e.stopPropagation()}
                >
                  Live Demo ↗
                </a>
              ) : (
                <span className="card-action-link-muted" title="Live demo link placeholder">

                </span>
              )}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-action-link"
                  onClick={e => e.stopPropagation()}
                  onKeyDown={e => e.stopPropagation()}
                >
                  GitHub ↗
                </a>
              ) : (
                <span className="card-action-link-muted">
                  GitHub ↗
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ─── Main Portfolio Application Component ──────────────────────── */
export default function App() {
  const normalTitle = 'Yeab T. Mekasha — Frontend Developer';

  // Dark mode as default: only light if user explicitly chose 'false'
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
    return true; // Default dark
  });

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCVView, setIsCVView] = useState(() => window.location.hash === '#cv');

  // Sync document.title for view and print handling (saving as Yeab-T-Mekasha-CV.pdf)
  useEffect(() => {
    if (isCVView) {
      document.title = 'Yeab-T-Mekasha-CV';
    } else {
      document.title = normalTitle;
    }
  }, [isCVView]);

  useEffect(() => {
    const handleBeforePrint = () => {
      document.title = 'Yeab-T-Mekasha-CV';
    };
    const handleAfterPrint = () => {
      if (window.location.hash !== '#cv') {
        document.title = normalTitle;
      } else {
        document.title = 'Yeab-T-Mekasha-CV';
      }
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  // Handle Hash Changes for #cv preview routing
  useEffect(() => {
    const handleHashChange = () => {
      setIsCVView(window.location.hash === '#cv');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync dark mode preference with localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', dark ? 'true' : 'false');
  }, [dark]);

  // Navbar blur on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click or resize
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = e => {
      if (!e.target.closest('.navbar')) setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false);
    };
    document.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  useReveal();

  const activeSection = useActiveSection(['home', 'about', 'experience', 'portfolio', 'contact']);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleCopyEmail = () => {
    const email = siteConfig.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#portfolio', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  /* ── Master Projects Data: Exactly 3 shown in Grid, others in "Also built" row ── */
  const allProjects = [
    {
      id: 'ui-store',
      title: 'UI Store',
      role: 'Full-Stack Developer',
      category: 'Web Application',
      icon: 'fas fa-store',
      frontDescription: 'E-commerce platform for UI templates and components with user accounts and admin management',
      frontTech: ['Express', 'PostgreSQL', 'Node.js', 'React'],
      backDescription: 'Curated e-commerce template platform with user authentication, catalog management, and admin order workflows.',
      features: [
        'Admin CRUD and order management',
        'Authentication and purchase history',
        'PostgreSQL schema design & Express REST API',
      ],
      liveUrl: '', // Placeholder: fill in when live demo URL is ready
      githubUrl: siteConfig.socials.github,
      inGrid: true,
    },
    {
      id: 'coffee-ecommerce',
      title: 'Coffee E-commerce Website',
      role: 'Frontend Developer',
      category: 'Web Application',
      icon: 'fas fa-mug-hot',
      frontDescription: 'Online coffee shop with product browsing, cart, and checkout',
      frontTech: ['React', 'JavaScript', 'CSS3', 'REST API'],
      backDescription: 'Specialty coffee storefront featuring interactive product browsing, shopping cart state management, and streamlined checkout.',
      features: [
        'Interactive product catalog and cart flow',
        'Streamlined multi-step checkout',
        'Responsive layout across mobile and desktop',
        'Admin dashboard with role-based access',
      ],
      liveUrl: '', // Placeholder: fill in when live demo URL is ready
      githubUrl: siteConfig.socials.github,
      inGrid: true,
    },
    {
      id: 'coffee-app',
      title: 'Coffee Shop App',
      role: 'Mobile Developer',
      category: 'Mobile Application',
      customIcon: <FlutterIcon size={20} className="flutter-icon-svg" />,
      frontDescription: 'Cross-platform companion app built with Flutter',
      frontTech: ['Flutter', 'Dart'],
      backDescription: 'Cross-platform mobile ordering companion built with Flutter and Dart using modular, reusable widgets.',
      features: [
        'Reusable widgets and clean navigation',
        'Admin dashboard with role-based access',
        'Cross-platform ordering flow in Flutter & Dart',
      ],
      liveUrl: '', // Placeholder: fill in when mobile demo or APK is ready
      githubUrl: siteConfig.socials.github,
      inGrid: true,
    },
    {
      id: 'portfolio-site',
      title: 'Portfolio Website',
      role: 'Designer & Developer',
      category: 'Web Platform',
      tech: 'React, Vite, CSS3',
      description: 'Responsive personal portfolio and single-page ATS-optimized printable CV.',
      liveUrl: siteConfig.siteUrl,
      githubUrl: siteConfig.socials.github,
      inGrid: false,
    },
    {
      id: 'uiux-wireframe',
      title: 'UI/UX Wireframe System',
      role: 'UI/UX Designer',
      category: 'Product Design',
      tech: 'Figma, UX, Wireframing',
      description: 'Mobile app wireframes focused on navigation flow, usability, and feedback.',
      liveUrl: '',
      githubUrl: siteConfig.socials.github,
      inGrid: false,
    },
  ];

  // Grid projects (exactly 3)
  const gridProjects = allProjects.filter(p => p.inGrid);
  // Also built projects (preserved data)
  const alsoBuiltProjects = allProjects.filter(p => !p.inGrid);

  const availabilityText = getFullAvailability();

  // If currently visiting #cv view directly, render the dedicated CV preview screen
  if (isCVView) {
    return (
      <div className={`page ${dark ? 'dark' : 'light'}`}>
        <CVPreviewView
          onBack={() => {
            window.location.hash = '#home';
          }}
          onDownload={triggerPrintCV}
        />
      </div>
    );
  }

  return (
    <div className={`page ${dark ? 'dark' : 'light'} ${scrolled ? 'is-scrolled' : ''}`}>
      {/* ── HEADER / NAVIGATION ── */}
      <header className="site-header no-print">
        <nav className="navbar" aria-label="Main navigation">
          {/* Plain, Professional Brand Logo */}
          <a href="#home" className="navbar-brand">
            {siteConfig.name}
          </a>

          {/* Nav Links */}
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`} role="menubar">
            {navLinks.map(({ href, label }) => {
              const sectionId = href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={href} role="none">
                  <a
                    href={href}
                    role="menuitem"
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
            <li role="none">
              <button
                type="button"
                onClick={triggerPrintCV}
                className="nav-cv-btn"
                role="menuitem"
                title="Download CV as PDF"
              >
                Download CV
              </button>
            </li>
          </ul>

          {/* Theme Toggle & Mobile Menu Trigger */}
          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDark(d => !d)}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {dark ? (
                <i className="fas fa-sun" aria-hidden="true" />
              ) : (
                <i className="fas fa-moon" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              className={`burger-btn ${menuOpen ? 'active' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="nav-links"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span className="burger-bar" />
              <span className="burger-bar" />
              <span className="burger-bar" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main id="main-content" className="no-print">
        {/* ── HERO SECTION ── */}
        <section className="hero-section reveal" id="home" aria-label="Introduction">
          <div className="container hero-container">
            <div className="hero-content">
              {/* Editable Status Line */}
              <div className="status-indicator-pill">
                <span className="status-dot" aria-hidden="true" />
                <span>Open to opportunities</span>
              </div>

              <h1 className="hero-title">{siteConfig.title}</h1>
              <p className="hero-subtitle">{siteConfig.subtitle}</p>

              {/* Central Availability Statement */}
              <p className="hero-available-line">{availabilityText}</p>

              {/* Short 1-2 line intro */}
              <p className="hero-summary">
                I build responsive web and mobile applications using React, TypeScript, and modern engineering practices.
              </p>

              {/* Stack labels (Frontend first, React & TypeScript first) */}
              <div className="hero-stack-row">
                <span className="stack-label font-mono">React</span>
                <span className="stack-label font-mono">TypeScript</span>
                <span className="stack-label font-mono">Node.js</span>
                <span className="stack-label font-mono">Flutter</span>
              </div>

              {/* CTA Buttons */}
              <div className="hero-cta-group">
                <a href="#portfolio" className="btn btn-solid">
                  View Projects
                </a>
                <button type="button" onClick={triggerPrintCV} className="btn btn-outline">
                  Download CV
                </button>
                <a href="#contact" className="btn btn-ghost">
                  Contact
                </a>
              </div>

              {/* Social profile links (LinkedIn, GitHub, Telegram — X/Twitter removed) */}
              <div className="hero-socials">
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="LinkedIn profile of Yeab T. Mekasha"
                >
                  <i className="fab fa-linkedin-in" aria-hidden="true" />
                </a>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="GitHub profile of Yeab T. Mekasha"
                >
                  <i className="fab fa-github" aria-hidden="true" />
                </a>
                <a
                  href={siteConfig.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Telegram"
                >
                  <i className="fab fa-telegram" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Profile Photo: Circular, 240-300px with thin offset accent ring */}
            <div className="hero-media">
              <div className="hero-photo-ring">
                <img
                  src="/Images/Profile.jpg"
                  alt="Yeab T. Mekasha"
                  className="hero-photo-circle"
                  width="280"
                  height="280"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT SECTION ── */}
        <section className="section reveal" id="about" aria-label="About Yeab T. Mekasha">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">About</h2>
              <div className="section-accent-line" />
            </div>

            {/* 3-sentence summary (About 55% width, leading with what I build & skills) */}
            <div className="about-intro-layout">
              <p className="about-bio">
                I build responsive web and mobile applications using React, TypeScript, and modern engineering practices.
                My foundation covers frontend architecture, full-stack development with Node.js, NestJS, and PostgreSQL,
                and cross-platform mobile apps with Flutter. I focus on clean code, accessible user experiences, and reliable systems.
              </p>
            </div>

            {/* Unboxed Skills Groups across Full Width (4 Columns, Frontend First) */}
            <div className="skills-block">
              <h3 className="subheading">Technical Skills</h3>
              <div className="skills-columns-grid">
                <div className="skill-group">
                  <h4 className="skill-group-title">Frontend</h4>
                  <p className="skill-group-items">
                    React, TypeScript, Next.js, JavaScript, HTML &amp; CSS
                  </p>
                </div>
                <div className="skill-group">
                  <h4 className="skill-group-title">Backend</h4>
                  <p className="skill-group-items">
                    Node.js / Express, NestJS, PostgreSQL
                  </p>
                </div>
                <div className="skill-group">
                  <h4 className="skill-group-title">Mobile</h4>
                  <p className="skill-group-items">
                    Flutter (Dart), Kotlin
                  </p>
                </div>
                <div className="skill-group">
                  <h4 className="skill-group-title">Tools</h4>
                  <p className="skill-group-items">
                    Git &amp; GitHub, Docker, Figma, Vite
                  </p>
                </div>
              </div>
            </div>

            {/* 3-Column Full-Width Credentials Layout: Education, Certifications, Languages */}
            <div className="credentials-columns-grid">
              {/* Education */}
              <div className="credential-col">
                <h3 className="subheading">Education</h3>
                <div className="cred-entry">
                  <h4 className="cred-entry-title">BSc in Software Engineering</h4>
                  <p className="cred-entry-sub">HiLCoE School of Computer Science &amp; Technology</p>
                  <span className="cred-entry-date font-mono">Expected Jan 2027</span>
                </div>
                <div className="cred-entry">
                  <h4 className="cred-entry-title">High School Diploma</h4>
                  <p className="cred-entry-sub">Gibson Youth Academy</p>
                  <span className="cred-entry-date font-mono">Jul 2021</span>
                </div>
              </div>

              {/* Certifications */}
              <div className="credential-col">
                <h3 className="subheading">Certifications</h3>
                <div className="cred-entry">
                  <h4 className="cred-entry-title">Flutter Masterclass</h4>
                  <p className="cred-entry-sub">Udemy</p>
                  <a
                    href="https://www.udemy.com/certificate/UC-c1e6aace-266f-4a64-a4b7-7c768cb23fe9/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cred-entry-link"
                  >
                    View credential ↗
                  </a>
                </div>
                <div className="cred-entry">
                  <h4 className="cred-entry-title">Programming Fundamentals</h4>
                  <p className="cred-entry-sub">Udacity Nanodegree</p>
                  <a
                    href="https://www.udacity.com/certificate/e/7b7dc418-4dcd-11ef-a8ef-af08c2425f8e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cred-entry-link"
                  >
                    View credential ↗
                  </a>
                </div>
                <div className="cred-entry">
                  <h4 className="cred-entry-title">English Proficiency &amp; SAT {/* TODO: add test names or scores */}</h4>
                  <p className="cred-entry-sub">Standardized testing</p>
                </div>
              </div>

              {/* Languages */}
              <div className="credential-col">
                <h3 className="subheading">Languages</h3>
                <div className="cred-entry">
                  <h4 className="cred-entry-title">English</h4>
                  <p className="cred-entry-sub">Advanced proficiency</p>
                </div>
                <div className="cred-entry">
                  <h4 className="cred-entry-title">Amharic</h4>
                  <p className="cred-entry-sub">Native speaker</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE SECTION ── */}
        <section className="section reveal" id="experience" aria-label="Work Experience">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Experience</h2>
              <div className="section-accent-line" />
            </div>

            {/* Simple Timeline Rows with Thin Dividers across full width (Newest Start Date First) */}
            <div className="experience-list">
              {/* 1. Atlascorp Inc */}
              {/* TODO: add one measurable result here if true */}
              <div className="experience-row">
                <div className="exp-meta">
                  <span className="exp-dates font-mono">Apr 2026 – Present</span>
                  <span className="exp-badge-current">Current</span>
                </div>
                <div className="exp-details">
                  <h3 className="exp-role">Frontend Developer Assistant</h3>
                  <p className="exp-company">Atlascorp Inc · Part-time, Remote</p>
                  <ul className="exp-bullets">
                    <li>Develop and maintain frontend features using React.</li>
                    <li>Implement UI/UX improvements from design mockups.</li>
                    <li>Assist with internal reporting dashboards for stakeholder data.</li>
                  </ul>
                </div>
              </div>

              {/* 2. Swift Rides LLC */}
              {/* TODO: add one measurable result here if true */}
              <div className="experience-row">
                <div className="exp-meta">
                  <span className="exp-dates font-mono">May 2025 – Aug 2025</span>
                </div>
                <div className="exp-details">
                  <h3 className="exp-role">Data Entry Specialist</h3>
                  <p className="exp-company">Swift Rides LLC · Remote</p>
                  <ul className="exp-bullets">
                    <li>Managed and maintained accurate data records to support operational reporting.</li>
                  </ul>
                </div>
              </div>

              {/* 3. Sweaven Solutions */}
              {/* TODO: add one measurable result here if true */}
              <div className="experience-row">
                <div className="exp-meta">
                  <span className="exp-dates font-mono">Jan 2024 – Apr 2025</span>
                </div>
                <div className="exp-details">
                  <h3 className="exp-role">Full-Stack Developer</h3>
                  <p className="exp-company">Sweaven Solutions · Addis Ababa, Ethiopia</p>
                  <ul className="exp-bullets">
                    <li>Built full-stack web applications using Next.js, NestJS, and PostgreSQL.</li>
                    <li>Designed and integrated REST APIs for core features and database workflows.</li>
                  </ul>
                </div>
              </div>

              {/* 4. Freelance */}
              {/* TODO: add one measurable result here if true */}
              <div className="experience-row">
                <div className="exp-meta">
                  <span className="exp-dates font-mono">2023 – Present</span>
                </div>
                <div className="exp-details">
                  <h3 className="exp-role">Freelance Web Designer</h3>
                  <p className="exp-company">Self-Employed</p>
                  <ul className="exp-bullets">
                    <li>Designed and developed responsive websites for small businesses and individuals.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS SECTION (Exactly 3 Rich Cards + "Also Built" Row) ── */}
        <section className="section reveal" id="portfolio" aria-label="Featured Projects">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Projects</h2>
              <div className="section-accent-line" />
            </div>

            {/* Exactly 3 Rich Flip Cards across Container Width */}
            <div className="projects-grid">
              {gridProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Slim "Also Built" Row spanning full width */}
            <div className="also-built-row">
              <span className="also-built-label font-mono">Also built:</span>
              <div className="also-built-items">
                {alsoBuiltProjects.map(p => (
                  <span key={p.id} className="also-built-item">
                    <strong>{p.title}</strong>{' '}
                    <span className="also-built-tech">({p.tech})</span>
                  </span>
                ))}
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="also-built-github-link"
                >
                  More on GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT SECTION (Centered Card Layout) ── */}
        <section className="section reveal" id="contact" aria-label="Contact Information">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">Contact</h2>
              <div className="section-accent-line center" />
            </div>

            <div className="contact-card">
              {/* Short availability message from siteConfig */}
              <p className="contact-card-message">{availabilityText}</p>

              {/* Email with copy button */}
              <div className="contact-card-email-row">
                <a href={`mailto:${siteConfig.email}`} className="contact-card-email-link">
                  <i className="fas fa-envelope" aria-hidden="true" />
                  <span>{siteConfig.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`btn-copy-pill ${copied ? 'copied' : ''}`}
                  aria-label="Copy email address"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Phone number below the email */}
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="contact-card-phone-link">
                <i className="fas fa-phone" aria-hidden="true" />
                <span>{siteConfig.phone}</span>
              </a>

              {/* Filled green pill button "Download CV" (primary action) */}
              <div className="contact-card-cta">
                <button type="button" onClick={triggerPrintCV} className="btn btn-solid cv-btn-pill">
                  <i className="fas fa-file-arrow-down" aria-hidden="true" />
                  Download CV
                </button>
              </div>

              {/* Thin divider */}
              <div className="contact-card-divider" />

              {/* Row of pill-shaped link buttons with icons: LinkedIn, GitHub, Telegram */}
              <div className="contact-card-social-row">
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-pill"
                  aria-label="LinkedIn profile of Yeab T. Mekasha"
                >
                  <i className="fab fa-linkedin-in" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-pill"
                  aria-label="GitHub profile of Yeab T. Mekasha"
                >
                  <i className="fab fa-github" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href={siteConfig.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-pill"
                  aria-label="Telegram"
                >
                  <i className="fab fa-telegram" aria-hidden="true" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer no-print">
        <div className="container footer-content">
          <p>© 2026 {siteConfig.name}</p>
          <a href="#cv" className="footer-cv-link">
            View Printable CV
          </a>
        </div>
      </footer>

      {/* ── PRINT-ONLY CV CONTAINER (Exclusively displayed when printing) ── */}
      <div className="print-cv-container" aria-hidden="true">
        <CVDocument />
      </div>
    </div>
  );
}

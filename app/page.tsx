'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import type { IconType } from 'react-icons';
import {
    SiBootstrap,
    SiExpress,
    SiGit,
    SiGithub,
    SiGsap,
    SiHtml5,
    SiJira,
    SiJavascript,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPostman,
    SiReact,
    SiRender,
    SiTailwindcss,
    SiTypescript,
    SiVercel,
    SiYaml,
} from 'react-icons/si';
import { TbAutomation, TbBrandCss3 } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import { FiArrowUpRight, FiMail, FiMessageCircle, FiMoon, FiPhone, FiSun } from 'react-icons/fi';
import MagneticButton from '@/components/MagneticButton';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import HeroParticles from '@/components/HeroParticles';

const services = [
    { title: 'Full Stack Development', description: 'End-to-end web applications with thoughtful React interfaces and dependable Node.js backends.' },
    { title: 'Frontend Architecture', description: 'Responsive, accessible interfaces built with reusable components and maintainable TypeScript.' },
    { title: 'Backend & APIs', description: 'Practical REST APIs, authentication, and server-side features designed around real user needs.' },
    { title: 'Database Design', description: 'Clear data models and reliable integrations using MongoDB, PostgreSQL, and related tools.' },
];

const techStack: { category: string; items: { name: string; icon: IconType }[] }[] = [
    { category: 'Frontend', items: [
        { name: 'React', icon: SiReact }, { name: 'Next.js', icon: SiNextdotjs },
        { name: 'TypeScript', icon: SiTypescript }, { name: 'JavaScript', icon: SiJavascript },
        { name: 'HTML5', icon: SiHtml5 }, { name: 'CSS3', icon: TbBrandCss3 },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'Bootstrap', icon: SiBootstrap }, { name: 'GSAP', icon: SiGsap },
    ] },
    { category: 'Backend & data', items: [
        { name: 'Node.js', icon: SiNodedotjs }, { name: 'Express', icon: SiExpress },
        { name: 'MongoDB', icon: SiMongodb }, { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'MySQL', icon: SiMysql },
    ] },
    { category: 'Tools', items: [
        { name: 'Git', icon: SiGit }, { name: 'GitHub', icon: SiGithub },
        { name: 'VS Code', icon: VscVscode }, { name: 'Postman', icon: SiPostman },
        { name: 'Jira', icon: SiJira },
        { name: 'YAML', icon: SiYaml },
    ] },
    { category: 'Low-code & delivery', items: [
        { name: 'Mendix', icon: TbAutomation }, { name: 'Vercel', icon: SiVercel },
        { name: 'Render', icon: SiRender },
    ] },
];

const projects = [
    {
        title: 'FYP Management System',
        outcome: 'A shared workspace that keeps student projects, supervisors, and coordinators in sync.',
        problem: 'Project coordination and progress updates were scattered.',
        solution: 'Created role-based dashboards, group management, and progress tracking.',
        result: 'A single portal for the full project lifecycle. (Replace with measured impact.)',
        tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
        image: '/projects/fyp-management.svg',
        live: 'https://fyp-management-system-jet.vercel.app/login',
        github: 'https://github.com/rafeh216/FYP-MANAGEMENT-SYSTEM',
    },
    {
        title: "Cravin' Buns",
        outcome: 'A restaurant ordering and management workflow, built to replace manual order-taking.',
        problem: 'Manual order-taking made it harder to organize incoming restaurant orders.',
        solution: 'Created a digital ordering and restaurant management system.',
        result: 'A more structured ordering workflow.',
        tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Render'],
        image: '/projects/cravin-buns.png',
        live: 'https://cravinbuns.vercel.app/',
        github: 'https://github.com/rafeh216/cravin-buns',
    },
    {
        title: 'EduQuiz',
        outcome: 'A full-stack quiz platform with Google sign-in and real-time scoring.',
        problem: 'Learners need an engaging way to take quizzes and see their scores.',
        solution: 'Built an authenticated quiz platform with real-time scoring.',
        result: 'Tested with 50 users.',
        tags: ['React', 'Node.js', 'Express', 'Vercel', 'Render'],
        image: '/projects/eduquiz.png',
        live: 'https://eduquiz-ar.vercel.app/',
        github: 'https://github.com/awais2228/EduQuiz',
    },
];

const contactLinks = [
    { label: 'Email', value: 'abbasirafay64@gmail.com', href: 'mailto:abbasirafay64@gmail.com', icon: FiMail },
    { label: 'Phone', value: '+92 317 050 0728', href: 'tel:+923170500728', icon: FiPhone },
    { label: 'WhatsApp', value: '+92 317 050 0728', href: 'https://wa.me/923170500728', icon: FiMessageCircle },
    { label: 'GitHub', value: 'rafeh216', href: 'https://github.com/rafeh216', icon: SiGithub },
    { label: 'LinkedIn', value: 'Abdul Rafay Abbasi', href: 'https://www.linkedin.com/in/abdul-rafay-abbasi-b257273aa/', icon: FiArrowUpRight },
];

const navigation = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'stack' },
    { label: 'Experience', id: 'journey' },
    { label: 'Projects', id: 'work' },
    { label: 'Contact', id: 'contact' },
];

function AnimatedStat({ value, label }: { value: number; label: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setCount(value);
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            const start = performance.now();
            const duration = 1100;
            const animate = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                setCount(Math.round(value * (1 - (1 - progress) ** 3)));
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            observer.disconnect();
        }, { threshold: 0.5 });
        observer.observe(element);
        return () => observer.disconnect();
    }, [value]);

    return (
        <div className="stat-card" ref={ref}>
            <div className="stat-num">{count}<span>+</span></div>
            <div className="eyebrow">{label}</div>
        </div>
    );
}

export default function Home() {
    const [activeSection, setActiveSection] = useState('about');
    const [activeService, setActiveService] = useState<number | null>(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    useEffect(() => {
        const savedTheme = document.documentElement.dataset.theme;
        if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let frame = 0;
        const updateScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
                document.documentElement.style.setProperty('--parallax-y', reducedMotion ? '0px' : `${Math.min(window.scrollY * 0.1, 120)}px`);
            });
        };
        updateScroll();
        window.addEventListener('scroll', updateScroll, { passive: true });
        window.addEventListener('resize', updateScroll);

        const sections = navigation.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);
        const observer = new IntersectionObserver((entries) => {
            const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visible) setActiveSection(visible.target.id);
        }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.2, 0.5] });
        sections.forEach((section) => observer.observe(section));

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', updateScroll);
            window.removeEventListener('resize', updateScroll);
            observer.disconnect();
        };
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        document.documentElement.dataset.theme = nextTheme;
        window.localStorage.setItem('theme', nextTheme);
    };

    const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormState('sending');
        const form = event.currentTarget;
        const formData = new FormData(form);
        try {
            // TODO: Replace YOUR_FORMSPREE_ID with the ID from your free Formspree form.
            const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            });
            if (!response.ok) throw new Error('The contact form endpoint returned an error.');
            setFormState('sent');
            form.reset();
        } catch {
            setFormState('error');
        }
    };

    const handleProjectMove = (event: MouseEvent<HTMLElement>) => {
        if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        event.currentTarget.style.setProperty('--pointer-x', `${x * 100}%`);
        event.currentTarget.style.setProperty('--pointer-y', `${y * 100}%`);
        event.currentTarget.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 3}deg) rotateY(${(x - 0.5) * 3}deg) translateY(-4px)`;
    };

    const resetProjectTilt = (event: MouseEvent<HTMLElement>) => {
        event.currentTarget.style.transform = '';
    };

    return (
        <main>
            <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
            <header className="site-header">
                <nav className="navbar container" aria-label="Main navigation">
                    <a href="#top" className="nav-logo" aria-label="Abdul Rafay Abbasi home">AR<span>.</span></a>
                    <div id="mobile-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={activeSection === item.id ? 'active' : ''}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a href="#contact" className="button button-small nav-contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk</a>
                    </div>
                    <div className="nav-actions">
                        <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
                            {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
                        </button>
                        <button
                            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-navigation"
                        >
                            <span /><span />
                        </button>
                    </div>
                </nav>
            </header>

            <section id="top" className="hero">
                <HeroParticles />
                <div className="hero-glow" aria-hidden="true" />
                <div className="container hero-content">
                    <div className="availability"><span /> Open to opportunities</div>
                    <TextReveal as="h1" className="hero-title" delay={0.08}>Full Stack Developer</TextReveal>
                    <p className="hero-name">Abdul Rafay Abbasi</p>
                    <p className="hero-description">
                        I build thoughtful web experiences from the first interface to the systems behind it.
                        Focused on clean code, useful details, and products that work beautifully.
                    </p>
                    <div className="hero-actions">
                        <MagneticButton href="#work" className="button button-primary">Explore my work <FiArrowUpRight aria-hidden="true" /></MagneticButton>
                        <MagneticButton href="/resume.pdf" download className="button button-quiet" aria-label="Download resume PDF">
                            Download Resume <FiArrowUpRight aria-hidden="true" />
                        </MagneticButton>
                    </div>
                    <div className="hero-meta"><span>Based in Pakistan</span><span className="meta-dot" /><span>Available for select projects</span></div>
                </div>
                <a href="#about" className="scroll-cue" aria-label="Scroll to about section"><span /> Scroll to explore</a>
            </section>

            <div className="marquee-strip" aria-label="Full Stack Developer, React, Next.js, Node.js">
                <div className="marquee-track">
                    <div className="marquee-content"><span>Full Stack Developer</span><i>✳</i><span>React</span><i>✳</i><span>Next.js</span><i>✳</i><span>Node.js</span><i>✳</i></div>
                    <div className="marquee-content" aria-hidden="true"><span>Full Stack Developer</span><i>✳</i><span>React</span><i>✳</i><span>Next.js</span><i>✳</i><span>Node.js</span><i>✳</i></div>
                </div>
            </div>

            <section id="about" className="section container">
                <ScrollReveal className="about-layout">
                    <div className="section-heading">
                        <p className="eyebrow"><span>01</span> A little about me</p>
                        <h2>Building useful things for the <span>real world.</span></h2>
                    </div>
                    <div className="about-copy">
                        <p>I&apos;m a Full Stack Developer with hands-on experience across the MERN stack, Next.js, and Mendix. I&apos;ve delivered 12+ applications for independent clients and contributed to enterprise workflows at NESL IT and Softoo.</p>
                        <p>My work spans data modeling, business logic, responsive interfaces, testing, and deployment. I&apos;m also a Mendix Certified Rapid Developer.</p>
                        <div className="stats-row">
                            <AnimatedStat value={2} label="Years experience" />
                            <AnimatedStat value={12} label="Projects delivered" />
                        </div>
                        <a className="text-link" href="#journey">More about my journey <FiArrowUpRight aria-hidden="true" /></a>
                    </div>
                </ScrollReveal>
            </section>

            <section id="stack" className="section section-muted">
                <div className="container">
                    <ScrollReveal className="section-intro">
                        <p className="eyebrow"><span>02</span> Tools of the trade</p>
                        <h2>A stack built for <span>shipping.</span></h2>
                        <p>Tools I use to turn ideas into reliable, user-friendly products.</p>
                    </ScrollReveal>
                    <div className="tech-groups">
                        {techStack.map((group, groupIndex) => (
                            <ScrollReveal key={group.category} className="tech-group-reveal" delay={groupIndex * 0.08}>
                                <div className="tech-group">
                                    <h3 className="tech-category-label">{group.category}</h3>
                                    <div className="tech-grid">
                                        {group.items.map(({ name, icon: Icon }, itemIndex) => (
                                            <div className="tech-card" key={name} style={{ animationDelay: `${itemIndex * 35}ms` }}>
                                                <Icon aria-hidden="true" />
                                                <span>{name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <section id="services" className="section container">
                <ScrollReveal className="section-intro">
                    <p className="eyebrow"><span>03</span> How I can help</p>
                    <h2>Services &amp; expertise</h2>
                    <p>From a new feature to a complete application, thoughtful execution at every step.</p>
                </ScrollReveal>
                <div className="accordion-list">
                    {services.map((service, index) => (
                        <div className={`accordion-item ${activeService === index ? 'active' : ''}`} key={service.title}>
                            <button
                                className="accordion-trigger"
                                id={`service-trigger-${index}`}
                                aria-expanded={activeService === index}
                                aria-controls={`service-panel-${index}`}
                                onClick={() => setActiveService(activeService === index ? null : index)}
                            >
                                <span className="accordion-num">0{index + 1}</span>
                                <span className="accordion-title">{service.title}</span>
                                <span className="accordion-icon" aria-hidden="true">+</span>
                            </button>
                            <div
                                className="accordion-panel"
                                id={`service-panel-${index}`}
                                role="region"
                                aria-labelledby={`service-trigger-${index}`}
                                aria-hidden={activeService !== index}
                            >
                                <div><p>{service.description}</p></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="journey" className="section section-muted">
                <div className="container journey-layout">
                    <ScrollReveal className="section-intro">
                        <p className="eyebrow"><span>04</span> Experience</p>
                        <h2>A journey of <span>learning by building.</span></h2>
                        <p>From freelance product delivery to enterprise low-code development.</p>
                    </ScrollReveal>
                    <div className="timeline">
                        <ScrollReveal>
                            <article className="timeline-entry">
                                <span className="timeline-date">May 2024 — Present</span>
                                <div><h3>Freelance Web Developer <span>· Self-employed</span></h3><p>Delivered 12+ full-stack applications and landing pages, managing client requirements, delivery, and deployment end to end.</p></div>
                            </article>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1}>
                            <article className="timeline-entry">
                                <span className="timeline-date">Nov 2025 — Jul 2026</span>
                                <div><h3>Junior Mendix Developer <span>· NESL IT, Islamabad</span></h3><p>Built domain models, microflows, and automated workflows; translated stakeholder needs into modules and maintained YAML-based tests tracked in Jira.</p></div>
                            </article>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <article className="timeline-entry">
                                <span className="timeline-date">Jul — Sep 2025</span>
                                <div><h3>Mendix Developer Intern <span>· Softoo, Islamabad</span></h3><p>Created domain models and microflows for complex data relationships and designed UI flows for internal business tools.</p></div>
                            </article>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <section id="education" className="section container education-section">
                <ScrollReveal className="education-card">
                    <div>
                        <p className="eyebrow"><span>05</span> Education</p>
                        <h2>Grounded in <span>curiosity.</span></h2>
                    </div>
                    <div className="education-details">
                        <h3>Bachelor in Software Engineering</h3>
                        <p>Bahria University, Islamabad</p>
                        <p className="education-note">Expected June 2027</p>
                    </div>
                    <div className="education-details">
                        <h3>Mendix Certified Rapid Developer</h3>
                        <p>Basic level certification</p>
                        <p className="education-note">Languages: English, Urdu</p>
                    </div>
                    <a href="/resume.pdf" download className="button button-primary">
                        Download Resume <FiArrowUpRight aria-hidden="true" />
                    </a>
                </ScrollReveal>
            </section>

            <section id="work" className="section section-muted">
                <div className="container">
                    <ScrollReveal className="section-intro">
                        <p className="eyebrow"><span>06</span> Selected work</p>
                        <h2>Projects with <span>purpose.</span></h2>
                        <p>A few applications and interfaces I&apos;ve designed and built.</p>
                    </ScrollReveal>
                    <div className="project-grid">
                        {projects.map((project, index) => (
                            <ScrollReveal key={project.title} delay={index * 0.08}>
                                <article className="project-card" onMouseMove={handleProjectMove} onMouseLeave={resetProjectTilt}>
                                    <div className="project-preview">
                                        {project.image ? (
                                            <Image src={project.image} alt={`${project.title} application preview`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" loading="lazy" />
                                        ) : (
                                            <div className="project-image-placeholder" aria-hidden="true">
                                                <span>{project.title}</span>
                                                <small>Project preview</small>
                                            </div>
                                        )}
                                        <span className="project-index">0{index + 1}</span>
                                    </div>
                                    <div className="project-content">
                                        <h3>{project.title}</h3>
                                        <p className="project-outcome">{project.outcome}</p>
                                        <div className="project-tags">{project.tags.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}</div>
                                        <div className="project-detail">
                                            <p><strong>Problem</strong><span>{project.problem}</span></p>
                                            <p><strong>Solution</strong><span>{project.solution}</span></p>
                                            <p><strong>Result</strong><span>{project.result}</span></p>
                                        </div>
                                        <div className="project-actions">
                                            <a
                                                className={`button button-small ${project.live ? '' : 'button-disabled'}`}
                                                href={project.live || undefined}
                                                target={project.live ? '_blank' : undefined}
                                                rel={project.live ? 'noopener noreferrer' : undefined}
                                                aria-disabled={!project.live}
                                                tabIndex={project.live ? 0 : -1}
                                                title={project.live ? 'Open live demo' : 'TODO: Add a live demo URL'}
                                            >
                                                Live Demo <FiArrowUpRight aria-hidden="true" />
                                            </a>
                                            <a
                                                className={`button button-small button-outline ${project.github ? '' : 'button-disabled'}`}
                                                href={project.github || undefined}
                                                target={project.github ? '_blank' : undefined}
                                                rel={project.github ? 'noopener noreferrer' : undefined}
                                                aria-disabled={!project.github}
                                                tabIndex={project.github ? 0 : -1}
                                                title={project.github ? 'Open GitHub repository' : 'TODO: Add a GitHub URL'}
                                            >
                                                GitHub <FiArrowUpRight aria-hidden="true" />
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="section container contact-section">
                <ScrollReveal className="section-intro">
                    <p className="eyebrow"><span>07</span> Get in touch</p>
                    <h2>Have something <span>in mind?</span></h2>
                    <p>Tell me a little about what you&apos;re working on. I&apos;d love to hear from you.</p>
                </ScrollReveal>
                <div className="contact-layout">
                    <div className="contact-details">
                        <h3>Let&apos;s start a conversation.</h3>
                        <p>Reach out directly or send a note using the form. I&apos;ll get back to you as soon as I can.</p>
                        <div className="contact-links">
                            {contactLinks.map(({ label, value, href, icon: Icon }) => (
                                <a className="contact-link" key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                                    <Icon aria-hidden="true" /><span><small>{label}</small>{value}</span><FiArrowUpRight className="contact-link-arrow" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <form className="contact-form" onSubmit={submitContactForm}>
                        <label htmlFor="contact-name">Name</label>
                        <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" required minLength={2} />
                        <label htmlFor="contact-email">Email</label>
                        <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                        <label htmlFor="contact-message">Message</label>
                        <textarea id="contact-message" name="message" rows={5} placeholder="What would you like to build?" required minLength={10} />
                        <button className="button button-primary form-submit" type="submit" disabled={formState === 'sending'}>
                            {formState === 'sending' ? 'Sending…' : 'Send message'} <FiArrowUpRight aria-hidden="true" />
                        </button>
                        <p className={`form-status ${formState}`} aria-live="polite">
                            {formState === 'sent' && 'Thanks for reaching out. Your message has been sent.'}
                            {formState === 'error' && 'The form could not send your message. Please email me directly or check the Formspree setup.'}
                        </p>
                        <p className="form-note">TODO: Configure the free Formspree endpoint in the form handler.</p>
                    </form>
                </div>
            </section>

            <footer className="footer">
                <div className="container footer-inner">
                    <a href="#top" className="footer-brand">AR<span>.</span></a>
                    <p>© {new Date().getFullYear()} Abdul Rafay Abbasi · Full Stack Developer</p>
                    <div className="footer-links">
                        <a href="https://github.com/rafeh216" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://www.linkedin.com/in/abdul-rafay-abbasi-b257273aa/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="#top" aria-label="Back to top">Back to top ↑</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}

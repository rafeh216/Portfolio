'use client';

import { useState, useEffect } from 'react';
import TextReveal from '@/components/TextReveal';
import ScrollReveal from '@/components/ScrollReveal';
import ImageReveal from '@/components/ImageReveal';

/* ─── DATA ─── */

const services = [
    { num: '01', title: 'Full Stack Development', desc: 'End-to-end web applications with React frontends and Node.js backends, built for performance and scale.' },
    { num: '02', title: 'Frontend Architecture', desc: 'Component-driven UI systems with Next.js, TypeScript, and modern CSS — pixel-perfect and responsive.' },
    { num: '03', title: 'Backend & APIs', desc: 'RESTful APIs with Express, JWT authentication, role-based access control, and service-oriented patterns.' },
    { num: '04', title: 'Database Design', desc: 'Schema modeling with MongoDB and PostgreSQL — optimized queries, indexing, and data architecture.' },
];

const techStack = {
    'Frontend': [
        { name: 'React', icon: '⚛️' },
        { name: 'Next.js', icon: '▲' },
        { name: 'TypeScript', icon: 'TS' },
        { name: 'JavaScript', icon: 'JS' },
        { name: 'HTML5', icon: '◇' },
        { name: 'CSS3', icon: '◆' },
        { name: 'Bootstrap', icon: 'B' },
        { name: 'GSAP', icon: '~' },
    ],
    'Backend': [
        { name: 'Node.js', icon: '⬡' },
        { name: 'Express', icon: 'Ex' },
        { name: 'REST APIs', icon: '⇌' },
        { name: 'JWT Auth', icon: '🔐' },
    ],
    'Database': [
        { name: 'MongoDB', icon: '🍃' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'MySQL', icon: '🐬' },
        { name: 'Mongoose', icon: 'M' },
        { name: 'Supabase', icon: '⚡' },
    ],
    'Tools & DevOps': [
        { name: 'Git', icon: '⑂' },
        { name: 'GitHub', icon: '⊙' },
        { name: 'VS Code', icon: '⌨' },
        { name: 'Postman', icon: '☄' },
        { name: 'Vercel', icon: '▲' },
        { name: 'npm', icon: '◈' },
        { name: 'Render', icon: 'ℛ' },
    ],
};

const projects = [
    {
        num: '01',
        title: 'FYP Management System',
        desc: 'Full-stack academic portal for managing Final Year Projects with role-based dashboards for Coordinators, Students, and Supervisors. Features JWT auth, real-time notifications, group management, and progress tracking.',
        tags: ['React', 'Node.js', 'MongoDB', 'JWT', 'Bootstrap'],
        link: 'https://github.com/rafeh216/FYP-MANAGEMENT-SYSTEM',
        image: '/projects/fyp-management.png',
    },
    {
        num: '02',
        title: 'Inventory Management System',
        desc: 'Enterprise inventory tracking application with product CRUD operations, stock analytics, low-stock alerts, and responsive dashboards. Built with a clean REST API architecture.',
        tags: ['React', 'Express', 'MongoDB', 'REST API', 'Charts'],
        link: 'https://github.com/rafeh216/Inventory-Management-System',
        image: '/projects/inventory-system.png',
    },
    {
        num: '03',
        title: 'Admin Dashboard UI',
        desc: 'Interactive admin analytics dashboard featuring multiple chart types, KPI metrics cards, data tables, and a modular component architecture designed for scalability.',
        tags: ['React', 'Recharts', 'Responsive', 'Component Design'],
        link: 'https://github.com/rafeh216/AdminDashboard-React',
        image: '/projects/admin-dashboard.png',
    },
];

const contactLinks = [
    { label: 'Email', value: 'abbasirafay64@gmail.com', href: 'mailto:abbasirafay64@gmail.com', icon: '✉' },
    { label: 'Phone', value: '+92 317 050 0728', href: 'tel:+923170500728', icon: '☎' },
    { label: 'WhatsApp', value: '+92 317 050 0728', href: 'https://wa.me/923170500728', icon: '💬' },
    { label: 'GitHub', value: 'rafeh216', href: 'https://github.com/rafeh216', icon: '⊙' },
    { label: 'LinkedIn', value: 'Abdul Rafay Abbasi', href: 'https://www.linkedin.com/in/abdul-rafay-abbasi-b257273aa/', icon: 'in' },
];

/* ─── COMPONENT ─── */

export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [activeService, setActiveService] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main>
            {/* ─── NAVBAR ─── */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <a href="#" className="nav-logo">AR.</a>
                <div className="nav-links">
                    <a href="#work">Work</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#contact" className="btn-pill">Get in Touch</a>
                </div>
            </nav>

            {/* ─── HERO ─── */}
            <section className="hero container">
                <div className="hero-center">
                    <div className="hero-label mono-label">FULL STACK DEVELOPER</div>
                    <div className="hero-title">
                        <TextReveal as="h1" delay={0.4}>ABDUL RAFAY</TextReveal>
                        <TextReveal as="h1" delay={0.6} className="italic">Abbasi</TextReveal>
                    </div>
                    <ScrollReveal delay={1.0}>
                        <p className="hero-desc">I design & build end-to-end web applications with modern tech stacks — from pixel-perfect frontends to scalable backend architectures. Focused on clean code, performance, and exceptional user experiences.</p>
                    </ScrollReveal>
                    <ScrollReveal delay={1.2}>
                        <div className="hero-cta">
                            <a href="#work" className="btn-pill">View Projects</a>
                            <a href="#contact" className="link-arrow">Get in Touch →</a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ─── SCROLL INDICATOR (between hero and marquee) ─── */}
            <div className="scroll-indicator-row">
                <span className="scroll-text">Scroll Down</span>
                <div className="scroll-line"></div>
            </div>

            {/* ─── MARQUEE 1 ─── */}
            <div className="marquee-strip">
                <div className="marquee-content">
                    {Array(10).fill(0).map((_, i) => (
                        <span key={i} className="marquee-text">FULL STACK DEVELOPER — REACT — NEXT.JS — NODE.JS — MONGODB</span>
                    ))}
                </div>
            </div>

            {/* ─── ABOUT ─── */}
            <section id="about" className="about container">
                <div className="about-content">
                    <ScrollReveal>
                        <div className="mono-label">Who I Am</div>
                        <h2>Creative Developer crafting scalable digital solutions.</h2>
                        <p>I specialize in building end-to-end web applications with Next.js, React, Node.js, and MongoDB. From pixel-perfect frontends to robust backend architectures, I ensure every project is built for performance and scale.</p>

                        <div className="about-stats">
                            <div>
                                <div className="stat-num">2+</div>
                                <div className="mono-label">Years Experience</div>
                            </div>
                            <div>
                                <div className="stat-num">15+</div>
                                <div className="mono-label">Projects Completed</div>
                            </div>
                        </div>

                        <a href="#work" className="link-arrow">View Selected Work →</a>
                    </ScrollReveal>
                </div>
            </section>

            {/* ─── TECH STACK ─── */}
            <section id="stack" className="tech-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="mono-label">My Toolkit</div>
                        <h2>Tech Stack</h2>
                    </ScrollReveal>

                    <div className="tech-categories">
                        {Object.entries(techStack).map(([category, skills], ci) => (
                            <ScrollReveal key={category} delay={ci * 0.1}>
                                <div className="tech-category">
                                    <div className="tech-category-label">{category}</div>
                                    <div className="tech-pills">
                                        {skills.map((skill) => (
                                            <div key={skill.name} className="tech-pill">
                                                <span className="tech-pill-icon">{skill.icon}</span>
                                                <span className="tech-pill-name">{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SERVICES (ACCORDION) ─── */}
            <section id="services" className="services container">
                <ScrollReveal>
                    <div className="mono-label">What I Do</div>
                    <h2>Services & Expertise</h2>
                </ScrollReveal>

                <div className="accordion-list">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className={`accordion-item ${activeService === i ? 'active' : ''}`}
                            onMouseEnter={() => setActiveService(i)}
                            onMouseLeave={() => setActiveService(null)}
                        >
                            <div className="accordion-header">
                                <div className="accordion-num">{service.num}</div>
                                <div className="accordion-title">{service.title}</div>
                                <div className="accordion-icon">+</div>
                            </div>
                            <div className="accordion-content" style={{ maxHeight: activeService === i ? '120px' : '0' }}>
                                <p>{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── MARQUEE 2 ─── */}
            <div className="marquee-strip">
                <div className="marquee-content" style={{ animationDirection: 'reverse' }}>
                    {Array(10).fill(0).map((_, i) => (
                        <span key={i} className="marquee-text">SELECTED WORK — BLENDING CREATIVITY & CODE —</span>
                    ))}
                </div>
            </div>

            {/* ─── PORTFOLIO ─── */}
            <section id="work" className="portfolio container">
                <ScrollReveal>
                    <div className="mono-label">Portfolio</div>
                    <h2>Featured Projects</h2>
                </ScrollReveal>

                <div className="project-list">
                    {projects.map((project, i) => (
                        <ScrollReveal key={i} delay={i * 0.15}>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className={`project-row ${i % 2 === 1 ? 'reversed' : ''}`}>
                                <div className="project-img-col">
                                    <ImageReveal>
                                        <img src={project.image} alt={project.title} />
                                    </ImageReveal>
                                </div>
                                <div className="project-info-col">
                                    <div className="project-num">{project.num}</div>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-desc">{project.desc}</p>
                                    <div className="project-tags">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="project-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="link-arrow">View on GitHub →</div>
                                </div>
                            </a>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* ─── CONTACT ─── */}
            <section id="contact" className="contact-section container">
                <ScrollReveal>
                    <div className="mono-label">Get In Touch</div>
                    <h2>Let's Work Together</h2>
                    <p className="contact-subtitle">Have a project in mind? Let's talk about how we can work together.</p>
                </ScrollReveal>

                <div className="contact-grid">
                    {contactLinks.map((item, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="contact-card">
                                <div className="contact-card-icon">{item.icon}</div>
                                <div>
                                    <div className="contact-card-label">{item.label}</div>
                                    <div className="contact-card-value">{item.value}</div>
                                </div>
                            </a>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal delay={0.4}>
                    <div className="contact-cta-email">
                        <a href="mailto:abbasirafay64@gmail.com" className="giant-email">abbasirafay64@gmail.com</a>
                    </div>
                </ScrollReveal>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="footer">
                <div className="container footer-inner">
                    <p>© 2024 Abdul Rafay Abbasi</p>
                    <div className="footer-links">
                        <a href="https://github.com/rafeh216" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://www.linkedin.com/in/abdul-rafay-abbasi-b257273aa/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}

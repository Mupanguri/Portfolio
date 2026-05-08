import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    period: 'NOV 2025 — PRESENT',
    title: 'IT Auditor & Cybersecurity Consultant',
    org: 'BDO Zimbabwe',
    focus: 'IAM and IT security audits across 15+ enterprise clients — 87+ control deficiencies identified across privileged access, MFA coverage, and access certification domains.',
  },
  {
    period: 'FEB 2024 — OCT 2025',
    title: 'Security Engineer',
    org: 'Baker Tilly Central Africa',
    focus: 'Access control assessment, MFA deployment reviews, RBAC restructuring, and vulnerability assessments documented by CVSS severity across client environments.',
  },
  {
    period: 'FEB 2022 — JAN 2024',
    title: 'Technology Operations Analyst',
    org: 'Baker Tilly Central Africa',
    focus: 'IT infrastructure and security assessment support across 20+ organisations — user access provisioning, joiner–mover–leaver governance, and digital forensic investigation support.',
  },
];

const certifications = [
  { name: 'SecurityScorecard SCDR', status: '2026—2028', active: true },
  { name: 'AWS Certified Cloud Practitioner', status: 'ACTIVE', active: true },
  { name: 'ISC2 Certified in Cybersecurity (CC)', status: 'ACTIVE', active: true },
  { name: 'Belkasoft Corporate Investigations', status: 'ACTIVE', active: true },
  { name: 'CISA', status: 'IN PROGRESS — JUNE 2026', active: false },
];

const tools = [
  'Active Directory',
  'Entra ID',
  'AWS IAM',
  'Nessus',
  'Acunetix',
  'Burp Suite',
  'Wireshark',
  'Nmap',
  'Metasploit',
  'Python',
  'Rust',
  'TypeScript',
  'Akroatis',
  'egui',
  'async-std',
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const certsRef = useRef<(HTMLDivElement | null)[]>([]);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      certsRef.current.forEach((cert, i) => {
        if (!cert) return;
        gsap.fromTo(
          cert,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cert,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      if (toolsRef.current) {
        gsap.fromTo(
          toolsRef.current.children,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: toolsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full"
      style={{ background: '#000', paddingTop: '250px', paddingBottom: '250px' }}
    >
      <div className="section-padding">
        {/* Experience Header */}
        <p className="font-mono-tech mb-20" style={{ color: '#b0b0b0' }}>
          EXPERIENCE &amp; CREDENTIALS
        </p>

        {/* Roles */}
        <div className="mb-32">
          <p className="font-mono-tech mb-12" style={{ color: '#555' }}>
            PROFESSIONAL ROLES
          </p>
          <div className="flex flex-col">
            {roles.map((role, i) => (
              <div
                key={role.title}
                ref={(el) => { rowsRef.current[i] = el; }}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-t cursor-default transition-all duration-500"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <div className="md:col-span-2">
                  <span className="font-mono-tech" style={{ color: '#555' }}>
                    {role.period}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h4 className="font-display text-white" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                    {role.title}
                  </h4>
                </div>
                <div className="md:col-span-2">
                  <span className="font-mono-tech" style={{ color: '#b0b0b0' }}>
                    {role.org}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <p className="font-serif-body" style={{ color: '#888', fontSize: '14px' }}>
                    {role.focus}
                  </p>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(191,191,191,0.04) 0%, transparent 60%)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-32">
          <p className="font-mono-tech mb-12" style={{ color: '#555' }}>
            CERTIFICATIONS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {certifications.map((cert, i) => (
              <div
                key={cert.name}
                ref={(el) => { certsRef.current[i] = el; }}
                className="flex items-center justify-between p-6"
                style={{ background: '#000' }}
              >
                <span className="font-mono-tech text-white" style={{ fontSize: '11.5px' }}>
                  {cert.name}
                </span>
                <span
                  className="font-mono-tech px-2 py-1"
                  style={{
                    fontSize: '10px',
                    color: cert.active ? '#b0b0b0' : '#555',
                    border: `1px solid ${cert.active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <p className="font-mono-tech mb-12" style={{ color: '#555' }}>
            TECHNICAL STACK
          </p>
          <div ref={toolsRef} className="flex flex-wrap" style={{ gap: '10px' }}>
            {tools.map((tool) => (
              <span
                key={tool}
                className="font-mono-tech px-4 py-2 transition-all duration-300 hover:bg-white hover:text-black cursor-default"
                style={{
                  fontSize: '11.5px',
                  color: '#b0b0b0',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

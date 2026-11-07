import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: 'Application Security & VAPT',
    description:
      'Full-cycle black-box, grey-box, and white-box testing across web, mobile, API, and ERP targets. OWASP Top 10 and NIST SP 800-115 testing with Burp Suite, OWASP ZAP, sqlmap, Nessus, Acunetix, and custom Python tooling.',
    meta: 'WEB / MOBILE / API / INFRA',
  },
  {
    title: 'Incident Response & Forensics',
    description:
      'Lead response for ransomware and complex security incidents, including containment, recovery, post-incident control improvements, and digital forensic investigations using Sleuth Kit and Autopsy. Ransomware recovery included 313 machines and 13TB of targeted data.',
    meta: 'IR / RANSOMWARE / FORENSICS',
  },
  {
    title: 'GRC, Audit & Identity Security',
    description:
      'ITGC and application-control audits, IAM and lifecycle reviews, cloud security assessments, and risk-rated remediation roadmaps across financial services, telecommunications, and insurance. Controls mapped to ISO 27001, NIST CSF, COBIT, SOC 2, and HIPAA.',
    meta: 'ITGC / IAM / CLOUD / GRC',
  },
  {
    title: 'DevSecOps & Security Engineering',
    description:
      'Security tooling and secure SDLC enablement across Python, Rust, React, Node.js, and TypeScript. Curated SCA, SAST, and DAST workflows using Semgrep, Snyk Code, SonarQube, Invicti, and Burp Suite, with Entra ID, Intune, AWS, Azure, and GitLab CI/CD.',
    meta: 'SCA / SAST / DAST / CLOUD',
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full"
      style={{ background: '#000', paddingTop: '250px', paddingBottom: '250px' }}
    >
      <div className="section-padding">
        <p className="font-mono-tech mb-20" style={{ color: '#b0b0b0' }}>
          CAPABILITIES
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative p-8 lg:p-12"
              style={{ background: '#000' }}
            >
              <div className="flex flex-col h-full">
                <p className="font-mono-tech mb-8" style={{ color: '#555' }}>
                  {cap.meta}
                </p>
                <h3
                  className="font-display text-white mb-6"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}
                >
                  {cap.title}
                </h3>
                <p
                  className="font-serif-body mt-auto"
                  style={{ color: '#b0b0b0', fontSize: '16px', lineHeight: 1.6 }}
                >
                  {cap.description}
                </p>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(191,191,191,0.03) 0%, transparent 70%)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

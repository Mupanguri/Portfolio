import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: 'Identity & Access Management',
    description:
      'Privileged access assessment, RBAC design (role mining, SoD matrix, entitlement review), user lifecycle governance (Joiner–Mover–Leaver), MFA coverage gap analysis, and access certification across Active Directory, Entra ID, and AWS IAM. Primary discipline — 87+ control deficiencies identified across 12+ enterprise engagements.',
    meta: 'RBAC / PAM / IGA / MFA',
  },
  {
    title: 'Vulnerability Assessment & Security Engineering',
    description:
      'Authenticated and unauthenticated vulnerability scanning with Nessus and Acunetix. Web application testing using Burp Suite. Network analysis with Wireshark and Nmap. Developing capability — tools and methodology backed by formal engagement scope, not self-assessed expertise.',
    meta: 'NESSUS / ACUNETIX / BURP SUITE',
  },
  {
    title: 'Risk, Governance & Compliance',
    description:
      'IT risk assessments and control gap analysis mapped to ISO 27001 Annex A, NIST CSF identity function, COBIT 2019, and SOC 2 Trust Service Criteria. Advisory and audit delivery across financial services, telecoms, and insurance — assessment ownership, not framework implementation ownership.',
    meta: 'ISO 27001 / NIST CSF / SOC 2',
  },
  {
    title: 'Security Tool Development',
    description:
      'Production tooling in Python and Rust: AI-driven audit analytics pipeline (IQR anomaly detection, AD-gated RBAC, Entra ID auth), and Akroatis — a Rust port scanner with async-std concurrency, banner-grabbing service detection, and an egui GUI. Built to solve real gaps in audit workflows.',
    meta: 'PYTHON / RUST / TYPESCRIPT',
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

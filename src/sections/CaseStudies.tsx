import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: '01',
    title: 'TRANSFER PRICING\nAI ASSISTANT',
    subtitle: 'INTERNAL AUTOMATION · BDO ZIMBABWE',
    video: '/videos/case-study-01.mp4',
    problem: 'Manual transfer pricing analysis across 10,000–50,000 intercompany transaction records consumed 24–32 hours per engagement and relied entirely on individual analyst judgment.',
    approach: 'Python pipeline with IQR-threshold anomaly detection against arm\'s length benchmarks. RBAC enforced via Active Directory group membership; access scoped to engagement team via Entra ID. Outputs: structured compliance report with flagged items, confidence scores, and audit-traceable references.',
    impact: 'Reduced analysis and reporting from 24–32 hours to ~4 hours per engagement. Deployed across 30 internal engagements. Zero raw client data retained beyond engagement close.',
  },
  {
    id: '02',
    title: 'HEALTHCARE RBAC\nSYSTEM',
    subtitle: 'BLOCKCHAIN EHR DAPP · CAPSTONE',
    video: '/videos/case-study-02.mp4',
    problem: 'Cross-border patient data access depended on physical records and institution-specific credentials — creating care delays in emergencies and no auditable access trail across providers.',
    approach: 'Built on Hyperledger Fabric with RBAC smart contract logic defining five roles: Patient, Primary Clinician, Specialist, Emergency Access, Admin. Records stored on-chain as AES-256 encrypted payloads with ECIES key management. Emergency access: time-bounded read-only, logged immutably. All access events written to chain as tamper-evident audit entries.',
    impact: 'Patient-initiated access grant and revocation, effective immediately with on-chain event. Minimum-necessary access enforced per treatment episode. Architecture designed to satisfy HIPAA minimum necessary standard and audit trail requirements — research project, not a production deployment.',
  },
  {
    id: '03',
    title: 'SKILLS DEVELOPMENT\nPLATFORM',
    subtitle: 'ACCESS GOVERNANCE · BDO SKILLS PULSE',
    video: '/videos/case-study-03.mp4',
    problem: 'No internal system for managing staff competency validation or controlling access to sensitive training materials and performance data across departments.',
    approach: 'Built enterprise platform with BDO Active Directory authentication and Entra ID-based provisioning and deprovisioning. RBAC enforced at the API layer. Role structure: Staff, Manager, HR Admin, Department Head. All user interactions logged at every level — audit trail accessible to HR only.',
    impact: 'Demonstrates IAM implementation as a developer, not just as an auditor: identity-linked provisioning, API-layer authorization enforcement, and a fully auditable access log — built for a live internal deployment at BDO Zimbabwe.',
  },
  {
    id: '04',
    title: 'AKROATIS PORT\nSCANNER',
    subtitle: 'SECURITY TOOL DEVELOPMENT · RUST',
    video: '/videos/case-study-04.mp4',
    problem: 'CLI-only port scanners require flag familiarity and produce raw output — increasing time-to-report and transcription errors in consultant-facing authorized assessment workflows.',
    approach: 'Developed in Rust using async-std runtime. Configurable thread pool (default 4 threads, effective range 4–32). Service detection via banner grabbing: socket connection reads initial bytes, pattern-matched against HTTP, SSH, FTP, and SMTP signatures. GUI built with egui — real-time progress, per-host result table, JSON/CSV/HTML export.',
    impact: 'Scans a /24 subnet at moderate concurrency (8–16 threads) with performance comparable to Nmap under equivalent conditions. IPv4 and IPv6 support. Rate limiting bounded at the engine level. Input validation enforced — no passive scanning, explicit target required.',
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const imgWrap = item.querySelector('.cs-img-wrap') as HTMLElement;
        const imgInner = item.querySelector('.cs-img-inner') as HTMLElement;
        const textWrap = item.querySelector('.cs-text-wrap') as HTMLElement;
        const titleInner = item.querySelector('.cs-title-inner') as HTMLElement;
        const details = item.querySelector('.cs-details') as HTMLElement;

        if (!imgWrap || !imgInner || !textWrap || !titleInner) return;

        // Set initial states
        gsap.set(imgInner, {
          rotationZ: -5,
          scaleX: 1.1,
        });
        gsap.set(titleInner, {
          rotationZ: 5,
          scaleY: 1.2,
          scaleX: 0.8,
        });
        if (details) {
          gsap.set(details, { opacity: 0, y: 30 });
        }

        // Create scroll-driven 3D fold timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        tl.fromTo(
          [imgWrap, textWrap],
          {
            rotationX: 45,
            scaleY: 1,
            yPercent: 10,
            transformOrigin: '50% 120%',
          },
          {
            rotationX: -45,
            scaleY: 0.65,
            skewX: 3,
            yPercent: -5,
            transformOrigin: '50% 0%',
            ease: 'none',
          },
          0
        );

        tl.fromTo(
          imgInner,
          { rotationZ: -5, scaleX: 1.1 },
          { rotationZ: 5, scaleX: 1, ease: 'none' },
          0
        );

        tl.fromTo(
          titleInner,
          { rotationZ: 5, scaleY: 1.2, scaleX: 0.8 },
          { rotationZ: -5, scaleY: 1, scaleX: 1, ease: 'none' },
          0
        );

        if (details) {
          gsap.to(details, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="relative w-full"
      style={{ background: '#000', paddingTop: '250px', paddingBottom: '250px' }}
    >
      <div className="section-padding">
        <p className="font-mono-tech mb-20" style={{ color: '#b0b0b0' }}>
          SELECTED CASE STUDIES
        </p>

        <div className="flex flex-col" style={{ gap: '250px' }}>
          {caseStudies.map((study, i) => (
            <div
              key={study.id}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              {/* Case number and label */}
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-mono-tech" style={{ color: '#555' }}>
                  CASE STUDY {study.id}
                </span>
                <span className="font-mono-tech" style={{ color: '#555' }}>
                  {study.subtitle}
                </span>
              </div>

              {/* 3D Fold Image */}
              <div
                className="cs-img-wrap relative overflow-hidden w-full"
                style={{
                  aspectRatio: '16/9',
                  perspective: '1000px',
                }}
              >
                <div
                  className="cs-img-inner w-full h-full"
                  style={{ willChange: 'transform' }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ filter: 'grayscale(30%) contrast(1.05)' }}
                  >
                    <source src={study.video} type="video/mp4" />
                  </video>
                  {/* Title overlay on video */}
                  <div
                    className="cs-text-wrap absolute inset-0 flex items-end p-8 lg:p-12"
                    style={{ perspective: '2000px' }}
                  >
                    <h3
                      className="cs-title-inner font-display text-white"
                      style={{
                        fontSize: 'clamp(2rem, 6vw, 6rem)',
                        letterSpacing: '-0.04em',
                        lineHeight: 0.95,
                        textShadow: '0 4px 30px rgba(0,0,0,0.8)',
                        willChange: 'transform',
                      }}
                    >
                      {study.title.split('\n').map((line, j) => (
                        <span key={j} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Problem / Approach / Impact */}
              <div
                className="cs-details grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              >
                <div>
                  <p className="font-mono-tech mb-3" style={{ color: '#555' }}>
                    PROBLEM
                  </p>
                  <p className="font-serif-body" style={{ color: '#b0b0b0', fontSize: '15px' }}>
                    {study.problem}
                  </p>
                </div>
                <div>
                  <p className="font-mono-tech mb-3" style={{ color: '#555' }}>
                    APPROACH
                  </p>
                  <p className="font-serif-body" style={{ color: '#b0b0b0', fontSize: '15px' }}>
                    {study.approach}
                  </p>
                </div>
                <div>
                  <p className="font-mono-tech mb-3" style={{ color: '#555' }}>
                    IMPACT
                  </p>
                  <p className="font-serif-body" style={{ color: '#b0b0b0', fontSize: '15px' }}>
                    {study.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

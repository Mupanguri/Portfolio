import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        metaRef.current?.children || [],
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    'IAM GOVERNANCE',
    'PRIVILEGED ACCESS',
    'IDENTITY LIFECYCLE',
    'RISK FRAMEWORKS',
    'VULNERABILITY ASSESSMENT',
    'SECURITY AUTOMATION',
  ];

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative w-full"
      style={{ background: '#f6f6f6', paddingTop: '250px', paddingBottom: '250px' }}
    >
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Philosophy text */}
          <div ref={textRef}>
            <p className="font-mono-tech mb-12" style={{ color: '#000' }}>
              THE APPROACH
            </p>
            <p
              className="font-serif-body"
              style={{ color: '#000', fontSize: 'clamp(18px, 2.5vw, 28px)', maxWidth: '600px' }}
            >
              Security is not a product you install — it is a discipline you architect.
              I audit what others build and engineer what teams can't find time to build
              themselves — operating at the intersection of identity governance, access
              control design, and hands-on security tooling.
            </p>
            <p
              className="font-serif-body mt-8"
              style={{ color: '#555', fontSize: 'clamp(16px, 2vw, 22px)', maxWidth: '560px' }}
            >
              From on-premise Active Directory to Entra ID and AWS IAM — from ISO 27001
              gap assessments to custom Rust tooling — every engagement ends with controls
              that can be validated, measured, and defended under audit scrutiny.
            </p>
          </div>

          {/* Right: Technical metadata */}
          <div ref={metaRef} className="flex flex-col justify-end">
            {capabilities.map((cap) => (
              <div
                key={cap}
                className="font-mono-tech py-4 border-b"
                style={{ color: '#000', borderColor: 'rgba(0,0,0,0.1)', fontSize: '11.5px' }}
              >
                {cap}
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div
          ref={imageRef}
          className="mt-24 w-full overflow-hidden"
          style={{ maxHeight: '60vh' }}
        >
          <img
            src="/images/approach.jpg"
            alt="Server architecture"
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(100%) contrast(1.1)' }}
          />
        </div>
      </div>
    </section>
  );
}

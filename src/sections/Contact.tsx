import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        linksRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full flex flex-col items-center justify-center text-center"
      style={{
        background: '#000',
        height: '100vh',
        minHeight: '600px',
        paddingTop: '250px',
        paddingBottom: '250px',
      }}
    >
      <div className="section-padding w-full max-w-4xl">
        <p className="font-mono-tech mb-12" style={{ color: '#555' }}>
          CONTACT
        </p>

        <h2
          ref={headingRef}
          className="font-display text-white mb-16"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', letterSpacing: '-0.05em' }}
        >
          INITIATE
          <br />
          PROTOCOL
        </h2>

        <div ref={linksRef} className="flex flex-col items-center" style={{ gap: '24px' }}>
          <a
            href="mailto:ronald@mupanguri.security"
            className="font-mono-tech hover-border-bottom transition-colors duration-300"
            style={{ color: '#b0b0b0', fontSize: '14px' }}
          >
            ronald@mupanguri.security
          </a>

          <div className="flex items-center" style={{ gap: '40px' }}>
            <a
              href="https://linkedin.com/in/ronaldmupanguri"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-tech hover-border-bottom transition-colors duration-300"
              style={{ color: '#555' }}
            >
              LINKEDIN
            </a>
            <a
              href="https://github.com/ronaldmupanguri"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-tech hover-border-bottom transition-colors duration-300"
              style={{ color: '#555' }}
            >
              GITHUB
            </a>
          </div>

          <div
            className="mt-16 pt-8 w-full flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="font-mono-tech" style={{ color: '#333', fontSize: '10px' }}>
              HARARE, ZIMBABWE
            </span>
            <span className="font-mono-tech" style={{ color: '#333', fontSize: '10px' }}>
              &copy; {new Date().getFullYear()} RONALD MUPANGURI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

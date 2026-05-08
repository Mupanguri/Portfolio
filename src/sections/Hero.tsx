import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const microRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      line1Ref.current,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.2, ease: 'power4.out' }
    )
      .fromTo(
        line2Ref.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2, ease: 'power4.out' },
        '-=0.9'
      )
      .fromTo(
        line3Ref.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2, ease: 'power4.out' },
        '-=0.9'
      )
      .fromTo(
        microRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.4'
      );

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full flex flex-col justify-between"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      {/* Hero Title */}
      <div className="flex-1 flex items-end section-padding pb-16">
        <h1 className="hero-title font-display text-white" style={{ fontSize: 'clamp(3rem, 12.5vw, 14rem)' }}>
          <span ref={line1Ref} className="block overflow-hidden">
            <span className="block">IDENTITY</span>
          </span>
          <span ref={line2Ref} className="block overflow-hidden">
            <span className="block">SECURITY</span>
          </span>
          <span ref={line3Ref} className="block overflow-hidden">
            <span className="block">ENGINEER</span>
          </span>
        </h1>
      </div>

      {/* Micro Copy */}
      <div
        ref={microRef}
        className="section-padding pb-8"
      >
        <p className="font-mono-tech" style={{ color: '#b0b0b0' }}>
          IAM CONSULTANT · SECURITY ENGINEER
        </p>
      </div>
    </section>
  );
}

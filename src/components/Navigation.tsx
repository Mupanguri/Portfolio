import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 section-padding py-6 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div className="grid grid-cols-3 items-center">
        <div className="font-mono-tech text-white tracking-widest">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover-border-bottom">
            MUPANGURI
          </button>
        </div>
        <div className="font-mono-tech text-center" style={{ color: '#b0b0b0' }}>
          EST. 2022
        </div>
        <div className="font-mono-tech text-right">
          <button
            onClick={() => scrollToSection('contact')}
            className="hover-border-bottom"
            style={{ color: '#b0b0b0' }}
          >
            [ CONTACT ]
          </button>
        </div>
      </div>
    </nav>
  );
}

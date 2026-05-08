import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import IsometricGridVolumetricShader from './components/IsometricGridVolumetricShader';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Approach from './sections/Approach';
import Capabilities from './sections/Capabilities';
import CaseStudies from './sections/CaseStudies';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 0.7,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div className="relative">
      {/* Fixed WebGL Background */}
      <IsometricGridVolumetricShader />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Approach />
        <Capabilities />
        <CaseStudies />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

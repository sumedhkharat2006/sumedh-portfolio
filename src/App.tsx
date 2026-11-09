import { useEffect, useState } from 'react';
import { ScrollTrigger } from './lib/gsap';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Interests from './components/Interests';
import Contact from './components/Contact';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-ink">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <ScrollProgress />
      <Navigation visible={introDone} />
      <main>
        <Hero onIntroComplete={() => setIntroDone(true)} />
        <Manifesto />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Interests />
        <Contact />
      </main>
    </>
  );
}

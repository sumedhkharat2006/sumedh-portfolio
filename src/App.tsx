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

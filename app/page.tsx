import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";
import CommandPalette from "./components/CommandPalette";
import DeferredLightScene from "./components/three/DeferredLightScene";
import Hero from "./sections/Hero";
import Story from "./sections/Story";
import Skills from "./sections/Skills";
import Works from "./sections/Works";
import Promise from "./sections/Promise";
import Certificates from "./sections/Certificates";
import Contact from "./sections/Contact";
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <DeferredLightScene />
      <Navbar />
      <MobileNav />
      <CommandPalette />
      <main>
        <Hero />
        <Story />
        <Skills />
        <Works />
        <Promise />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

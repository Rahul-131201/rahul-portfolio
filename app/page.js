import Background from "../components/Background"
import Navbar from "../components/Navbar"
import PageTransition from "../components/PageTransition"
import ScrollProgress from "../components/ScrollProgress"
import CursorGlow from "../components/CursorGlow"
import FloatingCTA from "../components/FloatingCTA"
import SectionObserver from "../components/SectionObserver"
import Hero from "../components/Hero"
import Skills from "../components/Skills"
import Experience from "../components/Experience"
import CaseStudies from "../components/CaseStudies"
import OtherProjects from "../components/OtherProjects"
import AIApproach from "../components/AIApproach"
import Education from "../components/Education"
import Certifications from "../components/Certifications"
import Contact from "../components/Contact"

export default function Home(){
  return(
    <main className="relative text-white">

      <PageTransition/>
      <ScrollProgress/>
      <CursorGlow/>
      <FloatingCTA/>
      <SectionObserver/>
      <Background/>
      <Navbar/>
      <Hero/>
      <Skills/>
      <Experience/>
      <CaseStudies/>
      <OtherProjects/>
      <AIApproach/>
      <Education/>
      <Certifications/>
      <Contact/>

    </main>
  )
}
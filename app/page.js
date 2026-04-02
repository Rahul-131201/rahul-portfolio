import Background from "../components/Background"
import Navbar from "../components/Navbar"
import ScrollProgress from "../components/ScrollProgress"
import Hero from "../components/Hero"
import Summary from "../components/Summary"
import AIApproach from "../components/AIApproach"
import Skills from "../components/Skills"
import Experience from "../components/Experience"
import Education from "../components/Education"
import Certifications from "../components/Certifications"
import Contact from "../components/Contact"
import OtherProjects from "../components/OtherProjects"

export default function Home(){
  return(
    <main className="relative text-white">

      <ScrollProgress/>
      <Background/>
      <Navbar/>
      <Hero/>
      <Summary/>
      <AIApproach/>
      <Skills/>
      <Experience/>
      <OtherProjects/>
      <Education/>
      <Certifications/>
      <Contact/>

    </main>
  )
}
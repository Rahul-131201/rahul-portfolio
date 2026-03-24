import Background from "../components/Background"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import AIApproach from "../components/AIApproach"
import Skills from "../components/Skills"
import Experience from "../components/Experience"
import Education from "../components/Education"
import Contact from "../components/Contact"
import OtherProjects from "../components/OtherProjects"

export default function Home(){
  return(
    <main className="relative text-white">

      <Background/>
      <Navbar/>
      <Hero/>
      <AIApproach/>
      <Skills/>
      <Experience/>
      <OtherProjects/>
      <Education/>
      <Contact/>

    </main>
  )
}
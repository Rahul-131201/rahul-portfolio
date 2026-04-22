
"use client"

import { useState } from "react"
import { useReveal } from "../hooks/useReveal"
import ArchitectureDiagram from "./ArchitectureDiagram"

function TechBadges({ text }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {text.split(" • ").map((t) => (
        <span key={t} className="tech-badge">◆ {t}</span>
      ))}
    </div>
  )
}

function ImpactBox({ text }) {
  return (
    <div className="mt-4 flex items-start gap-2 px-4 py-2.5 rounded-lg"
      style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
      <span className="text-green-400 mt-0.5">⚡</span>
      <p className="text-green-400 text-xs leading-relaxed">{text}</p>
    </div>
  )
}

function ArchBtn({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200"
    >
      ◈ {label} →
    </button>
  )
}

function SectionCard({ children }) {
  return (
    <div className="card-3d glow-border p-6">
      {children}
    </div>
  )
}

export default function Experience() {
  const sectionRef = useReveal()
  const [selectedArch, setSelectedArch] = useState(null)

  return (
    <section ref={sectionRef} id="experience" className="relative max-w-6xl mx-auto px-6 py-28 overflow-hidden">

      {/* Orb */}
      <div className="gradient-glow w-[600px] h-[600px] top-0 right-[-200px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.08), transparent 65%)" }} />

      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl">💼</span>
        <h2 className="section-heading">Professional Experience</h2>
      </div>

      <div className="mt-14 relative text-gray-400">

        {/* Timeline backbone */}
        <div className="hidden lg:block absolute left-[18px] top-6 bottom-6 w-px" style={{ background: "linear-gradient(180deg, rgba(96,165,250,0.6) 0%, rgba(167,139,250,0.4) 55%, rgba(96,165,250,0.05) 100%)" }} />

        <div className="space-y-20 lg:pl-14">

        {/* ══════════ TRAINING ══════════ */}
        <div className="reveal relative">
          <div className="hidden lg:flex absolute -left-14 top-4 w-9 h-9 rounded-full items-center justify-center text-base z-10" style={{ background: "rgba(15,23,42,1)", border: "2px solid rgba(96,165,250,0.5)", boxShadow: "0 0 14px rgba(96,165,250,0.3)" }}>🎓</div>
          <SectionCard>
          <h4 className="text-white font-semibold text-base">
            Java + Selenium Automation Training &amp; Project
          </h4>
          <TechBadges text="Java • Selenium • Test Automation • Agile (Sprint-based)" />
          <p className="mt-4 text-sm leading-relaxed">
            <span className="text-gray-300 font-medium">Context:</span>{" "}
            Completed 3-month structured training program at Capgemini focused on automation testing fundamentals.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm">
            {[
              "Worked on real-world website automation project (Ixigo)",
              "Developed Selenium-based test scripts using Java",
              "Executed test scenarios within Agile sprint cycles",
              "Participated in test case design, execution, and validation",
              "Gained hands-on experience with automation frameworks",
            ].map((li) => (
              <li key={li} className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">▸</span>
                {li}
              </li>
            ))}
          </ul>
          <ImpactBox text="Impact: Built strong foundation in automation testing and Agile workflows" />
          </SectionCard>
        </div>

        {/* ══════════ CAPGEMINI ══════════ */}
        <div className="reveal relative" style={{ animationDelay: "0.05s" }}>
          <div className="hidden lg:flex absolute -left-14 top-0 w-9 h-9 rounded-2xl items-center justify-center text-base z-10" style={{ background: "rgba(15,23,42,1)", border: "2px solid rgba(96,165,250,0.5)", boxShadow: "0 0 14px rgba(96,165,250,0.3)" }}>🏢</div>
          <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.25)" }}>
              🏢
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Capgemini India</h3>
              <p className="text-sm text-gray-500 mt-0.5">◈ Senior Software Engineer &nbsp;|&nbsp; Sept 2024 – Present</p>
            </div>
          </div>

          <div className="space-y-8">

            {/* ---- JMeter ---- */}
            <SectionCard>
              <h4 className="text-white font-semibold text-base">
                AI-Powered JMeter Script Generation Platform
              </h4>
              <TechBadges text="Prompt Engineering • JMeter • Django • Streamlit • API Automation • GitHub Copilot" />
              <p className="mt-4 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Problem:</span>{" "}
                Performance test scripting required heavy manual effort and lacked consistency.
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Solution:</span>{" "}
                Built an AI-assisted system to generate JMeter scripts using prompt engineering and backend automation.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {[
                  "Collaborated with SMEs to define performance testing use cases",
                  "Automated JMeter script generation using GitHub Copilot",
                  "Built Django-based backend for script processing",
                  "Developed Streamlit UI for execution and validation",
                  "Performed API validation using Postman",
                  "Automated script verification using JMeter",
                  "Built utility to extract hidden URLs from complex web apps",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">▸</span>
                    {li}
                  </li>
                ))}
              </ul>
              <ArchBtn
                label="View Architecture"
                onClick={() => setSelectedArch({
                  title: "JMeter AI Platform Architecture",
                  nodes: ["User Input","Streamlit UI","Django API Layer","Prompt Engineering","LLM Processing","JMeter Script Output","Validation Layer"],
                })}
              />
              <ImpactBox text="Impact: Reduced manual scripting effort and improved consistency" />
            </SectionCard>

            {/* ---- TOSCA AGENT ---- */}
            <SectionCard>
              <h4 className="text-white font-semibold text-base">
                Tosca → Manual Test Case Migration Agent
              </h4>
              <TechBadges text="Prompt Engineering • Django • API Development • Test Automation • GitHub Copilot" />
              <p className="mt-4 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Problem:</span>{" "}
                Manual test case creation from Tosca scripts was time-consuming and inconsistent.
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Solution:</span>{" "}
                Developed an AI-powered Django agent to convert Tosca scripts into structured test cases.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {[
                  "Built LLM-based pipeline for metadata and step generation",
                  "Developed REST APIs for upload, conversion, and download workflows",
                  "Integrated Streamlit frontend for user interaction",
                  "Generated structured titles, steps, and descriptions using AI",
                  "Built parsing utilities and batch processing workflows",
                  "Implemented validation mechanisms for output quality",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">▸</span>
                    {li}
                  </li>
                ))}
              </ul>
              <ArchBtn
                label="View Architecture"
                onClick={() => setSelectedArch({
                  title: "Tosca Migration Agent Architecture",
                  nodes: ["Upload Tosca Script","Parser Engine","Prompt Builder","LLM Processing","Test Case Generator","Download Output"],
                })}
              />
              <ImpactBox text="Impact: Achieved 97–100% automated conversion accuracy, reducing manual effort by 80%." />
            </SectionCard>

          </div>
          </div>
        </div>

        {/* ══════════ NATWEST ══════════ */}
        <div className="reveal relative" style={{ animationDelay: "0.1s" }}>
          <div className="hidden lg:flex absolute -left-14 top-0 w-9 h-9 rounded-2xl items-center justify-center text-base z-10" style={{ background: "rgba(15,23,42,1)", border: "2px solid rgba(167,139,250,0.5)", boxShadow: "0 0 14px rgba(167,139,250,0.3)" }}>🏦</div>
          <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)" }}>
              🏦
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">NATWEST (Banking Client)</h3>
              <p className="text-sm text-gray-500 mt-0.5">◈ July 2025 – Dec 2025</p>
            </div>
          </div>

          <div className="space-y-8">

            {/* Use Case 1 */}
            <SectionCard>
              <h4 className="text-white font-semibold text-base">
                Tosca → Manual Test Case Migration (IDE Integrated)
              </h4>
              <TechBadges text="Prompt Engineering • Python • GitLab Duo" />
              <p className="mt-4 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Problem:</span>{" "}
                Manual documentation of test cases from automation scripts was inefficient.
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Solution:</span>{" "}
                Developed IDE-integrated GenAI solution using GitLab Duo to generate structured test cases.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {[
                  "Transformed Tosca scripts into structured functional test cases",
                  "Used standardized templates for consistency",
                  "Generated detailed step-wise outputs",
                  "Built strong understanding of Tosca command structures",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5 flex-shrink-0">▸</span>
                    {li}
                  </li>
                ))}
              </ul>
              <ArchBtn
                label="View Architecture"
                onClick={() => setSelectedArch({
                  title: "IDE GenAI Migration Architecture",
                  nodes: ["Tosca Script Input","IDE Integration","Prompt Templates","LLM (GitLab Duo)","Test Case Output"],
                })}
              />
              <ImpactBox text="Impact: 90–100% conversion accuracy and 25% reduction in manual effort" />
            </SectionCard>

            {/* Use Case 2 */}
            <SectionCard>
              <h4 className="text-white font-semibold text-base">
                UiPath Script Review Automation
              </h4>
              <TechBadges text="Python • Prompt Engineering • GitLab Duo" />
              <p className="mt-4 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Problem:</span>{" "}
                Manual validation of UiPath scripts lacked consistency and standardization.
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Solution:</span>{" "}
                Built AI-powered validation engine using rule-based + prompt-based analysis.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {[
                  "Developed standardized QA checklist for UiPath scripts",
                  "Automated validation using GenAI prompts",
                  "Generated pass/fail reports with recommendations",
                  "Provided remediation insights for improvements",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5 flex-shrink-0">▸</span>
                    {li}
                  </li>
                ))}
              </ul>
              <ArchBtn
                label="View Architecture"
                onClick={() => setSelectedArch({
                  title: "UiPath Review Engine Architecture",
                  nodes: ["Upload UiPath Script","Checklist Engine","Prompt Validator","LLM Analysis","Report Generator"],
                })}
              />
              <ImpactBox text="Impact: Generated reports with 80–90% accuracy, cutting manual effort by 50–52%." />
            </SectionCard>

            {/* Use Case 3 */}
            <SectionCard>
              <h4 className="text-white font-semibold text-base">
                UiPath Script Generation using GenAI
              </h4>
              <TechBadges text="GenAI • XML Processing • Prompt Engineering • GitLab Duo" />
              <p className="mt-4 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Problem:</span>{" "}
                Manual creation of UiPath scripts was time-intensive and repetitive.
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Solution:</span>{" "}
                Built GenAI solution to generate UiPath XML scripts directly from Tosca scripts.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {[
                  "Generated UiPath-compatible XML scripts",
                  "Captured test data and comments effectively",
                  "Worked without selectors using structured prompts",
                  "Created reusable templates for script generation",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5 flex-shrink-0">▸</span>
                    {li}
                  </li>
                ))}
              </ul>
              <ArchBtn
                label="View Architecture"
                onClick={() => setSelectedArch({
                  title: "UiPath Generator Architecture",
                  nodes: ["Tosca Script Input","Transformation Logic","Prompt Engine","LLM","XML Script Output"],
                })}
              />
              <ImpactBox text="Impact: Accelerated RPA development and improved consistency" />
            </SectionCard>

          </div>
          </div>
        </div>

        {/* ══════════ PENSION FUNDS ══════════ */}
        <div className="reveal relative" style={{ animationDelay: "0.15s" }}>
          <div className="hidden lg:flex absolute -left-14 top-0 w-9 h-9 rounded-2xl items-center justify-center text-base z-10" style={{ background: "rgba(15,23,42,1)", border: "2px solid rgba(52,211,153,0.5)", boxShadow: "0 0 14px rgba(52,211,153,0.3)" }}>💼</div>
          <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)" }}>
              💼
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Pension Funds (Insurance Client)</h3>
              <p className="text-sm text-gray-500 mt-0.5">◈ March 2026 – March 2026</p>
            </div>
          </div>

          <div className="space-y-8">

            <SectionCard>
              <h4 className="text-white font-semibold text-base">
                Manual Test Case → Java Selenium Script Generation
              </h4>
              <TechBadges text="GitHub Copilot • Java • Selenium • Azure DevOps • Prompt Engineering" />
              <p className="mt-4 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Problem:</span>{" "}
                Converting manual test cases into executable Java Selenium scripts was time-consuming and required deep framework knowledge.
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                <span className="text-gray-300 font-medium">Solution:</span>{" "}
                Developed an AI-assisted solution using custom GitHub Copilot agents to fetch test cases from Azure DevOps and auto-generate executable test scripts aligned with the automation framework.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {[
                  "Leveraged custom GitHub Copilot agents to fetch test cases from Azure DevOps",
                  "Generated executable Java Selenium test scripts from manual test cases",
                  "Aligned generated test data with existing automation framework conventions",
                  "Ensured script consistency using structured prompt templates",
                  "Validated generated scripts against test case acceptance criteria",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">▸</span>
                    {li}
                  </li>
                ))}
              </ul>
              <ArchBtn
                label="View Architecture"
                onClick={() => setSelectedArch({
                  title: "Selenium Script Generation Architecture",
                  nodes: ["Azure DevOps","GitHub Copilot Agent","Test Case Fetcher","Prompt Engine","Java Selenium Script","Test Data Alignment"],
                })}
              />
              <ImpactBox text="Impact: Achieved 90% generation accuracy, reducing overall effort and generation time by 75%" />
            </SectionCard>

          </div>
          </div>
        </div>

        </div>{/* end space-y-20 lg:pl-14 */}
      </div>{/* end timeline outer */}

      {/* ══════════ ARCHITECTURE MODAL ══════════ */}
      {selectedArch && (
        <div className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(2,6,23,0.88)", backdropFilter: "blur(12px)" }}
          onClick={() => setSelectedArch(null)}
        >
          <div
            className="card-3d p-8 max-w-lg w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* glow border */}
            <div className="absolute inset-[-1px] rounded-2xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.3), rgba(167,139,250,0.3))", borderRadius: "17px", zIndex: -1 }} />

            <button
              onClick={() => setSelectedArch(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-2">{selectedArch.title}</h3>
            <div className="h-px mb-6 rounded-full"
              style={{ background: "linear-gradient(90deg, #60a5fa, #a78bfa, transparent)" }} />
            <ArchitectureDiagram nodes={selectedArch.nodes} />
          </div>
        </div>
      )}

    </section>
  )
}
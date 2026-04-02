"use client"

import { useState } from "react"
import ArchitectureDiagram from "./ArchitectureDiagram"

const projects = [
  {
    title: "English to Hinglish Machine Translation using Deep Learning",
    icon: "🌐",
    description:
      "Developed a deep learning based machine translation system that converts English text into Hinglish while preserving semantic meaning and grammatical correctness.",
    tech: "AI/ML, Python, Keras, TensorFlow",
    techTags: ["AI/ML", "Python", "Keras", "TensorFlow"],
    architecture: ["English Input", "Tokenizer", "Embedding Layer", "Seq2Seq Model", "Decoder", "Hinglish Output"],
    color: "#60a5fa",
  },
  {
    title: "Diabetic Macular Edema Grading using Deep Learning",
    icon: "👁️",
    description:
      "Built a deep learning system to classify diabetic macular edema severity using retinal images achieving high accuracy, sensitivity and specificity in detecting vision threatening conditions.",
    tech: "Deep Learning, CNN, VGG19, IDRID Dataset",
    techTags: ["Deep Learning", "CNN", "VGG19", "IDRID Dataset"],
    architecture: ["Retinal Image", "Preprocessing", "CNN/VGG19", "Feature Extraction", "Classifier", "Severity Grade"],
    color: "#a78bfa",
  },
]

export default function OtherProjects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
<section id="projects" className="relative max-w-6xl mx-auto px-6 py-28 overflow-hidden">

      {/* Orb */}
      <div className="gradient-glow w-[450px] h-[450px] top-0 right-[-50px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.1), transparent 65%)" }} />

      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl">🧪</span>
        <h2 className="section-heading">Other AI &amp; Deep Learning Projects</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="card-3d glow-border p-7 flex flex-col gap-4 cursor-default"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {/* Icon + title */}
            <div className="flex items-start gap-4">
              <span
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 animate-float"
                style={{ background: `${project.color}18`, border: `1px solid ${project.color}30`, animationDelay: `${i * 1.5}s` }}
              >
                {project.icon}
              </span>
              <h3 className="text-white font-semibold text-base leading-snug mt-1">{project.title}</h3>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.techTags.map((t) => (
                <span key={t} className="tech-badge">◆ {t}</span>
              ))}
            </div>

            {/* View arch button */}
            <button
              onClick={() => setSelectedProject(project)}
              className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg w-fit border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200"
            >
              ◈ View Architecture →
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(2,6,23,0.88)", backdropFilter: "blur(12px)" }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="card-3d p-8 max-w-lg w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-[-1px] rounded-2xl pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${selectedProject.color}40, rgba(167,139,250,0.3))`, borderRadius: "17px", zIndex: -1 }} />

            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{selectedProject.icon}</span>
              <h3 className="text-base font-bold">{selectedProject.title}</h3>
            </div>
            <div className="h-px mb-6 rounded-full"
              style={{ background: `linear-gradient(90deg, ${selectedProject.color}, transparent)` }} />

            <ArchitectureDiagram nodes={selectedProject.architecture} />
          </div>
        </div>
      )}

    </section>
  )
}
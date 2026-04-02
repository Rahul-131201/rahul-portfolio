// =====================================================
// RAHUL RAMANE – AI ENGINEER PORTFOLIO
// Next.js + React + Tailwind CSS
// Includes Animated AI Neural Network Background
// =====================================================

/*
Project Structure

app/
  layout.tsx
  page.js
  globals.css

components/
  Background.js
  Navbar.js
  Hero.js
  Summary.js
  Skills.js
  Experience.js
  Projects.js
  Certifications.js
  Education.js
  Contact.js
*/

// =====================================================
// components/Background.js
// Advanced Full-Screen 3D AI Neural Network (v2)
// Features:
// • Mouse parallax
// • Flowing particles (multi-color)
// • Node pulse on pass
// • Dynamic clustering drift
// • GPU particle cloud (points)
// =====================================================

"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo, useState, useEffect } from "react"
import * as THREE from "three"

function NeuralField(){
  const group = useRef()
  const particles = useRef([])
  const nodesRef = useRef([])
  const { mouse, camera } = useThree()

  // Nodes
  const nodes = useMemo(()=>{
    const arr=[]
    for(let i=0;i<70;i++){
      arr.push(new THREE.Vector3(
        (Math.random()-0.5)*20,
        (Math.random()-0.5)*12,
        (Math.random()-0.5)*12
      ))
    }
    return arr
  },[])

  // Connections
  const connections = useMemo(()=>{
    const lines=[]
    for(let i=0;i<140;i++){
      const a = nodes[Math.floor(Math.random()*nodes.length)]
      const b = nodes[Math.floor(Math.random()*nodes.length)]
      lines.push([a,b])
    }
    return lines
  },[nodes])

  // Multi-colored flowing particles
  const palette = ["#60a5fa","#a78bfa","#22d3ee","#34d399"]
  const flows = useMemo(()=>{
    const arr=[]
    for(let i=0;i<60;i++){
      const edge = connections[Math.floor(Math.random()*connections.length)]
      arr.push({
        start: edge[0].clone(),
        end: edge[1].clone(),
        t: Math.random(),
        color: palette[i % palette.length]
      })
    }
    return arr
  },[connections])

  // GPU particle cloud (Points)
  const cloud = useMemo(()=>{
    const count = 1200
    const positions = new Float32Array(count*3)
    for(let i=0;i<count;i++){
      positions[i*3+0] = (Math.random()-0.5)*30
      positions[i*3+1] = (Math.random()-0.5)*20
      positions[i*3+2] = (Math.random()-0.5)*20
    }
    return positions
  },[])

  useFrame((state)=>{
    if(group.current){
      // Mouse parallax
      group.current.rotation.y = mouse.x * 0.35
      group.current.rotation.x = -mouse.y * 0.35

      // Subtle clustering drift (time-based) + hover interaction
      const t = state.clock.getElapsedTime()
      // Convert mouse to 3D world position (approximate plane at z=0)
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera)
      const dir = vector.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      const hoverPoint = camera.position.clone().add(dir.multiplyScalar(distance))

      nodesRef.current.forEach((mesh, i)=>{
        if(!mesh) return
        const n = nodes[i]

        // base drift (dynamic clustering)
        const bx = n.x + Math.sin(t*0.3 + i)*0.2
        const by = n.y + Math.cos(t*0.25 + i)*0.2
        const bz = n.z + Math.sin(t*0.2 + i)*0.2

        mesh.position.set(bx, by, bz)

        // hover interaction (proximity to cursor)
        const dist = mesh.position.distanceTo(hoverPoint)
        const influence = Math.max(0, 1 - dist / 4) // smoother, wider interaction // radius of influence

        // smooth scale + emissive response
        const targetScale = 1 + influence * 1.8
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)

        if(mesh.material){
          mesh.material.emissiveIntensity = 2 + influence * 4
        }
      })
    }

    // Animate particles along edges (slow)
    particles.current.forEach((p,i)=>{
      const flow = flows[i]
      flow.t += 0.002
      if(flow.t>1) flow.t=0

      const x = flow.start.x + (flow.end.x-flow.start.x)*flow.t
      const y = flow.start.y + (flow.end.y-flow.start.y)*flow.t
      const z = flow.start.z + (flow.end.z-flow.start.z)*flow.t
      p.position.set(x,y,z)

      // Node pulse when particle near endpoints
      const dStart = Math.abs(flow.t)
      const dEnd = Math.abs(1-flow.t)
      if(dStart < 0.02 || dEnd < 0.02){
        const target = dStart < dEnd ? flow.start : flow.end
        // find closest node mesh and pulse scale
        nodesRef.current.forEach((mesh, idx)=>{
          if(!mesh) return
          const pos = mesh.position
          if(pos.distanceTo(target) < 0.3){
            mesh.scale.setScalar(1.6)
            setTimeout(()=> mesh.scale.setScalar(1), 120)
          }
        })
      }
    })
  })

  return(
    <group ref={group}>

      {/* GPU Particle Cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={cloud.length/3}
            array={cloud}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#93c5fd" opacity={0.4} transparent />
      </points>

      {/* Nodes */}
      {nodes.map((v,i)=>(
        <mesh key={i} ref={el=>nodesRef.current[i]=el} position={[v.x,v.y,v.z]}>
          <sphereGeometry args={[0.09,16,16]} />
          <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={2} />
        </mesh>
      ))}

      {/* Connections */}
      {connections.map((c,i)=>{
        const pts=[c[0].x,c[0].y,c[0].z, c[1].x,c[1].y,c[1].z]
        return(
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={2} array={new Float32Array(pts)} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color="#6366f1" opacity={0.35} transparent />
          </line>
        )
      })}

      {/* Flowing particles */}
      {flows.map((f,i)=>(
        <mesh key={i} ref={el=>particles.current[i]=el}>
          <sphereGeometry args={[0.04,10,10]} />
          <meshStandardMaterial color={f.color} emissive={f.color} emissiveIntensity={3} />
        </mesh>
      ))}

    </group>
  )
}

export default function Background(){
  const wrapperRef = useRef(null)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return(
    <div ref={wrapperRef} className="fixed inset-0 -z-10">
      <Canvas frameloop={active ? "always" : "demand"} camera={{position:[0,0,14], fov:60}}>
        <ambientLight intensity={0.9}/>
        <pointLight position={[10,10,10]} intensity={2}/>
        <NeuralField/>
      </Canvas>

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black" />

      {/* grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:"linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize:"70px 70px"
          }}
        />
      </div>

    </div>
  )
}

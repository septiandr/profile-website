"use client";

import React, { useEffect, useRef } from "react";
import { gsapInit, gsap } from "@/lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/constant/portolio";

export default function ProjectDetail() {
  const { id } = useParams();
  const root = useRef<HTMLElement>(null);
  
  // Find the project by ID
  const project = projects.find((p) => p?.id === id);
  
  useEffect(() => {
    if (!root.current) return;
    
    const g = gsapInit();
    const ctx = gsap.context(() => {
      // Animate project details on page load
      g.fromTo(".project-header", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      
      g.fromTo(".project-content", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
      
      g.fromTo(".tech-tag", 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.6, ease: "back.out" }
      );
      
      // Animate ornaments
      g.fromTo(".ornament", 
        { opacity: 0, scale: 0, rotation: -45 },
        { opacity: 0.7, scale: 1, rotation: 0, duration: 1, stagger: 0.2, delay: 0.4, ease: "elastic.out" }
      );
      
      // Floating animation for ornaments
      g.to(".ornament-1", {
        y: -15,
        rotation: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      g.to(".ornament-2", {
        y: 15,
        rotation: -5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });
    }, root.current!);
    
    return () => ctx.revert();
  }, []);
  
  if (!project) {
    return (
      <section className="section min-h-screen flex items-center justify-center">
        <div className="container text-center">
          <h1 className="text-3xl mb-4">Project Not Found</h1>
          <p className="mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/#projects" className="btn">Back to Portfolio</Link>
        </div>
      </section>
    );
  }
  
  return (
    <section ref={root} className="section project-detail min-h-screen pt-32">
      <div className="container relative">
        {/* Ornaments */}
        <div className="ornament ornament-1 absolute top-20 right-10 w-20 h-20 rounded-full bg-[rgba(var(--primary-rgb),0.1)] blur-md"></div>
        <div className="ornament ornament-2 absolute bottom-40 left-10 w-16 h-16 rounded-full bg-[rgba(var(--primary-rgb),0.1)] blur-md"></div>
        
        {/* Back button */}
        <Link href="/#projects" className="inline-flex items-center mb-8 text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="ml-2">Back to Portfolio</span>
        </Link>
        
        <div className="project-header mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            {project.year && (
              <span className="text-lg text-[var(--muted)]">{project.year}</span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {project.stack?.map((tech: string, idx: number) => (
              <span key={idx} className="tech-tag px-3 py-1.5 bg-[rgba(var(--primary-rgb),.15)] text-[var(--primary)] rounded-full">
                {tech}
              </span>
            ))}
          </div>
          
          {project.thumb && (
            <div className="rounded-xl overflow-hidden glass mb-8">
              <div className="aspect-[16/9] relative">
                <Image 
                  src={project.thumb} 
                  alt={project.title} 
                  fill 
                  className="object-contain p-6" 
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="project-content grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-lg mb-6">{project.desc}</p>
            
            <p className="mb-8">
              This project showcases my expertise in {project.category.toLowerCase()} development. 
              Using {project.stack?.join(", ")}, I created a solution that delivers 
              exceptional results for clients looking to improve their digital presence.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Challenge & Solution</h2>
            <p className="mb-6">
              The client needed a {project.category.toLowerCase()} solution that would help them 
              stand out in a competitive market. By leveraging modern technologies and best practices,
              I delivered a product that exceeded expectations.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Key Results</h2>
            {project.points && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {project.points.map((point: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[rgba(var(--primary-rgb),.2)] text-[var(--primary)] mr-3">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="md:col-span-1">
            <div className="sticky top-32 glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Project Details</h3>
              
              <div className="mb-4">
                <h4 className="text-sm text-[var(--muted)]">CATEGORY</h4>
                <p>{project.category}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm text-[var(--muted)]">YEAR</h4>
                <p>{project.year}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm text-[var(--muted)]">TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.stack?.map((tech: string, idx: number) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-[rgba(var(--primary-rgb),.1)] text-[var(--primary)] rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <a href="#contact" className="btn w-full text-center">Hire me for similar project</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
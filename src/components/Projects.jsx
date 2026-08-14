import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "TaskFlow",
    description:
      "A task management application built with React and Redux Toolkit.",
    tech: ["React", "Redux Toolkit", "Tailwind"],
    link: "#",
  },
  {
    number: "02",
    title: "EasyMart",
    description:
      "Modern e-commerce frontend with product browsing and API integration.",
    tech: ["React", "Axios", "Tailwind"],
    link: "https://easy-mart-f6pv.vercel.app/",
  },
  {
    number: "03",
    title: "Aether",
    description:
      "Interactive computer vision experience using React and MediaPipe.",
    tech: ["React", "MediaPipe", "JavaScript"],
    link: "https://nexus-ai-vision.vercel.app/",
  },
  {
    number: "04",
    title: "FocusHub",
    description:
      "Student productivity dashboard with weather and Pomodoro features.",
    tech: ["JavaScript", "API", "CSS"],
    link: "https://productivity-dashboard-hxfz.vercel.app/",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animation = gsap.timeline({ paused: true });

      animation
        .from(".projects-header > *", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        })
        .from(
          ".project-item",
          {
            y: 70,
            opacity: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",
          },
          "-=0.25"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",

        onEnter: () => animation.restart(),
        onEnterBack: () => animation.restart(),

        onLeave: () => animation.pause(0),
        onLeaveBack: () => animation.pause(0),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding"
    >
      <div className="max-w-7xl mx-auto">

        <div className="projects-header flex items-center gap-4 mb-16">
          <span className="text-sm text-neutral-500">
            03
          </span>

          <div className="h-px w-12 bg-neutral-700" />

          <span className="text-sm uppercase tracking-widest text-neutral-500">
            Selected Work
          </span>
        </div>

        <div className="projects-list">

          {projects.map((project) => (
            <a
              href={project.link}
              key={project.number}
              className="
                project-item
                group
                block
                border-t
                border-white/10
                py-10
                md:py-14
              "
            >
              <div className="grid md:grid-cols-[100px_1fr_auto] gap-6 items-start">

                <span
                  className="
                    text-sm
                    text-neutral-600
                    transition-colors
                    duration-300
                    group-hover:text-neutral-300
                  "
                >
                  {project.number}
                </span>

                <div>

                  <h3
                    className="
                      font-display
                      text-4xl
                      md:text-6xl
                      font-medium
                      transition-all
                      duration-500
                      ease-out
                      group-hover:translate-x-2
                      group-hover:text-neutral-400
                    "
                  >
                    {project.title}
                  </h3>

                  <p
                    className="
                      mt-5
                      max-w-xl
                      text-neutral-500
                      leading-7
                      transition-colors
                      duration-300
                      group-hover:text-neutral-400
                    "
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="
                          text-xs
                          px-3
                          py-1.5
                          rounded-full
                          bg-white/5
                          text-neutral-400
                          transition-all
                          duration-300
                          group-hover:bg-white/[0.08]
                          group-hover:text-neutral-300
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-500
                    group-hover:bg-white
                    group-hover:text-black
                    group-hover:border-white
                    group-hover:rotate-45
                    group-hover:scale-110
                  "
                >
                  <ArrowUpRight size={20} />
                </div>

              </div>
            </a>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Projects;
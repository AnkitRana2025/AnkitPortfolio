import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React.js", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Django", "FastAPI"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "MySQL", "Firebase"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "GSAP", "REST APIs"],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ========================================
      // INITIAL STATES
      // ========================================

      gsap.set(".skills-header > *", {
        y: 20,
        opacity: 0,
      });

      gsap.set(".skill-card", {
        y: 60,
        opacity: 0,
      });

      gsap.set(".skill-pill", {
        y: 12,
        opacity: 0,
      });

      // ========================================
      // ANIMATION
      // ========================================

      const animation = gsap.timeline({
        paused: true,
      });

      animation
        .to(".skills-header > *", {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        })

        .to(
          ".skill-card",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.3"
        )

        .to(
          ".skill-pill",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // ========================================
      // SCROLL TRIGGER
      // ========================================

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",

        onEnter: () => {
          animation.restart();
        },

        onEnterBack: () => {
          animation.restart();
        },

        onLeave: () => {
          animation.pause(0);
        },

        onLeaveBack: () => {
          animation.pause(0);
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding bg-[#0c0c0c]"
    >
      <div className="max-w-7xl mx-auto">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="skills-header flex items-center gap-4 mb-16">

          <span className="text-sm text-neutral-500">
            02
          </span>

          <div className="h-px w-12 bg-neutral-700" />

          <span className="text-sm uppercase tracking-widest text-neutral-500">
            Skills
          </span>

        </div>

        {/* ========================================
            SKILL CARDS
        ======================================== */}

        <div className="skills-grid grid md:grid-cols-2 gap-px bg-white/10">

          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="
                skill-card
                bg-[#0c0c0c]
                p-8
                md:p-12
                group
              "
            >

              <h3
                className="
                  font-display
                  text-2xl
                  mb-8
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                "
              >
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-3">

                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      skill-pill
                      px-4
                      py-2
                      border
                      border-white/10
                      rounded-full
                      text-sm
                      text-neutral-400
                      hover:text-white
                      hover:border-white/30
                      hover:bg-white/[0.03]
                      transition-all
                      duration-300
                    "
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Skills;
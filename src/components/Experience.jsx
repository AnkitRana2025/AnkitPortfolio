import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animation = gsap.timeline({ paused: true });

      animation
        .from(".experience-header > *", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        })
        .from(
          ".experience-line",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "power3.inOut",
          },
          "-=0.2"
        )
        .from(
          ".experience-date",
          {
            x: -30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".experience-details > *",
          {
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4"
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
      id="experience"
      className="section-padding bg-[#0c0c0c]"
    >
      <div className="max-w-7xl mx-auto">

        <div className="experience-header flex items-center gap-4 mb-16">

          <span className="text-sm text-neutral-500">
            04
          </span>

          <div className="h-px w-12 bg-neutral-700" />

          <span className="text-sm uppercase tracking-widest text-neutral-500">
            Experience
          </span>

        </div>

        <div className="experience-content relative">

          <div
            className="
              experience-line
              absolute
              top-0
              left-0
              w-full
              h-px
              bg-white/10
            "
          />

          <div className="
            pt-10
            grid
            md:grid-cols-[200px_1fr]
            gap-8
            group
          ">

            <span
              className="
                experience-date
                text-neutral-500
                transition-colors
                duration-300
                group-hover:text-neutral-300
              "
            >
              2026 — Present
            </span>

            <div className="experience-details">

              <h3
                className="
                  font-display
                  text-3xl
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                "
              >
                Software Engineering Intern
              </h3>

              <p className="mt-4 py-8 text-neutral-500 max-w-2xl leading-7">
                Worked on modern web applications, frontend
                development and full-stack engineering tasks.
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
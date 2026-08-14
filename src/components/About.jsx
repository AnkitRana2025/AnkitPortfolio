import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".about-header > *", {
        y: 20,
        opacity: 0,
      });

      gsap.set(".about-image", {
        y: 80,
        opacity: 0,
        scale: 0.96,
      });

      gsap.set(".about-content", {
        y: 60,
        opacity: 0,
      });

      gsap.set(".about-text-line", {
        y: 25,
        opacity: 0,
      });

      const animation = gsap.timeline({
        paused: true,
      });

      animation
        // Header
        .to(".about-header > *", {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        })

        // Image
        .to(
          ".about-image",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.3"
        )

        // Content
        .to(
          ".about-content",
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.7"
        )

        // Text lines
        .to(
          ".about-text-line",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // Repeat animation whenever section enters viewport
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

  // Desktop-only subtle image parallax
  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) return;

    const image = sectionRef.current?.querySelector(".about-image");

    if (!image) return;

    const handleMouseMove = (event) => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(image, {
        x: x * 6,
        y: y * 4,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding"
    >
      <div className="max-w-7xl mx-auto">

        {/* ========================================
            SECTION HEADER
        ======================================== */}

        <div className="about-header flex items-center gap-4 mb-16">

          <span className="text-sm text-neutral-500">
            01
          </span>

          <div className="h-px w-12 bg-neutral-700" />

          <span className="text-sm uppercase tracking-widest text-neutral-500">
            About Me
          </span>

        </div>

        {/* ========================================
            MAIN CONTENT
        ======================================== */}

        <div className="grid md:grid-cols-[0.9fr_1.4fr] gap-12 md:gap-20 items-center">

          {/* ======================================
              IMAGE
          ====================================== */}

          <div className="relative">

            <div
              className="
                about-image
                relative
                overflow-hidden
                border
                border-white/10
                bg-[#080808]
                will-change-transform
                group
              "
            >

              <img
                src="/images/ankit.jpeg"
                alt="Ankit Pratap"
                className="
                  w-full
                  aspect-[4/5]
                  object-cover
                  grayscale
                  transition-all
                  duration-700
                  ease-out
                  group-hover:grayscale-0
                  group-hover:scale-[1.03]
                "
              />

              {/* Image overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-transparent
                  to-transparent
                  pointer-events-none
                "
              />

              {/* Image label */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-white/50
                "
              >
                Full Stack Developer
              </div>

            </div>

          </div>

          {/* ======================================
              CONTENT
          ====================================== */}

          <div className="about-content">

            <p className="about-text-line text-neutral-500 text-sm uppercase tracking-widest">
              Who I am
            </p>

            <h2
              className="
                about-text-line
                mt-6
                font-display
                text-3xl
                md:text-5xl
                leading-tight
                font-medium
              "
            >
              I turn ideas into{" "}
              <span className="text-neutral-500">
                interactive digital experiences.
              </span>
            </h2>

            <p
              className="
                about-text-line
                mt-8
                text-neutral-400
                leading-8
                text-lg
              "
            >
              I'm a BCA student and Full Stack Developer who enjoys
              creating modern web applications. My focus is on React,
              Node.js, databases and creating smooth user experiences.
            </p>

            <p
              className="
                about-text-line
                mt-6
                text-neutral-500
                leading-8
              "
            >
              I believe good development is not just about making
              something work — it's about making it scalable,
              maintainable and enjoyable to use.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
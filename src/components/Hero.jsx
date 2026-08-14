import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isLoaded }) => {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);

  // ========================================
  // HERO INTRO + SCROLL ANIMATION
  // ========================================
      
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      // Hero reveal
      tl.from(".hero-label", {
        y: 30,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-title span",
          {
            y: 120,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.3"
        )
        .from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-buttons",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        );

      // Hero scroll animation
      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0.25,
        ease: "none",

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Background glow scroll animation
      gsap.to(glowRef.current, {
        y: 120,
        scale: 1.15,
        ease: "none",

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // ========================================
  // MOUSE PARALLAX
  // ========================================

  useEffect(() => {
    if (!isLoaded) return;

    const isTouchDevice =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) return;

    const handleMouseMove = (event) => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(contentRef.current, {
        x: x * 8,
        y: y * 5,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(glowRef.current, {
        x: x * 40,
        y: y * 30,
        duration: 1.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isLoaded]);

  return (
    <section
      ref={heroRef}
      className="
        min-h-screen
        relative
        flex
        items-center
        overflow-hidden
        px-6
        mt-8
        md:px-10
      "
    >
      {/* Background Glow */}

      <div
        ref={glowRef}
        className="
          absolute
          w-[500px]
          h-[500px]
          bg-blue-600/[0.08]
          blur-[150px]
          rounded-full
          top-1/4
          -right-40
          pointer-events-none
          will-change-transform
        "
      />

      {/* Hero Content */}

      <div
        ref={contentRef}
        className="
          max-w-7xl
          mx-auto
          w-full
          will-change-transform
        "
      >
        {/* Availability */}

        <div className="hero-label flex items-center gap-3 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />

          <span className="text-sm text-neutral-400">
            Available for opportunities
          </span>
        </div>

        {/* Title */}

        <h1
          className="
            hero-title
            font-display
            uppercase
            font-bold
            leading-[0.85]
            tracking-[-0.06em]
            text-[14vw]
            md:text-[11vw]
            lg:text-[9.5vw]
            overflow-hidden
          "
        >
          <span className="block">
            BUILD.
          </span>

          <span className="block text-neutral-500">
            CREATE.
          </span>

          <span className="block">
            SCALE.
          </span>
        </h1>

        {/* Description + Buttons */}

        <div className="mt-10 max-w-2xl">
          <p className="hero-description text-neutral-400 text-base md:text-lg leading-relaxed">
            I'm Ankit Pratap, a Full Stack Developer focused on
            building fast, scalable and interactive web experiences.
          </p>

          <div className="hero-buttons flex flex-wrap gap-4 mt-8">
            <a
              href="#projects"
              data-cursor="VIEW"
              className="
                group
                flex
                items-center
                gap-3
                px-6
                py-3
                rounded-full
                bg-white
                text-black
                font-medium
              "
            >
              View Projects

              <ArrowUpRight
                size={18}
                className="
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                  transition
                "
              />
            </a>

            <a
              href="#contact"
              data-cursor="CONTACT"
              className="
                px-6
                py-3
                rounded-full
                border
                border-white/20
                hover:bg-white
                hover:text-black
                transition
              "
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Year */}

      <div className="absolute bottom-8 right-6 md:right-10 text-neutral-600 text-sm">
        2026
      </div>
    </section>
  );
};

export default Hero;
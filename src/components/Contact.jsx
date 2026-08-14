import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animation = gsap.timeline({ paused: true });

      animation
        // ========================================
        // HEADER
        // ========================================

        .from(".contact-header > *", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        })

        // ========================================
        // TITLE
        // ========================================

        .from(
          ".contact-title span",
          {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.25"
        )

        // ========================================
        // CONTACT INFO
        // ========================================

        .from(
          ".contact-info",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )

        // ========================================
        // CTA
        // ========================================

        .from(
          ".contact-cta",
          {
            scale: 0.7,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.5)",
          },
          "-=0.5"
        );

      // ========================================
      // REPEAT ON SCROLL
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
      id="contact"
      className="section-padding min-h-[80vh] flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="contact-header flex items-center gap-4 mb-16">

          <span className="text-sm text-neutral-500">
            05
          </span>

          <div className="h-px w-12 bg-neutral-700" />

          <span className="text-sm uppercase tracking-widest text-neutral-500">
            Contact
          </span>

        </div>

        {/* ========================================
            TITLE
        ======================================== */}

        <h2
          className="
            contact-title
            font-display
            text-[12vw]
            md:text-[9vw]
            leading-[0.85]
            tracking-[-0.06em]
            overflow-hidden
          "
        >
          <span className="block">
            LET'S
          </span>

          <span className="block text-neutral-500">
            BUILD.
          </span>
        </h2>

        {/* ========================================
            CONTACT DETAILS
        ======================================== */}

        <div
          className="
            contact-details
            mt-12
            flex
            flex-col
            md:flex-row
            md:items-center
            justify-between
            gap-8
          "
        >

          {/* Contact information */}

          <div className="contact-info">

            <p className="text-neutral-500 mb-3">
              Have a project or opportunity?
            </p>

            <a
              href="mailto:ankitpratp76509@gmail.com"
              className="
                text-xl
                md:text-2xl
                hover:text-neutral-400
                transition-colors
                duration-300
              "
            >
              ankitpratp76509@gmail.com
            </a>

          </div>

          {/* CTA */}

          <a
            href="mailto:ankitpratp76509@gmail.com"
            aria-label="Send me an email"
            className="
              contact-cta
              group
              w-16
              h-16
              rounded-full
              bg-white
              text-black
              flex
              items-center
              justify-center
              transition-transform
              duration-500
              hover:scale-110
            "
          >
            <ArrowUpRight
              size={24}
              className="
                transition-transform
                duration-500
                group-hover:rotate-45
              "
            />
          </a>

        </div>

      </div>
    </section>
  );
};

export default Contact;
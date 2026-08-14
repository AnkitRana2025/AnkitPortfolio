import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const progressTextRef = useRef(null);
  const counterRef = useRef(null);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const loader = loaderRef.current;
    const progress = progressRef.current;
    const progressText = progressTextRef.current;
    const counter = counterRef.current;

    if (!loader || !progress || !progressText || !counter) {
      return;
    }

    const counterValue = {
      value: 0,
    };

    const ctx = gsap.context(() => {
      // -----------------------------
      // Initial states
      // -----------------------------

      gsap.set(".loader-brand", {
        y: 30,
        opacity: 0,
      });

      gsap.set(".loader-info", {
        y: 20,
        opacity: 0,
      });

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // -----------------------------
      // Main timeline
      // -----------------------------

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },

        onComplete: () => {
          onCompleteRef.current?.();
        },
      });

      // Brand reveal
      tl.to(".loader-brand", {
        y: 0,
        opacity: 1,
        duration: 0.7,
      })

        // Loading information
        .to(
          ".loader-info",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          "-=0.3"
        )

        // Progress bar
        .to(
          progress,
          {
            scaleX: 1,
            duration: 1.8,
            ease: "power2.inOut",
          },
          "-=0.2"
        )

        // Counter
        .to(
          counterValue,
          {
            value: 100,
            duration: 1.8,
            ease: "power2.inOut",

            onUpdate: () => {
              const value = Math.round(counterValue.value);

              counter.textContent = value
                .toString()
                .padStart(3, "0");

              progressText.textContent =
                value >= 100 ? "READY" : "LOADING";
            },
          },
          "<"
        )

        // Small pause
        .to({}, {
          duration: 0.25,
        })

        // Exit
        .to(loader, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        });
    }, loaderRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="
        loader
        fixed
        inset-0
        z-[9998]
        bg-[#080808]
        text-white
        flex
        flex-col
        justify-between
        p-6
        md:p-10
      "
    >

      {/* ================= TOP ================= */}

      <div className="flex items-start justify-between">

        <div className="loader-brand">
          <span className="font-display text-xl font-bold tracking-tight">
            ANKIT<span className="text-neutral-500">.</span>
          </span>
        </div>

        <span className="text-xs text-neutral-600 tracking-[0.2em]">
          PORTFOLIO / 2026
        </span>

      </div>

      {/* ================= CENTER ================= */}

      <div className="max-w-7xl mx-auto w-full">

        <div className="loader-info flex items-end justify-between mb-4">

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-600 mb-2">
              Initializing
            </p>

            <p
              ref={progressTextRef}
              className="text-sm text-neutral-400"
            >
              LOADING
            </p>
          </div>

          <span
            ref={counterRef}
            className="
              font-display
              text-4xl
              md:text-6xl
              font-medium
              tabular-nums
            "
          >
            000
          </span>

        </div>

        {/* Progress */}
        <div className="h-px w-full bg-white/10 overflow-hidden">

          <div
            ref={progressRef}
            className="loader-line h-full bg-white"
          />

        </div>

      </div>

      {/* ================= BOTTOM ================= */}

      <div className="flex justify-between items-end">

        <span className="text-xs text-neutral-600 uppercase tracking-widest">
          Full Stack Developer
        </span>

        <span className="text-xs text-neutral-600">
          Please wait...
        </span>

      </div>

    </div>
  );
};

export default Loader;
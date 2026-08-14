import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const text = textRef.current;

    // Initial position
    gsap.set([cursor, follower], {
      xPercent: -50,
      yPercent: -50,
    });

    // Small cursor follows mouse immediately
    const moveCursor = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.08,
        ease: "power2.out",
        overwrite: true,
      });

      // Bigger follower has a little delay
      gsap.to(follower, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor]"
    );

    const handleEnter = (event) => {
      const element = event.currentTarget;

      gsap.to(follower, {
        width: 70,
        height: 70,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        duration: 0.3,
        ease: "power3.out",
      });

      gsap.to(cursor, {
        scale: 0,
        duration: 0.2,
        ease: "power3.out",
      });

      const cursorText = element.dataset.cursor;

      if (cursorText) {
        text.textContent = cursorText;

        gsap.to(text, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
        });
      }
    };

    const handleLeave = () => {
      gsap.to(follower, {
        width: 36,
        height: 36,
        backgroundColor: "transparent",
        borderColor: "rgba(255,255,255,0.3)",
        duration: 0.3,
        ease: "power3.out",
      });

      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        ease: "power3.out",
      });

      gsap.to(text, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
      });
    };

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Small center dot */}
      <div
        ref={cursorRef}
        className="custom-cursor-dot"
      />

      {/* Main follower */}
      <div
        ref={followerRef}
        className="custom-cursor-follower"
      >
        <span ref={textRef} />
      </div>
    </>
  );
};

export default CustomCursor;
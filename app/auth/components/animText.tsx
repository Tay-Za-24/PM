"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type TextProps = {
  texts: string[];
};

export default function AnimatedText({ texts }: TextProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const textRef = useRef<HTMLParagraphElement>(null);

  // Automatically loop texts
  useGSAP(
    () => {
      if (texts.length <= 1) return;

      const timer = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % texts.length);
      }, 3000);

      return () => clearTimeout(timer);
    },
    { dependencies: [activeIndex] }
  );

  // Animate characters
  useGSAP(
    () => {
      if (!textRef.current) return;

      const chars = textRef.current.querySelectorAll(".char");

      gsap.fromTo(
        chars,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.05,
          stagger: 0.08,
          ease: "power1.out",
        }
      );
    },
    {
      scope: textRef,
      dependencies: [activeIndex],
    }
  );

  const currentText = texts[activeIndex];

  return (
    <div className="animWrap">
      <p ref={textRef}>
        {currentText.split("").map((char, index) => (
          <span key={index} className="char">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>
      <span className="indicator"></span>
    </div>
  );
}

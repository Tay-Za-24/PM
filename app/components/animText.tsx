"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { text } from "stream/consumers";

type TextProps = {
  texts: string[];
  extraClass : string;
};

export default function AnimatedText({ texts, extraClass }: TextProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const textRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

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
      if (!textRef.current || !indicatorRef.current) return;

      const chars =
        textRef.current.querySelectorAll<HTMLSpanElement>(".char");
      const indicator = indicatorRef.current;

      const textTl = gsap.timeline();

      for (const char of chars) {
        const posX = char.offsetLeft + char.offsetWidth;

        textTl.fromTo(
          char,
          { opacity: 0 },
          {
            opacity: 1,
            duration: .05,
            ease: "power1.out",
          },
          ">"
        );

        textTl.to(
          indicator,
          {
            x: posX,
            duration: 0.05,
            ease: "none",
          },
          ">+=0.03"
        );
      }

      gsap.fromTo(
        indicator, 
        { opacity : 0}, 
        { opacity : 1,
          duration : .5,
          repeat : -1,
          yoyo : true,
        }
      )
    },
    { dependencies: [activeIndex], scope: textRef }
  );

  const currentText = texts[activeIndex];

  return (
    <div ref={textRef} className="animWrap">
      <p className={extraClass}>
        {currentText.split("").map((char, index) => (
          <span key={index} className="char">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>
      <span ref={indicatorRef} className="indicator"></span>
    </div>
  );
}

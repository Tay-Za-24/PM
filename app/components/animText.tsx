"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type AnimatedTextProps = {
  text: string;
};

export default function AnimatedText({ text }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !indicatorRef.current) return;

      const chars =
        containerRef.current.querySelectorAll<HTMLSpanElement>(".char");
      const indicator = indicatorRef.current;

      // reset cursor position
      gsap.set(indicator, { x: 0, opacity: 1 });

      const tl = gsap.timeline();

      chars.forEach((char) => {
        const posX = char.offsetLeft + char.offsetWidth;

        tl.fromTo(
          char,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.05,
            ease: "power1.out",
          },
          ">"
        );

        tl.to(
          indicator,
          {
            x: posX,
            duration: 0.05,
            ease: "none",
          },
          ">+=0.03"
        );
      });

      // blinking cursor (after typing finishes)
      tl.to(indicator, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      });
    },
    {
      dependencies: [text],
      scope: containerRef,
    }
  );

  return (
    <div ref={containerRef} className="animWrap">
      <p>
        {text.split("").map((char, index) => (
          <span key={index} className="char">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>
      <span ref={indicatorRef} className="indicator" />
    </div>
  );
}

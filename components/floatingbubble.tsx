"use client";

import { useState, useEffect } from "react";

export default function FloatingBubbles() {
  const [bubbleStyles, setBubbleStyles] = useState<any[]>([]);

  useEffect(() => {
    const generatedStyles = Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 50 + 15}px`,
      floatDuration: `${Math.random() * 12 + 8}s`,
      swayDuration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 8}s`,
    }));
    setBubbleStyles(generatedStyles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {bubbleStyles.map((style, i) => (
        <div
          key={i}
          className="absolute bottom-[-100px] rounded-full bg-brand-primary/15 blur-[1px] animate-bubble"
          style={{
            left: style.left,
            width: style.size,
            height: style.size,

            animationDuration: `${style.floatDuration}, ${style.swayDuration}`,
            animationDelay: `${style.delay}, ${style.delay}`,
          }}
        />
      ))}
    </div>
  );
}

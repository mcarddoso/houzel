"use client";
import { useState, useRef, useEffect } from "react";

const Card = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (isPlaying || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const insideX = e.clientX >= rect.left && e.clientX <= rect.right;
      const insideY = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (insideX && insideY) {
        const xNorm = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const yNorm = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
        setMousePos({ x: xNorm * 20, y: yNorm * 20 });
      } else {
        setMousePos({ x: 0, y: 0 });
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isPlaying]);

  const handleClick = () => {
    if (!isPlaying) {
      setMousePos({ x: 0, y: 0 });
      setIsPlaying(true);
    }
  };

  return (
    <section className="cursor-pointer perspective-[1200px] mt-24">
      <div
        ref={cardRef}
        // onClick={handleClick}
        style={{
          transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
          transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="relative [transform-style:preserve-3d] w-[900px] h-[507px] rounded-[18px] bg-black/10"
      >
        {/* <iframe
          src="https://www.youtube.com/embed/K27diMbCsuw?si=w5CnjfKPdzDfAXch"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={`absolute inset-0 w-full h-full rounded-[15px] border border-black/15 shadow-lg ${
            isPlaying ? "" : "pointer-events-none"
          }`}
        /> */}
      </div>
    </section>
  );
};

export default Card;

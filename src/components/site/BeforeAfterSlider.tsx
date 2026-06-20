"use client";

import React, { useState, useRef, useEffect } from "react";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Antes",
  afterLabel = "Depois",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      setWidth(containerRef.current?.getBoundingClientRect().width || 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const onTouchMove = (e: TouchEvent) => handleTouchMove(e);
    const onMouseUp = () => handleMouseUp();

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-gold-200/20 bg-stone-100 dark:bg-stone-900"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After Image (Full width base) */}
      <img
        src={afterImage}
        alt="Depois"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute right-4 bottom-4 bg-stone-950/60 backdrop-blur-sm px-3 py-1 rounded text-stone-100 text-[10px] uppercase tracking-widest font-sans font-light z-10">
        {afterLabel}
      </div>

      {/* Before Image (Clipping width overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Antes"
          className="absolute inset-0 h-full object-cover max-w-none"
          style={{ width: width || "100%", maxWidth: "none" }}
        />
      </div>
      <div className="absolute left-4 bottom-4 bg-gold-600/70 backdrop-blur-sm px-3 py-1 rounded text-stone-100 text-[10px] uppercase tracking-widest font-sans font-light z-10">
        {beforeLabel}
      </div>

      {/* Slider Line Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Crest */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-stone-900 border border-gold-400 rounded-full flex items-center justify-center shadow-lg pointer-events-none">
          <span className="text-gold-500 font-bold text-xs select-none">↔</span>
        </div>
      </div>
    </div>
  );
};

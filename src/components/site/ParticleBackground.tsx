"use client";

import React, { useEffect, useRef } from "react";

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create initial particles
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -Math.random() * 0.3 - 0.1, // Floating upwards
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: Math.random() * 0.002 + 0.001,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // We determine if document has 'dark' class
      const isDark = document.documentElement.classList.contains("dark");
      const color = isDark ? "176, 146, 106" : "197, 168, 128"; // gold-500 or gold-400

      particles.forEach((p, idx) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Reset if goes off top or sides
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
          p.opacity = 0.1;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }

        // Pulse opacity
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.6 || p.opacity < 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Ensure within limits
        const opacity = Math.max(0.1, Math.min(0.6, p.opacity));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${color}, ${opacity * 0.8})`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};

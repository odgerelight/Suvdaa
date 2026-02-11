'use client';

import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Particle {
  position: Point;
  velocity: Point;
  acceleration: Point;
  age: number;
}

const settings = {
  particles: {
    length: 500, // Reduced for better performance
    duration: 2,
    velocity: 100,
    effect: -0.75,
    size: 30,
  },
};

export default function LoveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    // Initialize particles pool
    particlesRef.current = Array.from({ length: settings.particles.length }, () => ({
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      age: settings.particles.duration,
    }));

    let firstActive = 0;
    let firstFree = 0;

    // Resize handler
    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Heart shape calculation
    const pointOnHeart = (t: number): Point => {
      return {
        x: 160 * Math.pow(Math.sin(t), 3),
        y:
          130 * Math.cos(t) -
          50 * Math.cos(2 * t) -
          20 * Math.cos(3 * t) -
          10 * Math.cos(4 * t) +
          25,
      };
    };

    // Create heart particle image
    const heartImage = (() => {
      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');
      if (!tempContext) return null;

      tempCanvas.width = settings.particles.size;
      tempCanvas.height = settings.particles.size;

      const to = (t: number): Point => {
        const point = pointOnHeart(t);
        return {
          x: settings.particles.size / 2 + (point.x * settings.particles.size) / 350,
          y: settings.particles.size / 2 - (point.y * settings.particles.size) / 350,
        };
      };

      tempContext.beginPath();
      let t = -Math.PI;
      let point = to(t);
      tempContext.moveTo(point.x, point.y);
      while (t < Math.PI) {
        t += 0.01;
        point = to(t);
        tempContext.lineTo(point.x, point.y);
      }
      tempContext.closePath();
      
      // Gradient for better visual
      const gradient = tempContext.createRadialGradient(
        settings.particles.size / 2,
        settings.particles.size / 2,
        0,
        settings.particles.size / 2,
        settings.particles.size / 2,
        settings.particles.size / 2
      );
      gradient.addColorStop(0, '#ff1744');
      gradient.addColorStop(1, '#f50057');
      tempContext.fillStyle = gradient;
      tempContext.fill();

      const image = new Image();
      image.src = tempCanvas.toDataURL();
      return image;
    })();

    if (!heartImage) return;

    // Add particle
    const addParticle = (x: number, y: number, dx: number, dy: number) => {
      const particle = particlesRef.current[firstFree];
      particle.position.x = x;
      particle.position.y = y;
      particle.velocity.x = dx;
      particle.velocity.y = dy;
      particle.acceleration.x = dx * settings.particles.effect;
      particle.acceleration.y = dy * settings.particles.effect;
      particle.age = 0;

      firstFree++;
      if (firstFree === particlesRef.current.length) firstFree = 0;
      if (firstActive === firstFree) firstActive++;
      if (firstActive === particlesRef.current.length) firstActive = 0;
    };

    // Update particles
    const updateParticles = (deltaTime: number) => {
      const particles = particlesRef.current;
      
      if (firstActive < firstFree) {
        for (let i = firstActive; i < firstFree; i++) {
          const p = particles[i];
          p.position.x += p.velocity.x * deltaTime;
          p.position.y += p.velocity.y * deltaTime;
          p.velocity.x += p.acceleration.x * deltaTime;
          p.velocity.y += p.acceleration.y * deltaTime;
          p.age += deltaTime;
        }
      }
      
      if (firstFree < firstActive) {
        for (let i = firstActive; i < particles.length; i++) {
          const p = particles[i];
          p.position.x += p.velocity.x * deltaTime;
          p.position.y += p.velocity.y * deltaTime;
          p.velocity.x += p.acceleration.x * deltaTime;
          p.velocity.y += p.acceleration.y * deltaTime;
          p.age += deltaTime;
        }
        for (let i = 0; i < firstFree; i++) {
          const p = particles[i];
          p.position.x += p.velocity.x * deltaTime;
          p.position.y += p.velocity.y * deltaTime;
          p.velocity.x += p.acceleration.x * deltaTime;
          p.velocity.y += p.acceleration.y * deltaTime;
          p.age += deltaTime;
        }
      }

      while (
        particles[firstActive].age >= settings.particles.duration &&
        firstActive !== firstFree
      ) {
        firstActive++;
        if (firstActive === particles.length) firstActive = 0;
      }
    };

    // Draw particles
    const drawParticles = () => {
      const particles = particlesRef.current;
      const ease = (t: number) => --t * t * t + 1;

      const draw = (i: number) => {
        const p = particles[i];
        const size = heartImage.width * ease(p.age / settings.particles.duration);
        context.globalAlpha = 1 - p.age / settings.particles.duration;
        context.drawImage(
          heartImage,
          p.position.x - size / 2,
          p.position.y - size / 2,
          size,
          size
        );
      };

      if (firstActive < firstFree) {
        for (let i = firstActive; i < firstFree; i++) {
          draw(i);
        }
      }
      
      if (firstFree < firstActive) {
        for (let i = firstActive; i < particles.length; i++) {
          draw(i);
        }
        for (let i = 0; i < firstFree; i++) {
          draw(i);
        }
      }
    };

    // Animation loop
    const particleRate = settings.particles.length / settings.particles.duration;
    
    const render = () => {
      const newTime = performance.now() / 1000;
      const deltaTime = newTime - (timeRef.current || newTime);
      timeRef.current = newTime;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const amount = particleRate * deltaTime;
      for (let i = 0; i < amount; i++) {
        const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
        const length = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        const dir = {
          x: (pos.x / length) * settings.particles.velocity,
          y: (pos.y / length) * settings.particles.velocity,
        };
        addParticle(
          canvas.width / 2 + pos.x,
          canvas.height / 2 - pos.y,
          dir.x,
          -dir.y
        );
      }

      updateParticles(deltaTime);
      drawParticles();

      animationRef.current = requestAnimationFrame(render);
    };

    // Start animation immediately
    animationRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
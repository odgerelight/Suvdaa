'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

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
    length: 500,
    duration: 2,
    velocity: 100,
    effect: -0.75,
    size: 30,
  },
};

export default function ValentineLetter() {
  const [showLetter, setShowLetter] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const noBtnRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef<number>(0);

  const handleEnvelopeClick = () => {
    setShowLetter(true);
    setTimeout(() => {
      setIsLetterOpen(true);
    }, 50);
  };

  const handleNoHover = () => {
    if (!noBtnRef.current || isAccepted) return;

    const min = 150;
    const max = 250;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtnRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleYesClick = () => {
    setIsAccepted(true);
  };

  // Heart animation effect
  useEffect(() => {
    if (!isAccepted) return;

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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
    const createHeartImage = () => {
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

      const img = document.createElement('img');
      img.src = tempCanvas.toDataURL();
      return img;
    };

    const heartImage = createHeartImage();
    if (!heartImage) return;

    // Wait for image to load
    heartImage.onload = () => {
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
    };

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAccepted]);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ 
        backgroundImage: "url('/heart-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      
      {/* Heart Particle Animation Canvas */}
      {isAccepted && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none z-50"
        />
      )}

      {/* Envelope Screen */}
      {!showLetter && (
        <div 
          onClick={handleEnvelopeClick}
          className="text-center cursor-pointer"
          style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
        >
          <div className="relative animate-pulse">
            <Image
              src="/envelope.png"
              alt="Envelope"
              width={200}
              height={200}
              className="w-[200px] h-auto mx-auto hover:scale-110 transition-transform duration-300"
              priority
            />
          </div>
          <p className="text-[40px] mt-4 text-black drop-shadow-lg">
            ♡ Letter for You ♡
          </p>
        </div>
      )}

      {/* Letter Screen */}
      {showLetter && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-40">
          <div
            className={`
              relative w-[90vw] max-w-[800px]
              flex flex-col items-center justify-center text-center
              bg-contain bg-no-repeat bg-center
              rounded-xl px-5
              transition-all duration-[600ms] ease-out
              ${isLetterOpen ? 'scale-100 opacity-100' : 'scale-[1.2] opacity-0'}
            `}
            style={{ 
              backgroundImage: "url('/window.png')",
              aspectRatio: '3/2',
              paddingTop: '180px',
              fontFamily: "'Pixelify Sans', sans-serif"
            }}
          >
            <h1 className="text-[40px] font-bold text-pink-900 mb-2">
              {isAccepted ? 'Yippeeee!' : 'Will you be my Valentine?'}
            </h1>

            <div 
              className="relative my-[10px] transition-all duration-[400ms]"
              style={{ 
                width: isAccepted ? '180px' : '250px'
              }}
            >
              <Image
                src={isAccepted ? '/cat_dance.gif' : '/cat_heart.gif'}
                alt="Cat"
                width={250}
                height={250}
                className="w-full h-auto mx-auto"
                unoptimized
              />
            </div>

            {!isAccepted ? (
              <div className="flex items-center justify-center gap-[30px] relative">
                <button
                  onClick={handleYesClick}
                  className="relative z-[2] hover:scale-110 transition-transform duration-300 focus:outline-none"
                  style={{ background: 'none', backgroundColor: 'transparent', boxShadow: 'none'}}
                  aria-label="Yes"
                >
                  <Image
                    src="/yes.png"
                    alt="Yes"
                    width={120}
                    height={120}
                    className="w-[120px] h-auto cursor-pointer select-none"
                  />
                </button>

                <div
                  ref={noBtnRef}
                  onMouseEnter={handleNoHover}
                  className="relative z-[1] transition-transform duration-150 ease-out"
                >
                  <Image
                    src="/no.png"
                    alt="No"
                    width={120}
                    height={120}
                    className="w-[120px] h-auto cursor-default select-none"
                  />
                </div>
              </div>
            ) : (
              <div 
                className="inline-block px-5 py-[10px] rounded-xl text-center leading-[1.4]"
                style={{
                  fontSize: '22px',
                  backgroundColor: 'rgba(255, 240, 240, 0.5)',
                  display: 'block'
                }}
              >
                <p className="text-pink-900">
                  <strong>Valentine Date 2/14:</strong> B Caffe Bar
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
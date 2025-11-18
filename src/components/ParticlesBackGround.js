import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

function ParticlesBackground({ 
  className = 'absolute inset-0 z-0', 
  shape = 'circle', 
  glow = false,
  particleCount = 100 // Prop pour ajuster (ex. 50 sur mobile)
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationIdRef = useRef(null);

  // Fonction pour dessiner une forme (modulaire)
  const drawShape = useCallback((ctx, p, shape, glow) => {
    ctx.fillStyle = p.color;
    if (glow) {
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8; // Glow plus léger pour perf
    }

    switch (shape) {
      case 'triangle':
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.PI / 3 * (Math.random() - 0.5)); // Rotation random légère
        ctx.beginPath();
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(-p.size / 2, p.size / 2);
        ctx.lineTo(p.size / 2, p.size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        break;
      case 'square':
        const radius = p.size / 4;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p.x + radius, p.y);
        ctx.lineTo(p.x + p.size - radius, p.y);
        ctx.quadraticCurveTo(p.x + p.size, p.y, p.x + p.size, p.y + radius);
        ctx.lineTo(p.x + p.size, p.y + p.size - radius);
        ctx.quadraticCurveTo(p.x + p.size, p.y + p.size, p.x + p.size - radius, p.y + p.size);
        ctx.lineTo(p.x + radius, p.y + p.size);
        ctx.quadraticCurveTo(p.x, p.y + p.size, p.x, p.y + p.size - radius);
        ctx.lineTo(p.x, p.y + radius);
        ctx.quadraticCurveTo(p.x, p.y, p.x + radius, p.y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        break;
      default: // circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    if (glow) ctx.shadowBlur = 0; // Reset
  }, []);

  // Animate memoïsé
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true }); // Opti pour lectures
    const particles = particlesRef.current;
    const maxDistance = 150;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update & draw particules (boucle simple)
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      drawShape(ctx, p, shape, glow);
    });

    // Connexions optimisées : limiter à ~10% des paires pour <100 particules (ou subsample pour plus)
    const sampleSize = Math.min(20, particles.length); // Échantillon pour perf
    for (let i = 0; i < particles.length; i += Math.max(1, particles.length / sampleSize)) {
      for (let j = i + 1; j < particles.length; j += Math.max(1, particles.length / sampleSize)) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.hypot(dx, dy); // Plus rapide que sqrt

        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(4, 191, 173, ${1 - distance / maxDistance})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationIdRef.current = requestAnimationFrame(animate);
  }, [shape, glow, drawShape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Init particules
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 4 + 2,
      color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`,
    }));

    animate();

    // Throttled resize (optimisé)
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 100); // Throttle 100ms
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [animate, particleCount]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}

export default ParticlesBackground;


/*
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function ParticlesBackground({ className = 'absolute inset-0 z-0', shape = 'circle' }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 100;
    const maxDistance = 150;

    particles.current = [];
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 2, // Taille pour carré
        color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`, // Bleu/vert
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Dessin selon la forme
        ctx.fillStyle = p.color;
        if (shape === 'square') {
          // Carré arrondi (rectangle soft)
          const radius = p.size / 4; // Coins arrondis
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p.x + radius, p.y);
          ctx.lineTo(p.x + p.size - radius, p.y);
          ctx.quadraticCurveTo(p.x + p.size, p.y, p.x + p.size, p.y + radius);
          ctx.lineTo(p.x + p.size, p.y + p.size - radius);
          ctx.quadraticCurveTo(p.x + p.size, p.y + p.size, p.x + p.size - radius, p.y + p.size);
          ctx.lineTo(p.x + radius, p.y + p.size);
          ctx.quadraticCurveTo(p.x, p.y + p.size, p.x, p.y + p.size - radius);
          ctx.lineTo(p.x, p.y + radius);
          ctx.quadraticCurveTo(p.x, p.y, p.x + radius, p.y);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else {
          // Cercle par défaut
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Connexions (inchangé)
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.strokeStyle = `rgba(4, 191, 173, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [shape]); // Re-run si shape change

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}

export default ParticlesBackground;


*/
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useViewportScroll, useTransform } from 'framer-motion';
import { SiReact, SiTypescript, SiPython, SiRust, SiTensorflow, SiArchlinux } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';

// Glowing Text Component
const GlowingText = ({ children, className, gradient }) => (
  <span className={`relative ${className}`}>
    <span className={`absolute top-0 left-0 -z-10 blur-md ${gradient}`}>{children}</span>
    <span className="relative z-10">{children}</span>
  </span>
);

// Animated Logo Component
const AnimatedLogo = () => {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0066" />
          <stop offset="100%" stopColor="#8a00ff" />
        </linearGradient>
      </defs>
      <motion.path
        d="M50 10 L90 90 L10 90 Z"
        fill="url(#logoGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.svg>
  );
};

// Enhanced Hero Section
const Hero = () => {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 300], [0, -150]);

  const handleExploreClick = () => {
    window.location.href = 'https://github.com/gaurishmehra/The_Gaurika'; // Replace with your GitHub URL
  };

  return (
    <motion.div
      style={{ y }}
      className="relative h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8"
    >
      <AnimatedLogo />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-extrabold"
      >
        <GlowingText gradient="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600">
          Welcome to Voaid
        </GlowingText>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-4 max-w-md mx-auto text-xl sm:text-2xl text-purple-300"
      >
        The Void of AI
      </motion.p>
      <motion.button
        onClick={handleExploreClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-8 py-3 bg-pink-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-pink-700 transition duration-300"
      >
        Explore Our Universe
      </motion.button>
    </motion.div>
  );
};

// Feature Component
const Feature = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-6 bg-purple-900 bg-opacity-60 rounded-lg backdrop-blur-md"
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon className="text-4xl text-pink-400 mb-4" />
      <h3 className="text-xl font-bold text-pink-300 mb-2">{title}</h3>
      <p className="text-center text-purple-200">{description}</p>
    </motion.div>
  );
};

// Features Section
const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const features = [
    { icon: SiReact, title: "React Mastery", description: "Building seamless user interfaces with cutting-edge React techniques." },
    { icon: SiTypescript, title: "TypeScript Experts", description: "Ensuring type-safe and robust code bases for scalable applications." },
    { icon: SiPython, title: "Python Proficiency", description: "Leveraging Python's versatility for efficient backend development and data analysis." },
    { icon: SiRust, title: "Rust Innovation", description: "Harnessing Rust's performance and safety for system-level programming and web assembly." },
    { icon: SiTensorflow, title: "Transformers Expertise", description: "Utilizing state-of-the-art transformers for advanced machine learning and natural language processing." },
    { icon: SiArchlinux, title: "Arch Linux Mastery", description: "Optimizing system performance and customization with Arch Linux." },
  ];
  

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { transition: { staggerChildren: 0.3 } },
        hidden: {},
      }}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        <GlowingText gradient="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
          Our Expertise
        </GlowingText>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <Feature {...feature} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// Testimonial Component
const Testimonial = ({ content, author, role }) => {
  return (
    <motion.div
      className="bg-purple-900 bg-opacity-60 p-6 rounded-lg backdrop-blur-md"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <p className="text-purple-200 mb-4">"{content}"</p>
      <p className="text-pink-300 font-bold">{author}</p>
      <p className="text-purple-400">{role}</p>
    </motion.div>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    { content: "VWatching Voaid come to life has been an epic adventure. It’s been a blast!", author: "Gaurish Mehra", role: "Co Founder" },
    { content: "We’ve put so much into Voaid, and hearing you guys dig it is just the best feeling!", author: "Gunit Kumar", role: "Co Founder" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        <GlowingText gradient="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
          What Our Developers Say
        </GlowingText>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};



// Updated Nebula Background with Metaballs (Optimized)
const NebulaBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];
    let offscreenCanvas, offscreenCtx;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      offscreenCtx = offscreenCanvas.getContext('2d');
      initializeParticles();
    };

    const numParticles = 50;
    const maxSize = 8;
    const maxSpeed = 0.5;
    const connectionDistance = 150;

    const shapes = ['circle', 'square', 'triangle'];

    const getPinkPurpleColor = () => {
      const hue = Math.random() * 60 + 270; // 270-330 range covers pink to purple
      return `hsl(${hue}, 70%, 60%)`;
    };

    const initializeParticles = () => {
      particles = Array.from({ length: numParticles }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * maxSize + 2,
        color: getPinkPurpleColor(),
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        velocity: {
          x: (Math.random() - 0.5) * maxSpeed,
          y: (Math.random() - 0.5) * maxSpeed,
        },
        angle: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      }));
    };

    const updateParticlePosition = (particle) => {
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.angle += particle.rotationSpeed;

      if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;
    };

    const drawParticle = (ctx, particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.angle);
      ctx.fillStyle = particle.color;

      switch (particle.shape) {
        case 'square':
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -particle.size / 2);
          ctx.lineTo(-particle.size / 2, particle.size / 2);
          ctx.lineTo(particle.size / 2, particle.size / 2);
          ctx.closePath();
          ctx.fill();
          break;
        default: // circle
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
      }

      ctx.restore();
    };

    const drawConnections = (ctx) => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const draw = () => {
      offscreenCtx.clearRect(0, 0, canvas.width, canvas.height);

      drawConnections(offscreenCtx);
      particles.forEach(particle => drawParticle(offscreenCtx, particle));
      particles.forEach(updateParticlePosition);

      // Apply blur effect
      ctx.filter = 'blur(4px)';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenCanvas, 0, 0);
      ctx.filter = 'none';

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <NebulaBackground /> 

      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gray-900 bg-opacity-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <GlowingText className="text-2xl font-bold" gradient="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
            Voaid
          </GlowingText>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {['About', 'Developers'].map((item) => (
                <li key={item}>
                  <a href={`/${item}`} className="text-pink-300 hover:text-purple-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-pink-300"
          >
            Menu 
          </motion.button>
        </div>
      </header>

      <main>
        <Hero />
        <Features />
        <Testimonials />
      </main>

      <footer className="bg-gray-900 bg-opacity-80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-300">© 2024 Voaid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
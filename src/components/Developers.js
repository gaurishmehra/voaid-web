import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaDribbble, FaChess } from 'react-icons/fa';
import { SiJavascript, SiReact, SiTypescript, SiGraphql, SiNodedotjs, SiFigma } from 'react-icons/si';

// Nebula Background Component 
const NebulaBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const numParticles = 100;
    const colors = ['#ff006620', '#8a00ff20', '#ff7f0020', '#ff000020']; 

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 60 + 20, 
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 0.5, 
          y: (Math.random() - 0.5) * 0.5
        }
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;

        ctx.shadowBlur = particle.radius;
        ctx.shadowColor = particle.color;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        ctx.shadowBlur = 0;
      });
    }

    animate();

    return () => cancelAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};

// Glowing Text Component
const GlowingText = ({ children, className, gradient }) => (
  <span className={`relative ${className}`}>
    <span className={`absolute top-0 left-0 -z-10 blur-md ${gradient}`}>{children}</span>
    <span className="relative z-10">{children}</span>
  </span>
);

// Enhanced Developer Card Component with Tilt Effect
const DeveloperCard = ({ name, role, bio, socials, skills, projects }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = cardRef.current;

    const x = (clientX - offsetLeft - offsetWidth / 2) / (offsetWidth / 2);
    const y = (clientY - offsetTop - offsetHeight / 2) / (offsetHeight / 2);

    controls.start({
      rotateX: y * 5,
      rotateY: -x * 5,
      scale: 1.05,
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl backdrop-blur-md bg-gray-900 bg-opacity-80 border border-pink-500 border-opacity-30 p-4 transform transition duration-500 perspective-1000 sm:p-6" 
      initial="idle"
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 opacity-50"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isHovered ? 0.5 : 0.3 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10 p-4 sm:p-8"> 
        <GlowingText
          className="text-3xl sm:text-4xl font-extrabold mb-2"
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600"
        >
          {name}
        </GlowingText>
        <motion.h3 className="text-xl sm:text-2xl text-pink-300 mb-3 sm:mb-4">{role}</motion.h3>
        <motion.p className="text-sm sm:text-base mb-4 sm:mb-6 text-gray-300">{bio}</motion.p>

        <div className="flex space-x-3 sm:space-x-4 mb-4 sm:mb-6">
          {Object.entries(socials).map(([platform, username]) => (
            <motion.a
              key={platform}
              href={`https://${platform}.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="text-xl sm:text-2xl text-pink-400 hover:text-purple-400 transition-colors duration-300"
            >
              {platform === 'github' && <FaGithub />}
              {platform === 'twitter' && <FaTwitter />}
              {platform === 'linkedin' && <FaLinkedin />}
              {platform === 'dribbble' && <FaDribbble />}
              {platform === 'chess' && <FaChess />}
            </motion.a>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              className="bg-pink-900 bg-opacity-50 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-pink-200 transform transition duration-300 hover:scale-110"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-2" 
            >
              <h4 className="text-lg sm:text-xl font-semibold text-purple-300 mb-2 sm:mb-3">Recent Projects</h4>
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="mb-2 sm:mb-4 last:mb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h5 className="text-base sm:text-lg font-medium text-pink-200">{project.name}</h5>
                  <p className="text-xs sm:text-sm text-gray-400">{project.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};


// Particle System Component - Enhanced with Trails
const ParticleSystem = () => {
  const particlesRef = useRef([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 100;
    const particleProps = {
      x: { min: 0, max: canvas.width },
      y: { min: 0, max: canvas.height },
      size: { min: 0.5, max: 2 },
      speed: { min: 0.1, max: 0.3 },
      color: ['#ff006685', '#8a00ff85', '#008aff85']
    };

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * (particleProps.x.max - particleProps.x.min) + particleProps.x.min,
        y: Math.random() * (particleProps.y.max - particleProps.y.min) + particleProps.y.min,
        size: Math.random() * (particleProps.size.max - particleProps.size.min) + particleProps.size.min,
        speedX: (Math.random() - 0.5) * (particleProps.speed.max - particleProps.speed.min) + particleProps.speed.min,
        speedY: (Math.random() - 0.5) * (particleProps.speed.max - particleProps.speed.min) + particleProps.speed.min,
        color: particleProps.color[Math.floor(Math.random() * particleProps.color.length)]
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />; 
};

// Main Developers Component
const Developers = () => {
  const [activeSection, setActiveSection] = useState('team');

  const developers = [
    {
      name: "Gaurish Mehra",
      role: "Co Founder",
      bio: "https://gaurish.xyz",
      socials: {
        github: "mehragaurish",
        twitter: "gaurishmehra",
        // linkedin: "in/ariachen",
        // dribbble: "ariachen"
        chess: "mehragaurish"
      },
      skills: ["React", "TypeScript", "Java", "Rust", "Python", "Transformers"],
      projects: [
        { name: "The Voaid (Server Side)", description: "The brain of the voaid project" },
        { name: "Gaurika Linux", description: "An AI powered linux assistant" },
        { name: "gaurish.xyz", description: "My website." },
        { name: "voaid.gaurish.xyz", description: "This website." }
      ]
    },
    {
      name: "Gunit Kumar",
      role: "Founder",
      bio: "Alive.",
      socials: {
        github: "godskull",
        twitter: "fexanottaken",
      },
      skills: ["Python", "Databases", "Nextjs", "Rust", "TensorFlow"],
      projects: [
        { name: "The Voaid (Client Side)", description: "The beauty of the voaid project" },
        { name: "WebRagTool", description: "An AI powered Rag-based web scrapper and crawler" }
      ]
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gray-900 bg-opacity-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <GlowingText className="text-2xl font-bold" gradient="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
           Voaid
          </GlowingText>
          <nav>
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
        </div>
      </header>

      <NebulaBackground /> 
      <ParticleSystem />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-7xl mx-auto text-center mt-24 pt-16 mb-12 sm:mb-20 relative z-10" 
      >
        <GlowingText
          className="text-5xl sm:text-7xl font-extrabold mb-4 sm:mb-6"
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600"
        >
          Voaid
        </GlowingText>
        <p className="text-lg sm:text-2xl text-purple-300 max-w-3xl mx-auto">
          We finally made it!
        </p>
      </motion.div>

      {/* Navigation (adjust margins for header) */}
      <nav className="max-w-2xl mx-auto mb-12 sm:mb-16 relative z-10">
        <ul className="flex justify-around space-x-4">
          {['team','vision'].map((section) => (
            <motion.li
              key={section}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setActiveSection(section)}
                className={`text-base sm:text-lg font-medium px-4 sm:px-6 py-2 rounded-full transition-colors duration-300
                  ${activeSection === section
                    ? 'bg-pink-700 text-white shadow-md'
                    : 'bg-purple-900 text-pink-300 hover:shadow-md'
                  }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="max-w-7xl mx-auto relative z-10"
        >
          {activeSection === 'team' && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12" 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {developers.map((dev, index) => (
                <motion.div
                  key={dev.name}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <DeveloperCard {...dev} index={index} />
                </motion.div>
              ))}
            </motion.div>
          )}
          {activeSection === 'vision' && (
            <motion.div
              className="text-center space-y-6 sm:space-y-8" 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <GlowingText className="text-3xl sm:text-4xl font-bold text-pink-400">
                Open Source is the way to go!
              </GlowingText>
              <p className="text-base sm:text-xl text-purple-300 max-w-3xl mx-auto">
                We envision a future where technology is accessible to all, and where developers can collaborate freely to build a better world.
              </p>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12" 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
              >
                {[
                  { icon: "🚀", title: "Innovation", description: "Constantly pushing the boundaries of what's possible in tech." },
                  { icon: "🌍", title: "Global Impact", description: "Creating solutions that positively affect lives worldwide." },
                  { icon: "🤝", title: "Collaboration", description: "Fostering a culture of open exchange and mutual growth." }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-purple-900 bg-opacity-60 p-4 sm:p-6 rounded-lg backdrop-blur-md transform transition duration-500 hover:scale-105"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-pink-300 mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Developers;
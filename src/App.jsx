import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Background from './components/Background';
import Section from './components/Section';
import ReasonsSection from './components/ReasonsSection';
import BreathingSpace from './components/BreathingSpace';

// 1. UPDATED: The Magic Explosion Finale (Optimized for Mobile & Repeatable)
const MagicExplosion = ({ burstId }) => {
  // Fewer particles on mobile, but enough to look magical
  const particles = Array.from({ length: 60 });
  return (
    <div key={burstId} className="fixed inset-0 pointer-events-none z-[300] overflow-hidden flex items-center justify-center">
      {/* Background Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-pink-500/20 mix-blend-screen will-change-[opacity]"
      />

      {particles.map((_, i) => {
        const isHeart = Math.random() > 0.4;
        const size = isHeart ? 15 + Math.random() * 25 : 4 + Math.random() * 8;
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 800; // Explode far outwards
        const duration = 1.5 + Math.random() * 2;
        const delay = Math.random() * 0.1;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance + (Math.random() * 100 - 50) // Slight gravity variation
            }}
            transition={{ duration, delay, ease: [0.23, 1, 0.32, 1] }} // Decelerating cubic bezier
            className={`absolute ${isHeart ? 'text-pink-500' : 'bg-white rounded-full'}`}
            style={{
              fontSize: isHeart ? `${size}px` : undefined,
              width: !isHeart ? `${size}px` : undefined,
              height: !isHeart ? `${size}px` : undefined,
              willChange: "transform, opacity", // Hardware acceleration for mobile smoothness
              // Removed heavy drop-shadow filter on 100 particles to fix mobile lag
              ...(isHeart ? { textShadow: "0px 0px 5px rgba(236,72,153,0.5)" } : {})
            }}
          >
            {isHeart ? '❤️' : ''}
          </motion.div>
        );
      })}
    </div>
  );
};


// 2. NEW: The Scroll-Synced Thanos Dissolve Component
const ScrollThanosText = ({ children }) => {
  const ref = useRef(null);

  // Tracks exactly where this specific text block is on the screen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 25%"]
  });

  // Maps the scroll progress to opacity, blur, scale, and vertical movement
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.9], [0, 1, 1, 0]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 0.9],
    ["blur(10px) brightness(2)", "blur(0px) brightness(1)", "blur(0px) brightness(1)", "blur(12px) brightness(2)"]
  );
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.9], [0.9, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.9], [40, 0, 0, -60]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, filter, scale, y, willChange: "transform, opacity, filter" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// 3. NEW: The Ambient Breathing Glow
const AmbientGlow = () => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-50 will-change-[transform,opacity]"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full bg-apology-accent/10 blur-[80px]" />
    </motion.div>
  );
};

const SECTION_CONTENT = [
  "My luv",
  "I know words might not be enough right now.",
  "But I need you to know how deeply sorry I am for hurting you.",
  "I was wrong, and I hurt you I lost my temper.",
  "You mean everything to me Like everything.",
  "Please... can you find it in your heart to forgive me Ayla :/ ?"
];

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [heartClickCount, setHeartClickCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const startExperience = () => {
    setIsStarted(true);
    if (audioRef.current) {
      // 1. Set the volume to a comfortable, dreamy level
      audioRef.current.volume = 0.5;

      // 2. Skip directly to the female vocal bridge (2:28)
      audioRef.current.currentTime = 3;

      // 3. Play the music!
      audioRef.current.play().catch(err => {
        console.error("Music error! Make sure sorry.mp3 is inside the 'public' folder.", err);
      });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <main className="relative w-full">
      {/* Audio Player */}
      <audio ref={audioRef} src="/sorry.mp3" loop />

      {/* Floating Music Controller */}
      {isStarted && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-[150] flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg text-white hover:bg-white/20 transition-all cursor-pointer pointer-events-auto"
        >
          {isMuted ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          )}
        </motion.button>
      )}

      {/* The Magical Loader */}
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-apology-dark flex flex-col items-center justify-center p-6"
          >
            {/* Ambient Entrance Glow */}
            <motion.div
              className="absolute w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] rounded-full bg-apology-accent/5 blur-[120px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="font-serif italic text-apology-light/60 mb-10 text-lg tracking-wide z-10"
            >
              For you, with all my heart...
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              className="z-10 group relative"
            >
              <button
                onClick={startExperience}
                className="relative overflow-hidden px-12 py-5 rounded-full border border-apology-accent/30 text-white font-serif text-xl cursor-pointer pointer-events-auto shadow-[0_0_20px_rgba(196,181,253,0.15)] hover:shadow-[0_0_40px_rgba(196,181,253,0.4)] hover:border-apology-accent/60 transition-all duration-700 bg-black/20 backdrop-blur-xl"
              >
                {/* Sweeping Light Effect */}
                <span className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 ease-out group-hover:translate-x-[150%]" />
                <span className="relative z-10 tracking-widest text-shadow-sm">
                  Open Message
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main 3D & Text Content */}
      <div className={isStarted ? "opacity-100 transition-opacity duration-[2000ms]" : "opacity-0 pointer-events-none"}>
        <Background />
        {isStarted && <AmbientGlow />}

        <div className="relative z-10 w-full flex flex-col items-center pointer-events-none">
          {SECTION_CONTENT.map((text, index) => (
            <Section key={index}>
              <div className="glass-text-container pointer-events-auto">
                {/* 3. NEW: The text is now wrapped in our custom Thanos component */}
                <ScrollThanosText>
                  <h2 className="text-3xl md:text-5xl leading-tight text-white love-text">
                    {text}
                  </h2>
                </ScrollThanosText>
              </div>
            </Section>
          ))}

          {/* New Interactive Reasons Section placed right before the end */}
          <ReasonsSection />

          {/* The New Breathing Space Section */}
          <BreathingSpace />

          {/* Final I Love You Section */}
          <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-[30vh] pb-[15vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative pointer-events-auto group"
            >
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500 opacity-40 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.button
                onClick={() => setHeartClickCount(prev => prev + 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center gap-4 px-10 py-5 rounded-full bg-black/20 border border-white/30 backdrop-blur-xl shadow-2xl overflow-hidden cursor-pointer pointer-events-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]" />
                <span className="relative z-10 text-white font-serif text-3xl md:text-4xl tracking-wider text-shadow-sm">
                  I Love You
                </span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 1] }}
                  className="relative z-10 inline-block text-pink-400 text-3xl drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
                >
                  ❤️
                </motion.span>
              </motion.button>
            </motion.div>
          </section>
        </div>
      </div>

      {heartClickCount > 0 && <MagicExplosion burstId={heartClickCount} />}
    </main>
  );
}
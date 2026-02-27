import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const MESSAGES = [
    "You are my favorite part of every single day ❤️.",
    "If I had a single flower for every time I thought of you, I could walk in my garden forever.",
    "Forget Amortentia... your laugh is the only real love potion I need.",
    "I was going to write a joke here, but I got distracted thinking about how pretty you are ;) ",
    "I promise to spend every day making sure you know how loved you are.",
    "If I had a Time-Turner, I'd slap tf out of myself for what I did :/",
    "100 points to hufflepuff for having the most beautiful smile in the world! ❤️",
    "I love you with all my heart. And also my brain, my lungs, and my stomach.",
    "You're the magic to my Muggle life. ⚡"
];

export default function BreathingSpace() {
    const containerRef = useRef(null);
    const [isCaught, setIsCaught] = useState(false);
    const [message, setMessage] = useState("");
    const [snitchPos, setSnitchPos] = useState({ x: 0, y: 0 });
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    // Track scroll progress through this specific 200vh section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [0, 1, 1, 0]
    );

    // Initial window size
    useEffect(() => {
        setWindowSize(() => ({
            width: window.innerWidth,
            height: window.innerHeight
        }));

        const handleResize = () => {
            setWindowSize(() => ({
                width: window.innerWidth,
                height: window.innerHeight
            }));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Randomize snitch position every 2 seconds if not caught
    useEffect(() => {
        if (isCaught || windowSize.width === 0) return;

        const moveSnitch = () => {
            // Keep it within a reasonable central bound so they can actually catch it
            const maxX = (windowSize.width / 2) * 0.8;
            const maxY = (windowSize.height / 2) * 0.8;

            setSnitchPos({
                x: (Math.random() * 2 - 1) * maxX,
                y: (Math.random() * 2 - 1) * maxY
            });
        };

        moveSnitch();
        const interval = setInterval(moveSnitch, 1500 + Math.random() * 1000); // 1.5 to 2.5 seconds

        return () => clearInterval(interval);
    }, [isCaught, windowSize]);

    const handleCatch = () => {
        if (isCaught) return;
        setIsCaught(true);
        const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        setMessage(randomMsg);
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[200vh] z-10"
        >
            <motion.div
                style={{ opacity }}
                className="fixed inset-0 flex items-center justify-center pointer-events-none"
            >
                {/* Soft purple vignette effect that surrounds the edges of the screen */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(88,28,135,0.4)_70%,rgba(15,23,42,0.8)_100%)] pointer-events-none" />

                {/* The Golden Snitch & Message Container */}
                <AnimatePresence>
                    {isCaught && (
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md pointer-events-auto"
                            onClick={() => setIsCaught(false)}
                        />
                    )}

                    {!isCaught ? (
                        <motion.button
                            key="snitch"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: snitchPos.x,
                                y: snitchPos.y,
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 50,
                                damping: 20,
                                x: { duration: 1.5, ease: "easeInOut" },
                                y: { duration: 1.5, ease: "easeInOut" }
                            }}
                            onClick={handleCatch}
                            className="absolute z-50 pointer-events-auto cursor-pointer group"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="relative flex items-center justify-center">
                                {/* Snitch Body */}
                                <div className="w-6 h-6 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)] z-10" />

                                {/* Left Wing */}
                                <motion.div
                                    animate={{ rotateZ: [-20, 20, -20] }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                    className="absolute right-4 w-8 h-3 bg-white/60 blur-[1px] rounded-[100%] origin-right"
                                />

                                {/* Right Wing */}
                                <motion.div
                                    animate={{ rotateZ: [20, -20, 20] }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                    className="absolute left-4 w-8 h-3 bg-white/60 blur-[1px] rounded-[100%] origin-left"
                                />
                            </div>
                        </motion.button>
                    ) : (
                        <motion.div
                            key="message-container"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4"
                        >
                            <div className="relative flex flex-col items-center max-w-sm w-full pointer-events-auto">
                                {/* Static Snitch Avatar Centered */}
                                <div className="relative flex items-center justify-center shrink-0 mb-6 shrink-0 z-10">
                                    <div className="w-12 h-12 rounded-full bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.8)]" />
                                    {/* Left Wing Static */}
                                    <div className="absolute right-8 w-10 h-4 bg-white/60 blur-[1px] rounded-[100%] origin-right -rotate-12" />
                                    {/* Right Wing Static */}
                                    <div className="absolute left-8 w-10 h-4 bg-white/60 blur-[1px] rounded-[100%] origin-left rotate-12" />
                                </div>

                                {/* WhatsApp Style White Bubble Centered */}
                                <div
                                    className="relative bg-[#ffffff] text-[#111b21] px-5 pt-4 pb-8 shadow-2xl w-full rounded-2xl rounded-tr-sm text-center"
                                >
                                    {/* Tail Effect Pointing up to Snitch */}
                                    <div
                                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#ffffff]"
                                        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                                    />

                                    <p className="text-[16px] font-sans leading-[24px] break-words">
                                        {message}
                                    </p>

                                    <div className="absolute bottom-2 right-4 text-[12px] text-gray-400">
                                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsCaught(false);
                                        }}
                                        className="px-8 py-3 rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md shadow-lg hover:bg-white/20 hover:scale-105 transition-all text-sm tracking-wider uppercase drop-shadow-md"
                                    >
                                        Release Snitch
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Floating fireflies/dust effect
const Fireflies = () => {
    const [fireflies, setFireflies] = useState([]);

    useEffect(() => {
        // Generate fireflies only on client side
        const newFireflies = Array.from({ length: 40 }).map(() => ({
            id: Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5
        }));
        setFireflies(newFireflies);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {fireflies.map((firefly) => (
                <motion.div
                    key={firefly.id}
                    className="absolute rounded-full bg-apology-accent/60 blur-[1px]"
                    style={{
                        width: firefly.size,
                        height: firefly.size,
                        left: `${firefly.x}%`,
                        top: `${firefly.y}%`,
                    }}
                    animate={{
                        y: ["0%", "-100%", "50%", "0%"],
                        x: ["0%", "50%", "-50%", "0%"],
                        opacity: [0, 0.8, 0.2, 0.8, 0],
                        scale: [0, 1.5, 0.5, 1, 0]
                    }}
                    transition={{
                        duration: firefly.duration,
                        repeat: Infinity,
                        delay: firefly.delay,
                        ease: "easeInOut",
                        times: [0, 0.25, 0.5, 0.75, 1]
                    }}
                />
            ))}
        </div>
    );
};

export default function Background() {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-apology-dark/90 overflow-hidden">
            <Fireflies />

            {/* Normal unscaled wrapper so Spline handles its own responsive resizing naturally */}
            <div className="w-full h-full relative z-10">
                <Spline
                    scene="https://prod.spline.design/GDR8q1V34Y5UDhPi/scene.splinecode"
                    className="w-full h-full"
                />
            </div>
            {/* Soft dark vignette gradient to make pure white text pop over the flower */}
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-apology-dark/40 via-transparent to-apology-dark/80 mix-blend-multiply pointer-events-none" />
        </div>
    );
}
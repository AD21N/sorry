import { motion } from 'framer-motion';

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9],
        },
    },
};

export default function AnimatedText({
    text,
    className = '',
    once = false,
}) {
    return (
        <motion.span
            className={`inline-block ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-10% 0px -10% 0px" }} // Trigger slightly before fully in view
            transition={{ staggerChildren: 0.04 }}
            aria-label={text}
        >
            {text.split(' ').map((word, wordIndex) => (
                <span className="inline-block" key={`${word}-${wordIndex}`}>
                    {word.split('').map((char, charIndex) => (
                        <motion.span
                            variants={defaultAnimations}
                            className="inline-block"
                            key={`${char}-${charIndex}`}
                        >
                            {char}
                        </motion.span>
                    ))}
                    <span className="inline-block">&nbsp;</span>
                </span>
            ))}
        </motion.span>
    );
}

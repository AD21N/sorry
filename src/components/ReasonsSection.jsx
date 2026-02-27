import { motion } from 'framer-motion';

const reasons = [
    {
        title: "Your Smile",
        text: "It lights up my darkest days and makes everything feel right in the world."
    },
    {
        title: "Your Heart",
        text: "So pure and full of love. I never want to be the reason it hurts."
    },
    {
        title: "Your Soul",
        text: "Beautiful, kind, and exactly what I need. You are my home."
    }
];

export default function ReasonsSection() {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 pointer-events-none z-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-16 pointer-events-auto"
            >
                <h3 className="font-serif italic text-3xl md:text-5xl text-white text-shadow-md mb-4 love-text">
                    Why You're Special
                </h3>
                <p className="text-white/70 text-lg">Just a few of the million reasons...</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-8 px-4 max-w-4xl w-full pointer-events-auto items-center">
                {reasons.map((reason, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        viewport={{ once: true, margin: "-50px" }}
                        whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
                        className={`w-full rounded-3xl p-4 md:p-8 bg-black/20 border border-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:border-apology-accent/50 hover:shadow-[0_0_40px_rgba(196,181,253,0.3)] transition-all duration-500 flex flex-col items-center text-center group ${index === reasons.length - 1 ? 'col-span-2 mx-auto max-w-sm' : ''}`}
                        style={{ perspective: 1000 }}
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                            <span className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">✨</span>
                        </div>
                        <h4 className="text-2xl font-serif text-white mb-4 tracking-wide group-hover:text-apology-light transition-colors">{reason.title}</h4>
                        <p className="text-white/60 leading-relaxed font-light">{reason.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

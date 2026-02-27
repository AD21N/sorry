import { motion } from 'framer-motion';

export default function Section({ children, className = '' }) {
    return (
        <motion.section
            className={`relative min-h-[35vh] w-full flex items-center justify-center px-6 py-12 snap-center ${className}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={{ amount: 0.5, margin: "-20% 0px -20% 0px" }} // Fade in when 50% visible
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            {/* We apply a subtle fade out when leaving using standard whileInView/initial properties, 
          but Framer Motion's whileInView automatically reverses to initial state when out of view 
          unless `once: true` is set. */}
            {children}
        </motion.section>
    );
}

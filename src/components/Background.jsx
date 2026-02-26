import Spline from '@splinetool/react-spline';

export default function Background() {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-apology-dark/90 overflow-hidden">
            {/* Normal unscaled wrapper so Spline handles its own responsive resizing naturally */}
            <div className="w-full h-full">
                <Spline
                    scene="https://prod.spline.design/GDR8q1V34Y5UDhPi/scene.splinecode"
                    className="w-full h-full"
                />
            </div>
            {/* Soft dark vignette gradient to make pure white text pop over the flower */}
            <div className="absolute inset-0 bg-gradient-to-b from-apology-dark/40 via-transparent to-apology-dark/80 mix-blend-multiply pointer-events-none" />
        </div>
    );
}
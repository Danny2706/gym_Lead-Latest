import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  function closeMenu(event: MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <section
      id="home"
      className="relative h-screen flex scroll-mt-20 items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1761971975769-97e598bf526b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBpbnRlcmlvciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzE0MzAxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Modern Gym Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 max-w-4xl mx-auto"
        >
          Transform Your Body, Transform Your Life
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200"
        >
          Join the premier fitness center where your goals become reality.
          Expert trainers, state-of-the-art equipment, and a community that
          motivates.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#contact" onClick={closeMenu}>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
            >
              Book Your Free Session
            </Button>
          </a>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-black hover:bg-white hover:text-black px-8 py-6 text-lg"
          >
            View Classes
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
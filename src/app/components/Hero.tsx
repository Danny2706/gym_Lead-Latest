import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, CheckCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
          alt="Modern Gym Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-red-950/80 dark:from-black/95 dark:via-black/80 dark:to-red-950/90" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-red-600/10 dark:bg-red-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-red-600/10 dark:bg-red-600/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6"
        >
          <span className="inline-block px-6 py-3 bg-red-600/20 border border-red-500 text-red-400 rounded-full text-sm backdrop-blur-sm">
            🔥 Premium Fitness Center - Transform Your Life Today
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 max-w-4xl mx-auto leading-tight"
        >
          Transform Your Body,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            Transform Your Life
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200 leading-relaxed"
        >
          Join the premier fitness center where your goals become reality.
          Expert trainers, state-of-the-art equipment, and a community that
          motivates you every step of the way.
        </motion.p>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mb-10 text-gray-200"
        >
          {[
            "Certified Trainers",
            "50+ Classes Weekly",
            "24/7 Access",
            "Nutrition Support",
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-red-500" />
              <span>{feature}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#contact">
            <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-7 text-lg shadow-2xl hover:shadow-red-600/50 transition-all duration-300 hover:scale-105"
          >
            Start Free Trial
          </Button>
          </a>
          
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-black dark:text-white hover:bg-white hover:text-black px-10 py-7 text-lg shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm gap-2"
          >
            <Play className="w-5 h-5" />
            Watch Video
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 pt-16 border-t border-white/20"
        >
          <div>
            <div className="text-5xl mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              2,500+
            </div>
            <div className="text-gray-300">Active Members</div>
          </div>
          <div>
            <div className="text-5xl mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              15+
            </div>
            <div className="text-gray-300">Expert Trainers</div>
          </div>
          <div>
            <div className="text-5xl mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              10k+
            </div>
            <div className="text-gray-300">Success Stories</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

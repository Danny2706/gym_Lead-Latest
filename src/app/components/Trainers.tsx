import { motion } from "motion/react";
import { Award, Instagram, Linkedin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const trainers = [
  {
    name: "Marcus Johnson",
    role: "Head Strength Coach",
    specialty: "Powerlifting & Bodybuilding",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    certifications: "NASM-CPT, CSCS",
    experience: "12 years",
  },
  {
    name: "Sarah Williams",
    role: "Yoga & Wellness Director",
    specialty: "Yoga & Mindfulness",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    certifications: "RYT-500, E-RYT",
    experience: "10 years",
  },
  {
    name: "David Chen",
    role: "HIIT Specialist",
    specialty: "High-Intensity Training",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",
    certifications: "ACE-CPT, TRX",
    experience: "8 years",
  },
  {
    name: "Emily Rodriguez",
    role: "Nutrition Expert",
    specialty: "Sports Nutrition & Diet",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    certifications: "RD, CSSD",
    experience: "9 years",
  },
];

export function Trainers() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-red-600 dark:text-red-500 uppercase tracking-wider text-sm mb-2 block">
            Expert Team
          </span>
          <h2 className="text-gray-900 dark:text-white mb-4">
            Meet Your Trainers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Our certified professionals are dedicated to helping you achieve
            your fitness goals
          </p>
        </motion.div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-500 hover:-translate-y-2">
                {/* Image */}
                <div className="relative overflow-hidden h-72">
                  <ImageWithFallback
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-3 justify-center">
                        <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                          <Instagram className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Certified
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl mb-1 text-gray-900 dark:text-white">
                    {trainer.name}
                  </h3>
                  <div className="text-red-600 dark:text-red-500 mb-2">
                    {trainer.role}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {trainer.specialty}
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        Certifications:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {trainer.certifications}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Experience:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {trainer.experience}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

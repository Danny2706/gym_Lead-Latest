import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, Users, TrendingUp, Calendar } from "lucide-react";
import { Button } from "./ui/button";

const classes = [
  {
    title: "HIIT Training",
    description:
      "High-intensity intervals to maximize fat burn and build endurance in minimal time.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    duration: "45 min",
    level: "All Levels",
    spots: 15,
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Yoga & Mindfulness",
    description:
      "Improve balance, flexibility, and mindfulness through guided yoga practice.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    duration: "60 min",
    level: "Beginner",
    spots: 20,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Strength & Power",
    description:
      "Build muscle and increase power with expert-led strength sessions and Olympic lifts.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    duration: "50 min",
    level: "Intermediate",
    spots: 12,
    color: "from-red-600 to-red-700",
  },
  {
    title: "Spin & Cycle",
    description:
      "High-energy cycling workouts with motivating music and challenging resistance.",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
    duration: "45 min",
    level: "All Levels",
    spots: 25,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Boxing & Combat",
    description:
      "Learn technique while burning calories with boxing and kickboxing combinations.",
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80",
    duration: "60 min",
    level: "Intermediate",
    spots: 18,
    color: "from-red-700 to-orange-600",
  },
  {
    title: "Pilates Core",
    description:
      "Strengthen your core and improve posture with controlled Pilates movements.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    duration: "55 min",
    level: "All Levels",
    spots: 15,
    color: "from-teal-500 to-green-600",
  },
];

export function Classes() {
  return (
    <section id="classes" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-red-600 dark:text-red-500 uppercase tracking-wider text-sm mb-2 block">
            Class Schedule
          </span>
          <h2 className="mb-4 text-gray-900 dark:text-white">
            Fitness Classes For Everyone
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Choose from 50+ weekly classes designed to meet your fitness needs.
            From beginners to advanced athletes, we have something for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-500 bg-white dark:bg-gray-800"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div
                    className={`bg-gradient-to-r ${classItem.color} text-white px-3 py-1 rounded-full text-sm flex items-center gap-1`}
                  >
                    <Clock className="w-3 h-3" />
                    {classItem.duration}
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm">
                    {classItem.level}
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-2xl mb-1">
                    {classItem.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {classItem.description}
                </p>

                {/* Class Info */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{classItem.spots} spots</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Popular</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Class
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-6 text-lg"
          >
            View Full Schedule
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

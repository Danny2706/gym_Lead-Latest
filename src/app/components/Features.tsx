import {
  Dumbbell,
  Users,
  Clock,
  Trophy,
  Heart,
  Target,
  Award,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Dumbbell,
    title: "Premium Equipment",
    description:
      "State-of-the-art machines and free weights for all fitness levels.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Users,
    title: "Expert Trainers",
    description:
      "Certified professionals dedicated to helping you reach your goals.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description: "Work out on your schedule with round-the-clock gym access.",
    color: "from-red-600 to-red-700",
  },
  {
    icon: Trophy,
    title: "Results Driven",
    description: "Proven programs that deliver real, measurable results.",
    color: "from-red-500 to-orange-600",
  },
  {
    icon: Heart,
    title: "Wellness Programs",
    description:
      "Holistic approach to health including nutrition and recovery.",
    color: "from-pink-500 to-red-500",
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Advanced tools to monitor progress and celebrate milestones.",
    color: "from-red-600 to-pink-600",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    description: "Award-winning facility with industry recognition.",
    color: "from-orange-600 to-red-600",
  },
  {
    icon: Zap,
    title: "High Energy",
    description: "Motivating atmosphere that pushes you to your best.",
    color: "from-red-500 to-red-700",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-red-600 dark:text-red-500 uppercase tracking-wider text-sm mb-2 block">
            Premium Features
          </span>
          <h2 className="mb-4 text-gray-900 dark:text-white">
            Why Choose FitLife Gym
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to succeed in your fitness journey, all under
            one roof. Experience the difference of a truly premium fitness
            facility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent dark:from-red-950/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} text-white rounded-xl mb-6 shadow-lg group-hover:shadow-xl`}
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="mb-3 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

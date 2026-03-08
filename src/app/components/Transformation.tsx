import { motion } from "motion/react";
import { TrendingDown, Award, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const transformations = [
  {
    name: "John Smith",
    achievement: "Lost 45 lbs in 4 months",
    before:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
    after:
      "https://images.unsplash.com/photo-1623874514711-0f321325f318?w=400&q=80",
    duration: "4 months",
    program: "Weight Loss Program",
  },
  {
    name: "Maria Garcia",
    achievement: "Gained 15 lbs muscle",
    before:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
    after:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&q=80",
    duration: "6 months",
    program: "Muscle Building Program",
  },
  {
    name: "David Lee",
    achievement: "Marathon Ready",
    before:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&q=80",
    after:
      "https://images.unsplash.com/photo-1623874514711-0f321325f318?w=400&q=80",
    duration: "5 months",
    program: "Endurance Training",
  },
];

export function Transformations() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
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
            Success Stories
          </span>
          <h2 className="text-gray-900 dark:text-white mb-4">
            Real Transformations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            See the incredible results our members have achieved with dedication
            and expert guidance
          </p>
        </motion.div>

        {/* Transformations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((transformation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-500 group"
            >
              {/* Before/After Images */}
              <div className="grid grid-cols-2 h-64">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={transformation.before}
                    alt={`${transformation.name} before`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                    Before
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={transformation.after}
                    alt={`${transformation.name} after`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs">
                    After
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl mb-2 text-gray-900 dark:text-white">
                  {transformation.name}
                </h3>
                <div className="flex items-center gap-2 text-red-600 mb-4">
                  <TrendingDown className="w-5 h-5" />
                  <span className="font-semibold">
                    {transformation.achievement}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Duration: {transformation.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Award className="w-4 h-4" />
                    <span>{transformation.program}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">Success Rate</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full"
                    />
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

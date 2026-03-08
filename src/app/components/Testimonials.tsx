import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Lost 30 lbs",
    content:
      "This gym changed my life! The trainers are amazing and the community is so supportive. I've never felt stronger or more confident.",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Marathon Runner",
    content:
      "The facilities are top-notch and the training programs are perfectly tailored to my goals. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Yoga Enthusiast",
    content:
      "From yoga to strength training, this gym has it all. The variety of classes keeps me motivated and engaged.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-red-600 dark:text-red-500 uppercase tracking-wider text-sm mb-2 block">
            Testimonials
          </span>
          <h2 className="mb-4 text-gray-900 dark:text-white">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from members who've transformed their lives with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-500"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-red-600 text-red-600" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div>
                <div className="text-gray-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-red-600 dark:text-red-500 text-sm">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

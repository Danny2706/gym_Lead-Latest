import { motion } from "motion/react";
import { CheckCircle, Home, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

export function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 flex items-center justify-center px-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300"
      >
        {/* Success Icon */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block"
          >
            <CheckCircle className="w-24 h-24 text-white mx-auto" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-3xl font-bold text-gray-900 dark:text-white"
          >
            Thank You!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Your message has been successfully received. We're excited to help
            you start your fitness journey!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 transition-colors duration-300"
          >
            <h3 className="mb-4 text-gray-900 dark:text-white text-xl font-semibold">
              What's Next?
            </h3>
            <div className="space-y-4 text-left">
              {[
                {
                  number: 1,
                  title: "We'll Review Your Message",
                  desc: "Our team will carefully read your inquiry within 24 hours.",
                },
                {
                  number: 2,
                  title: "Personal Response",
                  desc: "A fitness consultant will reach out to discuss your goals and answer questions.",
                },
                {
                  number: 3,
                  title: "Get Started",
                  desc: "Schedule a free tour and consultation at our facility.",
                },
              ].map((step) => (
                <div key={step.number} className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-700 text-red-600 dark:text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <span>{step.number}</span>
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>{step.title}</strong> - {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-6 transition-colors duration-300"
              onClick={() => navigate("/")}
            >
              <Calendar className="w-5 h-5 mr-2" />
              View Class Schedule
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-gray-600 dark:text-gray-300">
              Have an urgent question? Call us at{" "}
              <a
                href="tel:5551234567"
                className="text-red-600 dark:text-red-500 hover:underline"
              >
                (555) 123-4567
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

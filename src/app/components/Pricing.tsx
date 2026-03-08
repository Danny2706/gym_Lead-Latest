import { Check, Star, Zap, Crown } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "Access to gym equipment",
      "Locker room & showers",
      "Basic fitness assessment",
      "Mobile app access",
      "Open gym hours",
    ],
    popular: false,
    icon: Star,
    color: "from-gray-600 to-gray-700",
  },
  {
    name: "Pro",
    price: "$59",
    period: "/month",
    description: "Most popular choice",
    features: [
      "Everything in Basic",
      "Unlimited group classes",
      "Personal trainer (2x/month)",
      "Nutrition guidance",
      "Priority booking",
      "Free guest passes (2/month)",
    ],
    popular: true,
    icon: Zap,
    color: "from-red-600 to-red-700",
  },
  {
    name: "Elite",
    price: "$99",
    period: "/month",
    description: "Premium experience",
    features: [
      "Everything in Pro",
      "Personal trainer (8x/month)",
      "Custom meal plans",
      "Recovery services",
      "Guest passes (4x/month)",
      "VIP lounge access",
      "24/7 gym access",
    ],
    popular: false,
    icon: Crown,
    color: "from-amber-600 to-orange-600",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
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
            Flexible Pricing
          </span>
          <h2 className="mb-4 text-gray-900 dark:text-white">
            Choose Your Membership Plan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Select the plan that fits your lifestyle and fitness goals. All
            plans include no joining fees and can be cancelled anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border ${
                plan.popular
                  ? "ring-2 ring-red-600 scale-105 border-red-200 shadow-2xl"
                  : "border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-500"
              } group`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.5, delay: 0.3 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full text-sm shadow-lg"
                >
                  ⚡ Most Popular
                </motion.div>
              )}

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.color} text-white rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <plan.icon className="w-8 h-8" />
              </div>

              {/* Plan Info */}
              <h3 className="text-2xl mb-2 text-gray-900 dark:text-white">
                {plan.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 + featureIndex * 0.05,
                    }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={`w-full py-6 text-lg ${
                  plan.popular
                    ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-900 hover:bg-red-600 text-white"
                }`}
              >
                {plan.popular ? "Get Started Now" : "Choose Plan"}
              </Button>

              {plan.popular && (
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                  🎁 Get your first month at 20% off!
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl text-gray-900">
              30-Day Money-Back Guarantee
            </h3>
          </div>
          <p className="text-gray-600">
            Try FitLife Gym risk-free! If you're not completely satisfied within
            the first 30 days, we'll refund your membership fee—no questions
            asked.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

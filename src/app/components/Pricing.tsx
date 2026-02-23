import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    features: [
      "Access to gym equipment",
      "Locker room access",
      "Basic fitness assessment",
      "Mobile app access"
    ],
    popular: false
  },
  {
    name: "Pro",
    price: "$59",
    period: "/month",
    features: [
      "Everything in Basic",
      "Unlimited group classes",
      "Personal trainer (2x/month)",
      "Nutrition guidance",
      "Priority booking"
    ],
    popular: true
  },
  {
    name: "Elite",
    price: "$99",
    period: "/month",
    features: [
      "Everything in Pro",
      "Personal trainer (8x/month)",
      "Custom meal plans",
      "Recovery services",
      "Guest passes (4x/month)"
    ],
    popular: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 scroll-mt-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Membership Plans</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your lifestyle and fitness goals.
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
              className={`relative bg-white rounded-lg shadow-lg p-8 ${
                plan.popular ? "ring-2 ring-red-600 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

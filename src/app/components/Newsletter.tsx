import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, Send, Gift } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Thanks for subscribing! Check your email for exclusive offers.",
    );
  };

  return (
    <section className="py-20 bg-gradient-to-r from-red-950 via-black to-red-950 dark:from-gray-950 dark:via-black dark:to-gray-950 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff0000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500 text-red-400 px-4 py-2 rounded-full mb-6">
              <Gift className="w-5 h-5" />
              <span className="uppercase tracking-wider text-sm">
                Special Offer
              </span>
            </div>
            <h2 className="text-white mb-4">
              Get Exclusive Fitness Tips & Offers
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Join our newsletter and receive workout plans, nutrition guides,
              and member-only discounts delivered straight to your inbox.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="pl-12 h-14 bg-white text-gray-900 border-gray-300 focus:border-red-500 text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 h-14 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Subscribe Now
                </Button>
              </div>

              <p className="text-gray-400 text-sm mt-4 text-center">
                🎁 Subscribe now and get{" "}
                <span className="text-red-400 font-semibold">20% off</span> your
                first month!
              </p>
            </form>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 mt-12 text-center">
              <div>
                <div className="text-3xl text-red-500 mb-2">5,000+</div>
                <div className="text-gray-400 text-sm">
                  Newsletter Subscribers
                </div>
              </div>
              <div>
                <div className="text-3xl text-red-500 mb-2">Weekly</div>
                <div className="text-gray-400 text-sm">Expert Tips</div>
              </div>
              <div>
                <div className="text-3xl text-red-500 mb-2">100%</div>
                <div className="text-gray-400 text-sm">Spam Free</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

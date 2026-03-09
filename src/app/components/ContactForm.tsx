import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useNavigate } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../components/hooks";
import { submitContact, resetMessages } from "../features/contactSlice";

export function ContactForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.contact);

  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaValue) {
      toast.error("Please verify you are not a robot");
      return;
    }

    try {
      await dispatch(
        submitContact({
          ...form,
          recaptchaToken: recaptchaValue,
        }),
      ).unwrap();

      toast.success("Message sent successfully! We'll get back to you soon.");

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      setRecaptchaValue(null);
      dispatch(resetMessages());

     setTimeout(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  navigate("/thank-you");
}, 1200);

  return (
    <section
      id="contact"
      className="py-20 bg-gray-900 dark:bg-black text-white transition-colors duration-300"
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl font-bold">Get In Touch</h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-6 text-white text-2xl font-semibold">
                Contact Information
              </h3>
              <p className="text-gray-300 dark:text-gray-400 mb-8">
                Ready to start your fitness journey? Reach out to us and we'll
                help you get started.
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white mb-1">Phone</h4>
                  <p className="text-gray-300 dark:text-gray-400">
                    (555) 123-4567
                  </p>
                  <p className="text-gray-400 text-sm dark:text-gray-500">
                    Mon-Fri 6am-10pm, Sat-Sun 7am-8pm
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white mb-1">Email</h4>
                  <p className="text-gray-300 dark:text-gray-400">
                    info@fitlifegym.com
                  </p>
                  <p className="text-gray-400 text-sm dark:text-gray-500">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white mb-1">Location</h4>
                  <p className="text-gray-300 dark:text-gray-400">
                    123 Fitness Street
                  </p>
                  <p className="text-gray-300 dark:text-gray-400">
                    Healthy City, HC 12345
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-800 dark:bg-gray-900 p-8 rounded-lg transition-colors duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="bg-gray-700 dark:bg-gray-800 border-gray-600 dark:border-gray-700 text-white placeholder:text-gray-400 mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="bg-gray-700 dark:bg-gray-800 border-gray-600 dark:border-gray-700 text-white placeholder:text-gray-400 mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-gray-700 dark:bg-gray-800 border-gray-600 dark:border-gray-700 text-white placeholder:text-gray-400 mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="bg-gray-700 dark:bg-gray-800 border-gray-600 dark:border-gray-700 text-white placeholder:text-gray-400 mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-white">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="bg-gray-700 dark:bg-gray-800 border-gray-600 dark:border-gray-700 text-white placeholder:text-gray-400 mt-2 resize-none"
                  required
                />
              </div>

              {/* reCAPTCHA */}
              <ReCAPTCHA
                sitekey="6Lc4VXIsAAAAAOgilXIRWPED2pha7SjfWKEskIrD"
                onChange={(value) => setRecaptchaValue(value)}
                className="mt-4"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
              >
                <Send className="w-5 h-5 mr-2" />
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAppDispatch, useAppSelector } from "../hooks";
import { submitContact } from "../features/contactSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ContactForm() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.contact);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
          ...formData,
          recaptchaToken: recaptchaValue,
        }),
      ).unwrap();

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      setRecaptchaValue(null);

      // Optional short delay for smooth UX
      toast.success("Message sent successfully!");

      setTimeout(() => {
        navigate("/thank-you");
      }, 1200);
    } catch (err) {
      toast.error("Failed to send message. Try again.");
    }
  };

  return (
    <section id="contact" className="py-20 scroll-mt-20 bg-gray-900 text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold text-white">Get In Touch</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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
            className="space-y-10"
          >
            <h3 className="text-2xl font-semibold text-white">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Phone</h4>
                  <p className="text-gray-300">(555) 123-4567</p>
                  <p className="text-gray-400 text-sm">
                    Mon-Fri 6am-10pm, Sat-Sun 7am-8pm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Email</h4>
                  <p className="text-gray-300">info@fitlifegym.com</p>
                  <p className="text-gray-400 text-sm">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Location</h4>
                  <p className="text-gray-300">
                    123 Fitness Street, Healthy City
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
              className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-gray-200">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-gray-200">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-200">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-200">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={5}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 mt-2 resize-none"
                  required
                />
              </div>

              <ReCAPTCHA
                sitekey="6Lc4VXIsAAAAAOgilXIRWPED2pha7SjfWKEskIrD"
                onChange={(value) => setRecaptchaValue(value)}
                className="mt-4"
              />

              <Button
                type="submit"
                className="w-full py-4 text-white bg-red-600 hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

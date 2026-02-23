import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="text-2xl text-gray-900">
            <span className="text-red-600">Fit</span>Life
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#classes"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Classes
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href="#contact">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Join Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a
                href="#home"
                onClick={closeMenu}
                className="text-gray-700 hover:text-red-600 transition-colors py-2"
              >
                Home
              </a>
              <a
                href="#features"
                onClick={closeMenu}
                className="text-gray-700 hover:text-red-600 transition-colors py-2"
              >
                Features
              </a>
              <a
                href="#classes"
                onClick={closeMenu}
                className="text-gray-700 hover:text-red-600 transition-colors py-2"
              >
                Classes
              </a>
              <a
                href="#pricing"
                onClick={closeMenu}
                className="text-gray-700 hover:text-red-600 transition-colors py-2"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                onClick={closeMenu}
                className="text-gray-700 hover:text-red-600 transition-colors py-2"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                onClick={closeMenu}
                className="text-gray-700 hover:text-red-600 transition-colors py-2"
              >
                Contact
              </a>

              <a href="#contact" onClick={closeMenu}>
                <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
                  Join Now
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

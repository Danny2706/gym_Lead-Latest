import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../components/context/ThemeContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const closeMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    "home",
    "features",
    "classes",
    "pricing",
    "testimonials",
    "contact",
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm transition-colors ${
        isDarkMode ? "bg-gray-900/95" : "bg-white/95"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            className={`text-2xl font-bold transition-colors ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="text-red-600">Fit</span>Life
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className={`transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-red-500"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-800" />
              )}
            </button>

            <a href="#contact">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Join Now
              </Button>
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            {/* Dark Mode Toggle (Mobile) */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden border-t ${
              isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  onClick={closeMenu}
                  className={`transition-colors py-2 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-red-500"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              ))}

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

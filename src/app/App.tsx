import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Classes } from "./components/Classes";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { ThankYou } from "./pages/ThankYou";
import { DashboardPage } from "./pages/DashboardPage";
import ProtectedRoute from "./components/dashboard/ProtectedRoute";
import { LoginPage } from "./components/LoginPage";

// Create Landing Page Layout
function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Classes />
      <Pricing />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

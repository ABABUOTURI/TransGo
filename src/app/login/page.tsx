"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  // === Dummy Users ===
  const dummyUsers = [
    {
      role: "customer",
      email: "customer1@gmail.com",
      password: "customer1",
      redirect: "/customer-dashboard",
    },
    {
      role: "driver",
      email: "driver1@gmail.com",
      password: "driver1",
      redirect: "/driver-dashboard",
    },
    {
      role: "owner",
      email: "owner1@gmail.com",
      password: "owner1",
      redirect: "/owner-dashboard",
    },
    {
      role: "admin",
      email: "admin@transgo.com",
      password: "admin123",
      redirect: "/admin",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const foundUser = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      console.log(`✅ Logged in as ${foundUser.role}`);
      setError("");
      router.push(foundUser.redirect);
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 relative">
      {/* === Back Button === */}
      <a
        href="/#hero"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 text-red-800 hover:text-red-900 font-semibold transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Back</span>
      </a>

      {/* === Modal for Terms / Privacy === */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/40 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-black/60 text-white rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 border border-white/20"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-3 text-center text-red-300">
                {modalType === "terms"
                  ? "TransGo Terms of Service"
                  : "Privacy Policy"}
              </h2>

              <div className="max-h-72 overflow-y-auto text-sm text-gray-200 space-y-3 leading-relaxed">
                {modalType === "terms" ? (
                  <>
                    <p>
                      By accessing and using TransGo, you agree to comply with
                      all applicable transport laws and provide accurate
                      information.
                    </p>
                    <p>
                      You must not misuse the platform for fraudulent or illegal
                      activities. TransGo reserves the right to suspend violators.
                    </p>
                    <p>
                      Contact <span className="text-red-300">support@transgo.com</span> for inquiries.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      TransGo collects essential user data for identity
                      verification, communication, and operations.
                    </p>
                    <p>
                      Data is securely stored and never shared without consent
                      unless required by law.
                    </p>
                    <p>
                      For data requests, email{" "}
                      <span className="text-red-300">support@transgo.com</span>.
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={() => setModalType(null)}
                className="absolute top-3 right-4 text-gray-300 hover:text-white text-xl font-bold"
              >
                ×
              </button>

              <div className="flex justify-center mt-5">
                <button
                  onClick={() => setModalType(null)}
                  className="px-5 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-semibold"
                >
                  Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Login Card === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-100">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="TransGo Logo"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Login to TransGo
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Access your account (Customer, Fleet Owner, Driver, or Admin)
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 text-sm py-2 px-3 rounded-lg mb-4 text-center border border-red-200">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-sm text-red-800 hover:text-red-900 font-medium transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-red-800 text-white font-semibold py-3 rounded-lg hover:bg-red-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Log In
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Don’t have an account?
              </span>
            </div>
          </div>

          {/* Signup Links */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <a
              href="/signup/customer"
              className="flex-1 text-center py-2 text-red-800 font-semibold rounded-lg hover:bg-red-50 transition-colors duration-300"
            >
              New Customer?
            </a>
            <a
              href="/owner-signup"
              className="flex-1 text-center py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Fleet Owner?
            </a>
            <a
              href="/signup/driver"
              className="flex-1 text-center py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Driver?
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          By logging in, you agree to our{" "}
          <button
            type="button"
            onClick={() => setModalType("terms")}
            className="text-red-800 hover:text-red-900 font-medium underline"
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            type="button"
            onClick={() => setModalType("privacy")}
            className="text-red-800 hover:text-red-900 font-medium underline"
          >
            Privacy Policy
          </button>
          .
        </p>
      </motion.div>
    </div>
  );
}

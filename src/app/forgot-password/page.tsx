"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    // TODO: integrate API or backend request here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      

      {/* Form Container */}
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
              Forgot Password?
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-sm mx-auto">
              Enter your email address and we'll send you a link to reset your password for <span className="font-semibold text-red-800">Transgo</span>.
            </p>
          </div>

          {/* Form */}
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none text-gray-900"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-red-800 text-white font-semibold py-3 rounded-lg hover:bg-red-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Send Reset Link
            </motion.button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-sm text-red-800 hover:text-red-900 font-medium transition-colors underline"
            >
              Back to Login
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

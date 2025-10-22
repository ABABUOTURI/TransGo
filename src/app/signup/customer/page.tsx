"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";

export default function CustomerSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm({
      ...form,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Customer registration:", form);
    // TODO: Integrate with backend API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 relative">
      {/* === Terms & Privacy Modal === */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-black/40 border border-white/20 rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative text-white"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-red-300 mb-3">
                {modalType === "terms"
                  ? "Customer Terms & Conditions"
                  : "Privacy Policy"}
              </h2>

              <div className="max-h-72 overflow-y-auto text-sm text-gray-200 space-y-3">
                {modalType === "terms" ? (
                  <>
                    <p>
                      By using TransGo’s services, you agree to request and
                      manage deliveries responsibly. You must provide accurate
                      delivery details and payment information.
                    </p>
                    <p>
                      Any fraudulent, abusive, or inappropriate usage may result
                      in account suspension or permanent ban.
                    </p>
                    <p>
                      TransGo reserves the right to update these terms at any
                      time. Continued use indicates acceptance.
                    </p>
                    <p>
                      For support, contact{" "}
                      <span className="text-red-300">
                        support@transgo.com
                      </span>
                      .
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      TransGo values your privacy and collects only essential
                      information for account setup and communication.
                    </p>
                    <p>
                      Your data will not be shared with third parties without
                      consent, except as required by law.
                    </p>
                    <p>
                      You can request deletion or modification of your data via{" "}
                      <span className="text-red-300">
                        support@transgo.com
                      </span>
                      .
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={() => setModalType(null)}
                className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl font-bold"
              >
                ×
              </button>

              <div className="flex justify-center mt-5">
                <button
                  onClick={() => setModalType(null)}
                  className="px-5 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 text-sm shadow-md"
                >
                  Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Sign-up Card === */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-100"
      >
        {/* === Logo === */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="TransGo Logo"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>

        {/* === Header === */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Create Customer Account
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Join{" "}
            <span className="text-red-800 font-semibold">TransGo</span> to
            easily request deliveries.
          </p>
        </div>

        {/* === Form === */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First + Last Name (2 columns on medium+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+2547XXXXXXXX or 07XXXXXXXX"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Choose a strong password"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agree"
              checked={form.agree}
              onChange={handleChange}
              required
              className="mt-1 accent-red-800"
            />
            <label htmlFor="agree" className="text-sm text-gray-700 leading-snug">
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setModalType("terms")}
                className="text-red-800 hover:text-red-900 font-medium underline"
              >
                TransGo Customer Terms & Conditions
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
            </label>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-red-800 text-white font-semibold py-3 rounded-lg hover:bg-red-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Submit Details
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-red-800 hover:text-red-900 font-semibold underline"
            >
              Log in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

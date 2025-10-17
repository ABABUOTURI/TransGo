"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FleetOwnerSignup() {
  const [ownerType, setOwnerType] = useState("individual");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 sm:p-8 border border-gray-100"
      >
        {/* === Header === */}
        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="Transgo Logo"
            className="mx-auto w-14 h-14 sm:w-16 sm:h-16 mb-3"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
            Fleet Owner Signup
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Register to manage your vehicles and drivers on{" "}
            <span className="text-red-800 font-semibold">Transgo</span>.
          </p>
        </div>

        <form className="space-y-4">
          {/* === Owner Type Selection === */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Owner Type
            </label>
            <div className="flex gap-3">
              <label
                className={`flex-1 flex items-center justify-center gap-2 border rounded-lg p-3 cursor-pointer transition-all ${
                  ownerType === "individual"
                    ? "border-red-700 bg-red-50 text-red-900"
                    : "border-gray-300 bg-white text-maroon hover:border-red-400"
                }`}
              >
                <input
                  type="radio"
                  name="ownerType"
                  value="individual"
                  checked={ownerType === "individual"}
                  onChange={() => setOwnerType("individual")}
                  className="w-4 h-4 accent-red-800 cursor-pointer"
                />
                <span className="font-semibold text-sm">Individual Owner</span>
              </label>

              <label
                className={`flex-1 flex items-center justify-center gap-2 border rounded-lg p-3 cursor-pointer transition-all ${
                  ownerType === "enterprise"
                    ? "border-red-700 bg-red-50 text-red-900"
                    : "border-gray-300 bg-white text-maroon hover:border-red-400"
                }`}
              >
                <input
                  type="radio"
                  name="ownerType"
                  value="enterprise"
                  checked={ownerType === "enterprise"}
                  onChange={() => setOwnerType("enterprise")}
                  className="w-4 h-4 accent-red-800 cursor-pointer"
                />
                <span className="font-semibold text-sm">
                  Enterprise / Company
                </span>
              </label>
            </div>
          </div>

          {/* === Contact Person Details === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                First Name (Contact Person)
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Last Name (Contact Person)
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
              />
            </div>
          </div>

          {/* === Individual Owner Details === */}
          {ownerType === "individual" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name (as per ID/Passport)
                </label>
                <input
                  type="text"
                  placeholder="e.g., John Doe"
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    National ID / Passport Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your ID or Passport number"
                    className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Upload Scan of National ID/Passport
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="w-full border border-gray-300 rounded-lg py-1.5 px-2 text-xs text-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* === Account Credentials === */}
          <div className="space-y-3 pt-3 border-t border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900 mb-1">
              Account Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g., 0712345678"
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Choose a strong password"
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* === Terms Agreement === */}
          <div className="flex items-start gap-2 mt-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 w-4 h-4 accent-red-800"
            />
            <label htmlFor="terms" className="text-xs text-gray-700 leading-snug">
              I agree to the{" "}
              <a
                href="/terms/provider"
                className="text-red-800 hover:text-red-900 font-medium"
              >
                TransGo Service Provider Terms & Conditions
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-red-800 hover:text-red-900 font-medium"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* === Submit Button === */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-red-800 text-white font-semibold text-sm py-2.5 rounded-lg hover:bg-red-900 transition-colors duration-300 shadow-md hover:shadow-lg mt-4"
          >
            Create Fleet Owner Account
          </motion.button>
        </form>

        {/* === Footer Note === */}
        <p className="text-center text-xs text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-red-800 hover:text-red-900 font-semibold"
          >
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
}

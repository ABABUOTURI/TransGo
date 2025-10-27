"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Truck, CheckCircle2, AlertCircle, X } from "lucide-react";

export default function FleetRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fleetName: "",
    ownerName: "",
    email: "",
    phone: "",
    vehicles: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [registrationId, setRegistrationId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // === Validation ===
    if (
      !formData.fleetName ||
      !formData.ownerName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setAlert({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlert({
        type: "error",
        message: "Passwords do not match. Please try again.",
      });
      return;
    }

    // Simulate registration success
    const id = `FL-${Date.now()}`;
    setRegistrationId(id);
    setAlert({
      type: "success",
      message: `Fleet "${formData.fleetName}" registered successfully!`,
    });
  };

  const closeAlert = () => setAlert(null);

  const handleSuccessClose = () => {
    setAlert(null);
    router.push("/fleet/dashboard");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* === Header Section === */}
      <section className="relative h-48 bg-[#7B1E2D] text-white flex flex-col justify-center items-center">
        <button
          onClick={() => router.push("/#portal-access")}
          className="absolute top-4 left-4 bg-white hover:bg-gray-100 text-[#7B1E2D] rounded-full p-2 shadow-md transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Truck className="w-10 h-10 mb-2" />
        <h1 className="text-2xl font-bold">Register Your Fleet</h1>
        <p className="text-sm opacity-90 mt-1">
          Join TransGo and manage your logistics effortlessly.
        </p>
      </section>

      {/* === Registration Form === */}
      <section className="flex-grow flex justify-center items-center py-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Fleet Name *"
              name="fleetName"
              value={formData.fleetName}
              onChange={handleChange}
              placeholder="e.g., TransGo Logistics Ltd"
            />
            <InputField
              label="Owner Full Name *"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="e.g., John Mwangi"
            />
            <InputField
              label="Email Address *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="owner@fleet.co.ke"
            />
            <InputField
              label="Phone Number *"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254712345678"
            />
            <InputField
              label="Number of Vehicles"
              type="number"
              name="vehicles"
              value={formData.vehicles}
              onChange={handleChange}
              placeholder="e.g., 10"
            />
            <InputField
              label="Fleet Location / HQ"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Nairobi, Kenya"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Create Password *"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
            />
            <InputField
              label="Confirm Password *"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7B1E2D] text-white font-semibold py-3 rounded-xl hover:bg-[#651926] transition"
          >
            Register Fleet
          </button>
        </form>
      </section>

      {/* === Animated Alerts === */}
      <AnimatePresence>
        {alert && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center ${
                alert.type === "success"
                  ? "bg-white"
                  : "bg-[#7B1E2D] text-white"
              }`}
            >
              <button
                onClick={closeAlert}
                className={`absolute top-3 right-3 ${
                  alert.type === "success"
                    ? "text-gray-500 hover:text-gray-700"
                    : "text-white hover:text-gray-200"
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              {alert.type === "success" ? (
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              ) : (
                <AlertCircle className="w-16 h-16 text-white mx-auto mb-4" />
              )}

              <h2
                className={`text-xl font-bold mb-2 ${
                  alert.type === "success" ? "text-gray-800" : "text-white"
                }`}
              >
                {alert.type === "success"
                  ? "Registration Successful!"
                  : "Validation Error"}
              </h2>

              <p
                className={`mb-4 ${
                  alert.type === "success"
                    ? "text-gray-600"
                    : "text-white/90 font-light"
                }`}
              >
                {alert.message}
              </p>

              {alert.type === "success" && (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    Registration ID:{" "}
                    <span className="font-semibold text-[#7B1E2D]">
                      {registrationId}
                    </span>
                  </p>
                  <button
                    onClick={handleSuccessClose}
                    className="bg-[#7B1E2D] text-white px-6 py-2 rounded-lg hover:bg-[#651926] transition"
                  >
                    Go to Fleet Dashboard
                  </button>
                </>
              )}

              {alert.type === "error" && (
                <button
                  onClick={closeAlert}
                  className="bg-white text-[#7B1E2D] font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Try Again
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* === Small InputField Component === */
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 text-black placeholder-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#7B1E2D] focus:border-transparent"
        placeholder={placeholder}
      />
    </div>
  );
}

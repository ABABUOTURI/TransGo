"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  User,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

/**
 * Driver Signup Page (Option A)
 * - Local simulated uploads (previews + filenames)
 * - Placeholders added
 * - Responsive + modals + success modal
 *
 * Keep wiring to backend later if needed.
 */

export default function DriverSignupPage() {
  // Form state
  const [form, setForm] = useState({
    fullName: "",
    idNumber: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    location: "",
    licenseNumber: "",
    licenseExpiry: "",
    experienceYears: "",
    vehicleType: "",
    registrationNumber: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  // File state (store File objects)
  const [idFile, setIdFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [vehicleFile, setVehicleFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  // Previews (object URLs)
  const [idPreview, setIdPreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [vehiclePreview, setVehiclePreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  // Helpers
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setForm((s) => ({ ...s, [id]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((s) => ({ ...s, [id]: value }));
    }
  }

  // Create object URL for previews and cleanup previous
  function handleFileChange(
    e: ChangeEvent<HTMLInputElement>,
    setter: (f: File | null) => void,
    setPreview: (url: string | null) => void
  ) {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setter(file);

      // If image, create object URL preview; otherwise just show filename (handled in render)
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreview(url);
      } else {
        // non-image: remove preview, show filename text instead
        setPreview(null);
      }
    } else {
      setter(null);
      setPreview(null);
    }
  }

  // cleanup object URLs on unmount or when a file changes
  useEffect(() => {
    return () => {
      if (idPreview) URL.revokeObjectURL(idPreview);
      if (licensePreview) URL.revokeObjectURL(licensePreview);
      if (vehiclePreview) URL.revokeObjectURL(vehiclePreview);
      if (profilePreview) URL.revokeObjectURL(profilePreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when a preview url is replaced, revoke previous to avoid leaks
  useEffect(() => {
    return () => {
      // cleanup when component unmounts done above
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic client-side validation example
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!form.agree) {
      alert("Please agree to the Terms and Privacy Policy.");
      return;
    }

    // TODO: Replace this with real API call / file upload
    console.log("Driver signup payload:", {
      form,
      idFile,
      licenseFile,
      vehicleFile,
      profileFile,
    });

    // Show success modal
    setShowSuccess(true);

    // auto-close success
    setTimeout(() => setShowSuccess(false), 3500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 relative">
      {/* Back */}
      <a
        href="/login"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 text-red-800 hover:text-red-900 font-semibold transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Back</span>
      </a>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 lg:p-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="TransGo" className="w-14 h-14 mb-2" />
          <h1 className="text-2xl sm:text-3xl font-bold text-red-900">Driver Signup</h1>
          <p className="text-sm text-gray-700 mt-1 text-center max-w-2xl">
            Sign up to join TransGo’s driver network. Provide accurate information for verification.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PERSONAL */}
          <SectionTitle title="Personal Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              id="fullName"
              label="Full Name (as per ID/License)"
              icon={<User className="w-4 h-4" />}
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="e.g., John Doe"
            />
            <TextInput
              id="idNumber"
              label="National ID / Passport Number"
              icon={<FileText className="w-4 h-4" />}
              value={form.idNumber}
              onChange={handleChange}
              required
              placeholder="e.g., A1234567"
            />

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender (optional)</label>
                <select
                  id="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload ID / Passport (jpg, png, pdf)</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, setIdFile, (url) => {
                    if (idPreview) {
                      try { URL.revokeObjectURL(idPreview); } catch {}
                    }
                    setIdPreview(url);
                  })}
                  className="text-sm"
                />
                <span className="text-sm text-gray-600">{idFile ? idFile.name : "No file chosen"}</span>
                {/* image preview */}
                {idPreview && (
                  <img src={idPreview} alt="ID preview" className="ml-4 w-16 h-12 object-cover rounded-md border" />
                )}
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <SectionTitle title="Contact Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IconInput
              id="email"
              label="Email Address"
              type="email"
              icon={<Mail className="w-4 h-4" />}
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
            <IconInput
              id="phone"
              label="Phone Number"
              type="tel"
              icon={<Phone className="w-4 h-4" />}
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+2547XXXXXXXX"
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location / Town</label>
              <input
                id="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., Nairobi"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* DRIVING */}
          <SectionTitle title="Driving Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              id="licenseNumber"
              label="Driving License Number"
              value={form.licenseNumber}
              onChange={handleChange}
              required
              placeholder="e.g., DL-123456"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Expiry Date</label>
              <input
                id="licenseExpiry"
                type="date"
                value={form.licenseExpiry}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <TextInput
              id="experienceYears"
              label="Years of Driving Experience"
              value={form.experienceYears}
              onChange={handleChange}
              placeholder="e.g., 3"
            />
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload License (jpg, pdf)</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, setLicenseFile, (url) => {
                    if (licensePreview) {
                      try { URL.revokeObjectURL(licensePreview); } catch {}
                    }
                    setLicensePreview(url);
                  })}
                />
                <span className="text-sm text-gray-600">{licenseFile ? licenseFile.name : "No file chosen"}</span>
                {licensePreview && <img src={licensePreview} alt="license preview" className="ml-4 w-16 h-12 object-cover rounded-md border" />}
              </div>
            </div>
          </div>

          {/* VEHICLE */}
          <SectionTitle title="Vehicle Details (if applicable)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              id="vehicleType"
              label="Vehicle Type (Truck, Van…)"
              value={form.vehicleType}
              onChange={handleChange}
              placeholder="e.g., Pickup"
            />
            <TextInput
              id="registrationNumber"
              label="Registration Number (Plate)"
              value={form.registrationNumber}
              onChange={handleChange}
              placeholder="e.g., KAA 000A"
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Logbook / Vehicle Photo</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, setVehicleFile, (url) => {
                    if (vehiclePreview) {
                      try { URL.revokeObjectURL(vehiclePreview); } catch {}
                    }
                    setVehiclePreview(url);
                  })}
                />
                <span className="text-sm text-gray-600">{vehicleFile ? vehicleFile.name : "No file chosen"}</span>
                {vehiclePreview && <img src={vehiclePreview} alt="vehicle preview" className="ml-4 w-16 h-12 object-cover rounded-md border" />}
              </div>
            </div>
          </div>

          {/* EMERGENCY */}
          <SectionTitle title="Emergency Contact" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Name</label>
            <input
              id="emergencyName"
              placeholder="Name"
              value={form.emergencyName}
              onChange={(e) => setForm((s) => ({ ...s, emergencyName: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Relationship</label>
            <input
              id="emergencyRelationship"
              placeholder="Relationship"
              value={form.emergencyRelationship}
              onChange={(e) => setForm((s) => ({ ...s, emergencyRelationship: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
            <input
              id="emergencyPhone"
              placeholder="Phone"
              value={form.emergencyPhone}
              onChange={(e) => setForm((s) => ({ ...s, emergencyPhone: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* CREDENTIALS */}
          <SectionTitle title="Account Credentials" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="md:col-span-2 flex items-center gap-3 mt-1">
              <input
                id="agree"
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm((s) => ({ ...s, agree: e.target.checked }))}
                className="w-4 h-4 accent-red-700"
              />
              <label htmlFor="agree" className="text-sm text-gray-700">
                I agree to the{" "}
                <button type="button" onClick={() => setModalType("terms")} className="text-red-800 hover:text-red-900 font-medium underline">
                  TransGo Driver Terms & Conditions
                </button>{" "}
                and{" "}
                <button type="button" onClick={() => setModalType("privacy")} className="text-red-800 hover:text-red-900 font-medium underline">
                  Privacy Policy
                </button>
              </label>
            </div>
          </div>

          {/* PROFILE PHOTO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo (optional)</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setProfileFile, (url) => {
                  if (profilePreview) {
                    try { URL.revokeObjectURL(profilePreview); } catch {}
                  }
                  setProfilePreview(url);
                })}
              />
              <span className="text-sm text-gray-600">{profileFile ? profileFile.name : "No file chosen"}</span>
              {profilePreview && <img src={profilePreview} alt="profile preview" className="ml-4 w-16 h-16 object-cover rounded-full border" />}
            </div>
          </div>

          {/* SUBMIT */}
          <div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-red-800 text-white py-3 rounded-lg font-semibold hover:bg-red-900 shadow-lg transition">
              Create Driver Account
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Success Modal */}
      <Modal show={showSuccess} onClose={() => setShowSuccess(false)} title="">
        <div className="flex flex-col items-center">
          <CheckCircle2 className="w-14 h-14 text-green-600 mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">Account Created Successfully</h3>
          <p className="text-sm text-gray-700 text-center">Your driver profile has been submitted for verification. We'll notify you when it's approved.</p>
        </div>
      </Modal>

      {/* Terms / Privacy Modal */}
      <AnimatePresence>
        {modalType && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xl z-50 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.25 }} className="bg-black/70 backdrop-blur-md rounded-2xl w-full max-w-2xl p-6 text-white border border-white/10 shadow-2xl">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold text-red-200">{modalType === "terms" ? "Driver Terms & Conditions" : "Privacy Policy"}</h2>
                <button onClick={() => setModalType(null)} className="text-white/80 hover:text-white text-xl">×</button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto text-sm leading-relaxed space-y-3">
                {modalType === "terms" ? (
                  <>
                    <p>By registering as a driver on TransGo, you agree to provide accurate information, hold valid driving credentials, and comply with applicable laws. You must present valid identification and license on request.</p>
                    <p>TransGo reserves the right to verify, suspend, or terminate accounts in cases of misconduct, fraud, or breach of these terms.</p>
                    <p>Please ensure you keep your documents up to date. For disputes contact <span className="text-red-300">support@transgo.com</span>.</p>
                  </>
                ) : (
                  <>
                    <p>TransGo collects personal data (name, contact, identification) to verify drivers and enable the service. We process data lawfully, store securely, and only share with authorized parties when required.</p>
                    <p>You can request access, correction, or deletion of your data by contacting <span className="text-red-300">support@transgo.com</span>.</p>
                  </>
                )}
              </div>

              <div className="mt-5 flex gap-3">
                <button onClick={() => setModalType(null)} className="ml-auto bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-900">Back</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* --------------------------
   Small helper components
   (keeps markup readable)
   -------------------------- */

function SectionTitle({ title }: { title: string }) {
  return <h3 className="text-lg font-semibold text-red-800 border-l-4 border-red-700 pl-3 mt-2">{title}</h3>;
}

function TextInput({
  id,
  label,
  value,
  onChange,
  required = false,
  icon,
  placeholder = "",
}: {
  id?: string;
  label?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 ${icon ? "pl-10" : ""}`}
        />
      </div>
    </div>
  );
}

function IconInput({
  id,
  label,
  type = "text",
  icon,
  value,
  onChange,
  required = false,
  placeholder = "",
}: {
  id?: string;
  label?: string;
  type?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-lg px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>
  );
}

function Modal({ show, onClose, title, children }: { show: boolean; onClose: () => void; title?: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xl z-50 p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.25 }} className="bg-white/95 rounded-2xl shadow-2xl border border-gray-200 p-6 text-center max-w-md w-full">
            {title && <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>}
            {children}
            <div className="mt-5">
              <button onClick={onClose} className="w-full bg-red-800 text-white py-2 rounded-md hover:bg-red-900 flex items-center justify-center gap-2">
                <X className="w-4 h-4" /> Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

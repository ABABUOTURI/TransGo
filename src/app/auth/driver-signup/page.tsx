"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  Upload,
  User,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

export default function DriverSignupPage() {
  const router = useRouter();

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

  const [idFile, setIdFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [vehicleFile, setVehicleFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [idPreview, setIdPreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [vehiclePreview, setVehiclePreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    return () => {
      [idPreview, licensePreview, vehiclePreview, profilePreview].forEach(
        (url) => url && URL.revokeObjectURL(url)
      );
    };
  }, [idPreview, licensePreview, vehiclePreview, profilePreview]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  }

  function handleFileChange(
    e: ChangeEvent<HTMLInputElement>,
    setter: (f: File | null) => void,
    setPreview: (url: string | null) => void
  ) {
    const file = e.target.files?.[0];
    if (file) {
      setter(file);
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreview(url);
      } else {
        setPreview(null);
      }
    } else {
      setter(null);
      setPreview(null);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("Submitting:", { form, idFile, licenseFile, vehicleFile, profileFile });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      router.push("/login");
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center px-4 py-10">
      <a
        href="/login"
        className="fixed top-4 left-4 flex items-center gap-2 text-red-800 hover:text-red-900 font-semibold transition"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </a>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10"
      >
        <div className="text-center mb-8">
          <img src="/logo.png" alt="TransGo" className="w-14 h-14 mx-auto mb-2" />
          <h1 className="text-2xl sm:text-3xl font-bold text-red-900">Driver Signup</h1>
          <p className="text-sm text-gray-700 mt-1">
            Fill all required fields to register
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 text-black">
          <SectionTitle title="Personal Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              id="fullName"
              label="Full Name"
              required
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              icon={<User className="w-4 h-4" />}
            />
            <TextInput
              id="idNumber"
              label="National ID / Passport"
              required
              value={form.idNumber}
              onChange={handleChange}
              placeholder="e.g., 12345678"
              icon={<FileText className="w-4 h-4" />}
            />
            <input
              id="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full text-black placeholder-black"
            />
            <select
              id="gender"
              value={form.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full text-black"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <FileUpload
            label="Upload ID / Passport"
            file={idFile}
            preview={idPreview}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFileChange(e, setIdFile, setIdPreview)
            }
          />

          <SectionTitle title="Contact Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              id="email"
              label="Email"
              required
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
            />
            <TextInput
              id="phone"
              label="Phone"
              required
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+2547..."
              icon={<Phone className="w-4 h-4" />}
            />
            <TextInput
              id="location"
              label="Location"
              required
              value={form.location}
              onChange={handleChange}
              placeholder="e.g., Nairobi"
            />
          </div>

          <SectionTitle title="Driving Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              id="licenseNumber"
              label="License Number"
              required
              value={form.licenseNumber}
              onChange={handleChange}
            />
            <input
              id="licenseExpiry"
              type="date"
              required
              value={form.licenseExpiry}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full text-black placeholder-black"
            />
            <TextInput
              id="experienceYears"
              label="Experience (years)"
              value={form.experienceYears}
              onChange={handleChange}
            />
          </div>

          <FileUpload
            label="Upload Driving License"
            file={licenseFile}
            preview={licensePreview}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFileChange(e, setLicenseFile, setLicensePreview)
            }
          />

          <SectionTitle title="Vehicle Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              id="vehicleType"
              label="Vehicle Type"
              value={form.vehicleType}
              onChange={handleChange}
            />
            <TextInput
              id="registrationNumber"
              label="Registration Number"
              value={form.registrationNumber}
              onChange={handleChange}
            />
          </div>

          <FileUpload
            label="Upload Vehicle Photo / Logbook"
            file={vehicleFile}
            preview={vehiclePreview}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFileChange(e, setVehicleFile, setVehiclePreview)
            }
          />

          <SectionTitle title="Profile Photo (optional)" />
          <FileUpload
            label="Upload Profile Photo"
            file={profileFile}
            preview={profilePreview}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFileChange(e, setProfileFile, setProfilePreview)
            }
          />

          <SectionTitle title="Account Credentials" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PasswordInput
              id="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              show={showPassword}
              toggle={() => setShowPassword((s) => !s)}
            />
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword((s) => !s)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-red-800 text-white py-3 rounded-lg font-semibold hover:bg-red-900 shadow-lg transition"
          >
            Create Driver Account
          </motion.button>
        </form>
      </motion.div>

      <Modal show={showSuccess} onClose={() => setShowSuccess(false)}>
        <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-3" />
        <p className="text-gray-800 font-semibold text-lg">Account Created Successfully!</p>
        <p className="text-sm text-gray-600 mt-1">Redirecting to login page...</p>
      </Modal>
    </div>
  );
}

/* === SUB COMPONENTS === */
function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-lg font-semibold text-red-800 border-l-4 border-red-700 pl-3">
      {title}
    </h3>
  );
}

function TextInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  icon,
  placeholder,
}: any) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`border border-gray-300 rounded-lg px-3 py-2 text-sm w-full text-black placeholder-black ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}

function PasswordInput({ id, label, value, onChange, show, toggle }: any) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          required
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full text-black placeholder-black pr-10"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-red-700 transition"
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

function FileUpload({
  label,
  file,
  preview,
  onChange,
}: {
  label: string;
  file: File | null;
  preview: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <label className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-red-400 transition rounded-xl flex flex-col items-center justify-center w-full sm:w-1/2 h-36 text-center p-3 bg-gray-50 hover:bg-gray-100">
          <Upload className="w-8 h-8 text-gray-500 mb-2" />
          <span className="text-sm text-gray-600">Click or drag file to upload</span>
          <input type="file" accept="image/*,.pdf" onChange={onChange} className="hidden" />
        </label>

        {preview ? (
          <div className="w-32 h-32 border rounded-lg overflow-hidden">
            <img src={preview} alt="Preview" className="object-cover w-full h-full" />
          </div>
        ) : file ? (
          <div className="text-sm text-gray-700 truncate w-full sm:w-1/2">📄 {file.name}</div>
        ) : (
          <div className="text-gray-400 text-sm italic w-full sm:w-1/2 text-center">
            No file selected
          </div>
        )}
      </div>
    </div>
  );
}

function Modal({
  show,
  onClose,
  children,
}: {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white text-black rounded-xl shadow-xl p-6 max-w-sm w-full text-center"
          >
            {children}
            <button
              onClick={onClose}
              className="mt-4 w-full bg-red-700 text-white py-2 rounded hover:bg-red-800 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

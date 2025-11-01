"use client";

import { motion } from "framer-motion";
import ProfileForm from "./components/EditProfileForm";
import SavedLocations from "./components/SavedLocations";
import ChangePassword from "./components/ChangePassword";
import ProfileAvatarUpload from "./components/ProfileAvatarUpload";
import Preferences from "./components/Preferences";
import SecuritySettings from "./components/SecuritySettings";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#7B1E2D]">
            My Profile
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Manage your account details, preferences, and security settings.
          </p>
        </div>

        {/* Top section - avatar and form */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ProfileAvatarUpload />
          </div>
          <div className="md:col-span-2">
            <ProfileForm />
          </div>
        </section>

        {/* Preferences and Saved Locations */}
        <section className="grid md:grid-cols-2 gap-6 mt-8">
          <Preferences />
          <SavedLocations />
        </section>

        {/* Security and Password */}
        <section className="grid md:grid-cols-2 gap-6 mt-8">
          <SecuritySettings />
          <ChangePassword />
        </section>

        {/* Footer note */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} TransGo. All rights reserved.
        </div>
      </motion.div>
    </main>
  );
}

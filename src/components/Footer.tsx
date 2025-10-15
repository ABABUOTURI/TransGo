"use client";

import { useState } from "react";

export default function Footer() {
  const [openModal, setOpenModal] = useState<null | "customer" | "provider" | "privacy">(null);

  const closeModal = () => setOpenModal(null);

  return (
    <footer className="bg-red-900 text-white py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* === Left: Copyright === */}
        <p className="text-sm order-3 sm:order-1">
          © {new Date().getFullYear()} TransGo Kenya. All Rights Reserved.
        </p>

        {/* === Center: Quick Links === */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm order-2">
          <button
            onClick={() => setOpenModal("customer")}
            className="hover:text-red-300 transition-colors duration-300"
          >
            Customer Terms
          </button>
          <span className="hidden sm:inline text-white/60">|</span>
          <button
            onClick={() => setOpenModal("provider")}
            className="hover:text-red-300 transition-colors duration-300"
          >
            Provider Terms
          </button>
          <span className="hidden sm:inline text-white/60">|</span>
          <button
            onClick={() => setOpenModal("privacy")}
            className="hover:text-red-300 transition-colors duration-300"
          >
            Privacy Policy
          </button>
        </div>

        {/* === Right: Social Icons === */}
        <div className="flex items-center gap-4 order-1 sm:order-3">
          {[
            {
              href: "https://www.facebook.com/transgoKE",
              label: "Facebook",
              path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
            },
            {
              href: "https://x.com/Transgo_KE",
              label: "X (Twitter)",
              path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
            },
            {
              href: "https://www.linkedin.com/company/transgo-ke/",
              label: "LinkedIn",
              path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z",
            },
            {
              href: "https://www.instagram.com/transgo_ke/",
              label: "Instagram",
              path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0z",
            },
          ].map((icon) => (
            <a
              key={icon.label}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              aria-label={icon.label}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={icon.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* === Modal Popup === */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-lg w-[90%] text-white relative shadow-2xl backdrop-blur-lg">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-2xl font-bold hover:text-red-300 transition"
            >
              ×
            </button>

            {/* Modal Content */}
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {openModal === "customer" && "Customer Terms & Conditions"}
              {openModal === "provider" && "Provider Terms & Conditions"}
              {openModal === "privacy" && "Privacy Policy"}
            </h2>

            <p className="text-sm leading-relaxed text-gray-200 text-center">
              {openModal === "customer" &&
                "These terms outline the responsibilities and service agreements between TransGo and its customers. Please review them before using our platform."}
              {openModal === "provider" &&
                "Provider terms define the obligations, payment policies, and service standards expected from all TransGo transport providers."}
              {openModal === "privacy" &&
                "Our privacy policy explains how TransGo collects, uses, and protects your personal information. We are committed to ensuring your data privacy."}
            </p>

            <div className="text-center mt-6">
              <button
                onClick={closeModal}
                className="bg-red-800 hover:bg-red-700 px-5 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

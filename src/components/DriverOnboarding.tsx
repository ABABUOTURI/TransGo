"use client";
import { motion } from "framer-motion";
import { UserPlus, Smartphone, FileText, Car, DollarSign } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Get Invited by Fleet Owner",
    description: "Your Fleet Owner will initiate your registration by requesting an OTP for your phone number.",
  },
  {
    number: "2",
    title: "Complete Registration with OTP",
    description: "Use the OTP sent to access the Driver Portal and complete your profile setup.",
  },
  {
    number: "3",
    title: "Provide Your Details",
    description: "Fill in your personal information, upload a passport photo, and complete your driver profile.",
  },
  {
    number: "4",
    title: "Vehicle Registration",
    description: "Your Fleet Owner pays the one-time vehicle registration fee to activate your vehicle on the platform.",
  },
  {
    number: "5",
    title: "Start Earning",
    description: "Once activated, you can immediately start receiving job requests and earning from deliveries.",
  },
];

export default function DriverOnboarding() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-800 mb-4"
          >
            How to Join as a Driver
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Simple 5-step process to start earning with Transgo
          </motion.p>
        </div>

        {/* Steps Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute left-0 right-0 top-24 h-1 bg-gradient-to-r from-red-200 via-red-400 to-red-600" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-red-200 h-full flex flex-col">
                    {/* Step Number Badge */}
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10 relative">
                          {step.number}
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-red-400 rounded-full blur-lg opacity-40" />
                      </div>
                    </div>


                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 text-center leading-relaxed flex-grow">
                      {step.description}
                    </p>
                  </div>

                  {/* Connecting Arrow - Mobile/Tablet */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-1 h-8 bg-gradient-to-b from-red-400 to-red-600 rounded-full" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-3xl mx-auto border border-red-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact your Fleet Owner to begin the registration process and start earning with Transgo today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/driver/portal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-800 text-white font-semibold px-8 py-3 rounded-full hover:bg-red-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Access Driver Portal
              </motion.a>
              {/* <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-800 font-semibold px-8 py-3 rounded-full border-2 border-red-800 hover:bg-red-50 transition-colors duration-300"
              >
                Contact Support
              </motion.a> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
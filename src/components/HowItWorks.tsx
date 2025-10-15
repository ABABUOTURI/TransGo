"use client";
import { motion } from "framer-motion";

const steps = [
  {
    title: "For Customers",
    steps: [
      {
        number: "1",
        title: "Request a Quote",
        desc: "Enter your pickup & drop-off locations, and cargo details.",
      },
      {
        number: "2",
        title: "Choose Your Price",
        desc: "Accept our instant system price or receive competitive quotes from drivers.",
      },
      {
        number: "3",
        title: "Track Your Delivery",
        desc: "Confirm your booking and monitor your cargo in real-time until it arrives.",
      },
    ],
  },
  {
    title: "For Fleet Owners",
    steps: [
      {
        number: "1",
        title: "Register Fleet",
        desc: "Sign up and pay a one-time fee to register each vehicle.",
      },
      {
        number: "2",
        title: "Complete Trial Trips",
        desc: "Each vehicle gets free trial trips to start earning immediately.",
      },
      {
        number: "3",
        title: "Subscribe & Grow",
        desc: "Choose a subscription plan to keep your vehicles active and receiving jobs.",
      },
    ],
  },
];

export default function HowItWorks() {
  return (
    <section
      id="howitworks"
      className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-800 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            A simple, transparent process for everyone.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Section Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-red-800">
                  {section.title}
                </h3>
              </div>

              {/* Steps List */}
              <div className="space-y-5 sm:space-y-6">
                {section.steps.map((step, stepIndex) => (
                  <motion.div
                    key={stepIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: sectionIndex * 0.2 + stepIndex * 0.1,
                      duration: 0.6,
                    }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-red-800 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
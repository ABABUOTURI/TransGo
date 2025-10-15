"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-white px-4 sm:px-12 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* === Left Column: Text Content === */}
        <div className="order-1 md:order-1 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-red-800 mb-6"
          >
            About Transgo
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-700 leading-relaxed text-base sm:text-lg max-w-lg mx-auto md:mx-0 mb-4"
          >
            Transgo, is a logistics platform transforming cargo transportation in Kenya. Our mission is to connect customers to a trusted network of vetted transport partners for fast, transparent, and reliable deliveries.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-700 leading-relaxed text-base sm:text-lg max-w-lg mx-auto md:mx-0"
          >
            We empower businesses and individuals with seamless delivery options, real-time tracking, and tools to reduce downtime and increase efficiency across the supply chain.
          </motion.p>
        </div>

        {/* === Right Column: Floating Truck Image with Overlay === */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="order-2 md:order-2 flex justify-center md:justify-end"
        >
          <motion.div
            className="relative"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/truck2.png"
              alt="TransGo Truck"
              className="w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] h-auto drop-shadow-2xl rounded-[10px]"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      {/* === Why Choose Transgo Section === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-20 sm:mt-24"
      >
        <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-800 text-center mb-12"
          >
            Why Businesses & Individuals Choose Transgo
          </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors duration-300"
          >
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Vetted & Reliable
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Every driver and vehicle undergoes a strict verification process to ensure your goods are in safe hands.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors duration-300"
          >
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Transparent Pricing
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Get clear, upfront system prices or request competitive quotes. No hidden fees, ever.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors duration-300"
          >
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Real-Time Tracking
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Monitor your delivery's progress live from pickup to drop-off with our integrated tracking system.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors duration-300"
          >
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Wide Range of Vehicles
            </h4>
            <p className="text-gray-600 leading-relaxed">
              From tuktuks for small errands to large trucks for major hauls, find the perfect vehicle for any job.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const portals = [
  {
    title: "For Customers",
    description:
      "Quickly book vehicles, track your shipments in real-time, and manage your delivery history with ease.",
    buttonText: "Book a Delivery",
    buttonLink: "/cutomer/book-delivery",
    image: "/customer1.png",
  },
  {
    title: "For Fleet Owners",
    description:
      "Manage your vehicles and drivers, access analytics, and grow your business with our powerful fleet tools.",
    buttonText: "Register Your Fleet",
    buttonLink: "/fleet/register",
    image: "/owner1.png",
  },
  {
    title: "For Drivers",
    description:
      "Access available jobs, manage deliveries, and track earnings. (Note: Fleet Owners must register their drivers).",
    buttonText: "Access Driver Portal",
    buttonLink: "/driver/portal",
    image: "/truck4.png",
  },
];

export default function PortalAccess() {
  return (
    <section 
    id="portal-access"
    className="py-16 sm:py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* === Section Header === */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-800 mb-4"
          >
            Access Your Transgo Portal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Choose your portal to get started with TransGo's seamless logistics
            platform.
          </motion.p>
        </div>

        {/* === Portal Cards === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {portals.map((portal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-red-50 to-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl border border-gray-200 hover:border-red-200 transition-all duration-500 flex flex-col group"
            >
              {/* === Image Section === */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={portal.image}
                  alt={portal.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* === Card Content === */}
              <div className="flex flex-col items-center text-center px-6 pt-10 pb-8 flex-grow">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {portal.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 flex-grow">
                  {portal.description}
                </p>

                <motion.a
                  href={portal.buttonLink}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full bg-red-800 text-white text-center font-semibold py-3 px-6 rounded-full hover:bg-red-900 transition-colors duration-300 shadow-md hover:shadow-xl"
                >
                  {portal.buttonText}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!show) return null;

  return (
    <main className="flex h-screen items-center justify-center bg-white overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center w-full px-4">
        {/* Logo reveal animation */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="overflow-hidden flex justify-center"
        >
          <motion.img
            src="/logo.png"
            alt="TransGo Logo"
            className="
              w-10                /* default mobile: ~160px */
              sm:w-20             /* small tablets */
              md:w-34             /* mid-size screens */
              lg:w-52             /* laptops */
              xl:w-70             /* large monitors */
              2xl:w-86            /* very large screens */
              max-w-full h-auto
            "
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 0.5 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          />
        </motion.div>
      </div>
    </main>
  );
}

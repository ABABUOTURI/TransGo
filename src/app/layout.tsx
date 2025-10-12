"use client";

import "./globals.css";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-maroon-700 transition-colors">
        {loading ? <Loader onFinish={() => setLoading(false)} /> : <main>{children}</main>}
      </body>
    </html>
  );
}

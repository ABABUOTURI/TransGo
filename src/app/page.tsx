"use client";

import { useState } from "react";
import Loader from "../components/Loader";

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);

  if (!loadingDone) {
    return <Loader onFinish={() => setLoadingDone(true)} />;
  }

  return (
    <main className="flex h-screen items-center justify-center bg-white text-[#800000] text-3xl font-bold">
      Welcome to TransGo 🚛
    </main>
  );
}

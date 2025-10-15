"use client";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/truck3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Hero content - fully responsive */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Heading - responsive text sizes */}
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight px-2">
            Transgo: Your Logistics, Simplified.
          </h1>
          
          {/* Subheading - responsive text and spacing */}
          <p className="text-base sm:text-lg md:text-xl lg:text-1xl text-gray-200 max-w-xs sm:max-w-md md:max-w-1xl lg:max-w-2xl mx-auto leading-relaxed px-4">
            Book cargo transport instantly across Kenya with transparent pricing, vetted drivers, and real-time tracking.
          </p>
          
          {/* CTA Button - responsive sizing */}
          {/* <div className="pt-4 sm:pt-6">
            <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-red-800 text-white text-base sm:text-lg font-semibold rounded-full shadow-xl hover:bg-red-900 transition-all duration-300 transform hover:scale-105 active:scale-95">
              Get Started
            </button>
          </div> */}
        </div>
      </div>

      {/* Bottom gradient fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </section>
  );
}
import React from "react";
import Navigation from "./navigation";

const Header = () => {
  // Sticky header with background blur
  return (
    <header className="sticky z-50 top-0 left-0 px-2 py-4 md:px-4 md:py-6 isolate w-full bg-white/90 shadow-lg ring-1 ring-black/5">
      <div className="flex justify-between items-center mx-3 md:mx-6">
        <h1 className="text-2xl font-semibold text-black tracking-wider md:text-4xl">
          pixel<span className="text-rose-800">6</span>
        </h1>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;

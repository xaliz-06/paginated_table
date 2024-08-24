import { MenuIcon } from "lucide-react";
import React from "react";

const Navigation = () => {
  // Navigation menu icon
  // As it is single page, no need for a Navigation component with routing
  return (
    <nav className="flex justify-center items-center">
      <MenuIcon className="size-6 md:size-10 cursor-pointer" />
    </nav>
  );
};

export default Navigation;

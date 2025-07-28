import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-6">
      <p className="text-sm">
        📧 Email:{" "}
        <a href="mailto:cpcivil@nith.ac.in" className="underline">
          cpcivil@nith.ac.in
        </a>
      </p>
      <p className="text-xs mt-2 text-gray-400">
        © 2025 NIT Hamirpur - Construction Practice Support Group
      </p>
    </footer>
  );
};

export default Footer;

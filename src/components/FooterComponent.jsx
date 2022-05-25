import React from "react";

const FooterComponent = () => {
  return (
    <footer className="bg-white text-center py-5 border-t-2 text-neutral-800">
      <span className="font-bold text-black">
        Record<span className="text-green-600">Finance</span>
      </span>{" "}
      Copyright © {new Date().getFullYear()}
    </footer>
  );
};

export default FooterComponent;

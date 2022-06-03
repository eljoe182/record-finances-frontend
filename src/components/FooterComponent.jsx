import React from "react";

const FooterComponent = () => {
  return (
    <footer>
      <p className="flex justify-center py-3 italic opacity-25 gap-1 text-xs">
        <span className="font-bold text-black">
          Record<span className="text-green-600">Finance</span>
        </span>{" "}
        Copyright © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default FooterComponent;

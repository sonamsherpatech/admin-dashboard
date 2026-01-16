import React from "react";

interface ButtonTypes {
  text: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
export default function Button({
  text,
  type = "button",
  disabled = false,
  className = "",
  children,
}: ButtonTypes) {
  return (
    <button
      className={`w-full px-6 py-2 rounded-md font-medium transition-colors cursor-pointer duration-200 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black text-white hover:bg-gray-900"
      } ${className}`}
      type={type}
      disabled={disabled}
    >
      {children || text}
    </button>
  );
}

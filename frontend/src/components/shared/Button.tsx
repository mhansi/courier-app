import React from "react";
import Spinner from "./Snipper";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ loading, children, className = "", ...props }) => (
  <button
    className={`btn rounded px-4 py-2 bg-blue-600 text-white ${className} ${props.disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700 transition cursor-pointer"}`}
    disabled={props.disabled || loading}
    {...props}
  >
    {loading ? <Spinner /> : children}
  </button>
);

export default Button;
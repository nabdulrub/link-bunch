import React from "react";

const Button = ({ variant = "default", children }) => {
  const variants = {
    outline: "text-red-500", // outline
    ghost: "text-blue-500", // ghost
    secondary:
      "flex gap-1 items-center bg-[#EFEBFF] text-[#633CFF] font-bold rounded-lg px-[1.69rem] py-[.69rem]",
    default:
      "flex gap-1 border-2 border-[#633CFF] bg-white transition-all duration-300 hover:bg-[#EFEBFF] text-[#633CFF] font-bold rounded-lg px-[1.69rem] py-[.69rem]", // default
    destructive:
      "flex gap-1 border-2 border-red-500 bg-white transition-all duration-300 hover:bg-[#EFEBFF] text-red-500 font-bold rounded-lg px-[1.69rem] py-[.69rem]", // destructive
  };

  return <button className={variants[variant]}>{children}</button>;
};

export default Button;

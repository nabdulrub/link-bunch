import { twMerge } from "tailwind-merge";

const Button = ({
  variant = "default",
  children,
  icon,
  className,
  href,
  onClick,
  type,
  disabled,
}) => {
  const variants = {
    outline:
      "flex gap-1 border-2 border-[#633CFF] bg-white transition-all duration-300 hover:bg-[#EFEBFF] text-[#633CFF] font-bold rounded-lg p-4 md:px-[1.69rem] md:py-[.69rem]", // outline
    ghost:
      "flex gap-1 items-center text-gray-500  hover:text-[#633CFF] transition-all duration-200 font-bold p-4 md:px-[1.69rem] md:py-[.69rem]", // ghost
    secondary:
      "flex gap-1 items-center bg-[#EFEBFF] text-[#633CFF] font-bold rounded-lg p-4 md:px-[1.69rem] md:py-[.69rem]",
    default:
      "flex gap-1 items-center bg-[#633CFF] text-white font-bold rounded-lg p-4 md:px-[1.69rem] md:py-[.69rem] disabled:bg-opacity-50", // default
    destructive:
      "flex gap-1 border-2 border-red-500 bg-white transition-all duration-300 hover:bg-[#EFEBFF] text-red-500 font-bold rounded-lg p-4 md:px-[1.69rem] md:py-[.69rem]", // destructive
  };

  return href ? (
    <a href={href}>
      <button
        className={twMerge(variants[variant], className)}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {icon ? icon : null}
        {children}
      </button>
    </a>
  ) : (
    <button
      className={twMerge(variants[variant], className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon ? icon : null}
      {children}
    </button>
  );
};

export default Button;

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
  const baseStyle =
    "flex gap-1 items-center font-bold py-[24px] px-4 rounded-lg max-h-6";

  const variants = {
    outline: `${baseStyle} flex gap-1 items-center border-2 border-[#633CFF] text-[#633CFF] hover:border-transparent hover:bg-[#633CFF] hover:text-white transition-all duration-300`, // outline
    ghost: `${baseStyle} text-gray-500 hover:text-[#633CFF] transition-all duration-200 font-bold hover:text-[#633CFF] hover:bg-[#EFEBFF]`, // ghost
    secondary: ` ${baseStyle} bg-[#EFEBFF] text-[#633CFF]`,
    default: `${baseStyle} flex gap-1 border-2 border-transparent items-center bg-[#633CFF] text-white hover:border-[#633CFF] hover:text-[#633CFF] hover:bg-white transition-all duration-300`, // default
    destructive: `${baseStyle} flex gap-1 items-center border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300`, // destructive
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
      className={twMerge(baseStyle, variants[variant], className)}
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

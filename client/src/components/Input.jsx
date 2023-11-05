import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const Input = ({
  control,
  name,
  type,
  label,
  error,
  required = false,
  minLength = 0,
  maxLength,
  icon,
  placeholder,
  className,
  validate,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: { value: required, message: `Can't be empty` },
        minLength: {
          value: minLength,
          message: `Please check again`,
        },
        maxLength: {
          value: maxLength,
          message: `Please check again`,
        },
        validate: validate,
      }}
      render={({ field }) => (
        <div className="grid gap-1 w-full">
          <label className={`capitalize text-sm ${error && "text-red-500"}`}>
            {label ? label : name}
          </label>
          <div className="relative">
            {icon ? (
              <img
                src={icon}
                alt="email"
                className="absolute left-4 top-3 w-4 h-4"
              />
            ) : null}
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              {...field}
              className={twMerge(
                className,
                `border-2 border-gray-100 rounded-md py-[7px]  ${
                  icon ? "pl-10" : "px-3"
                } ${
                  error && "border-red-300"
                } placeholder:text-sm w-full outline-none focus:border-[#633CFF] focus:shadow-xl focus:shadow-[#e9e4ff] transition-all duration-300`
              )}
            />
            <p className="text-red-500 text-xs absolute right-2 top-3">
              {error && error}
            </p>
          </div>
        </div>
      )}
    />
  );
};

export default Input;

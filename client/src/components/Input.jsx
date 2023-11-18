import { useEffect } from "react";
import { useState } from "react";
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
  nolabel,
  dropdownValue,
  onClick,
  disabled,
  onBlur,
}) => {
  const [fieldManager, setFieldManager] = useState(undefined);
  const rules = {
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
  };

  const inputStyles = `border-2 border-gray-100 rounded-md py-[7px]  ${
    icon ? "pl-10" : "px-3"
  } ${
    error && "border-red-300"
  } placeholder:text-sm w-full outline-none focus:border-[#633CFF] focus:shadow-xl focus:shadow-[#e9e4ff] transition-all duration-300`;

  useEffect(() => {
    if (dropdownValue && fieldManager) {
      fieldManager.onChange(dropdownValue);
    }
  }, [dropdownValue, fieldManager]);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        if (!fieldManager) {
          setFieldManager(field);
        }

        return (
          <div className="grid gap-1 w-full flex-1">
            {!nolabel && (
              <label
                className={`capitalize text-sm ${error && "text-red-500"}`}
              >
                {label ? label : name}
              </label>
            )}
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
                disabled={disabled}
                value={dropdownValue || field.value}
                onBlur={onBlur ? onBlur : field.onBlur}
                onChange={(e) => {
                  const newValue = dropdownValue || e.target.value;
                  field.onChange(newValue);
                }}
                placeholder={placeholder}
                onClick={onClick}
                className={twMerge(className, inputStyles)}
              />
              <p className="text-red-500 text-xs absolute right-2 top-3">
                {error && error}
              </p>
            </div>
          </div>
        );
      }}
    />
  );
};

export default Input;

import React, { useState } from "react";
import Input from "./Input";

const Dropdown = ({ options, control, name }) => {
  const [value, setValue] = useState("");
  const [icon, setIcon] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleChange = (v) => {
    setValue(v.value);
    setIcon(v.icon);
    setOpen(false);
  };

  return (
    <div className="relative">
      <Input
        value={value}
        control={control}
        name={name}
        icon={icon}
        label={"Platform"}
        className="bg-white outline-none  caret-transparent cursor-pointer"
        onClick={() => (!open ? setOpen(true) : setOpen(false))}
      />
      {/* <div
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{ zIndex: 1, cursor: "pointer" }}
      /> */}
      {open ? (
        <div
          onBlur={() => setOpen(false)}
          className={`absolute top-20 border-[1px] border-gray-300 bg-white w-full px-4 transition-all duration-200 transform origin-top opacity-100 rounded-xl shadow-xl max-h-[300px] overflow-y-scroll`}
        >
          {options.map((value, idx) => (
            <p
              key={idx}
              onClick={() => handleChange(value)}
              className={`cursor-pointer px-1 flex gap-2 text-gray-500 ${
                idx < options.length - 1 && "border-b-2"
              } py-4`}
            >
              <img src={value.icon} alt="icon" /> {value.value}
            </p>
          ))}
        </div>
      ) : (
        <div
          className={`absolute top-17 bg-white w-full p-4 transition-all duration-200 transform origin-top opacity-0`}
        ></div>
      )}
    </div>
  );
};

export default Dropdown;

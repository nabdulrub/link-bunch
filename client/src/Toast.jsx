const Toast = ({ message, show, icon }) => {
  return (
    <div
      className={`flex bg-[#333333] text-white p-2 gap-2 rounded-xl absolute ${
        show ? "bottom-10 opacity-100" : "bottom-0 opacity-0"
      } left-1/2 transform -translate-x-1/2 transition-all duration-500`}
    >
      {icon}
      <p>{message}</p>
    </div>
  );
};

export default Toast;

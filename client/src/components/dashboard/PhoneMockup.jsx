import React from "react";
import mockup from "../../assets/images/illustration-phone-mockup.svg";

const PhoneMockup = () => {
  return (
    <div className="bg-white h-full flex-[.6] rounded-xl hidden place-items-center lg:grid">
      <img src={mockup} alt="mockup" />
    </div>
  );
};

export default PhoneMockup;

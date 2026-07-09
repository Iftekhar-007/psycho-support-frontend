import { Footer2 } from "@/components/footer2";
import { Navbar1 } from "@/components/navbar1";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar1 />
      {children}
      <Footer2 />
    </div>
  );
};

export default CommonLayout;

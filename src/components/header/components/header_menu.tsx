"use client";
import React, { useState } from "react";
import HeaderMenuButton from "./header_menu_button";

export default function HeaderMenu() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className={`flex flex-col w-[25px] h-[30px] items-center justify-center relative ${
          menuIsOpen ? "" : "gap-y-[3px]"
        }`}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        <div className={`w-[25px] h-[3px] bg-background rounded-sm duration-200 ${menuIsOpen ? "rotate-45 absolute" : ""}`} />
        <div className={`w-[25px] h-[3px] bg-background rounded-sm duration-200 ${menuIsOpen ? "rotate-[135deg] absolute" : ""}`}/>
        <div className={`w-[25px] h-[3px] bg-background rounded-sm duration-200 ${menuIsOpen ? "hidden" : ""}`} />
      </button>
      {menuIsOpen && (
        <div className="absolute right-0 bg-[#EBEBEB] px-[10px] py-[5px] rounded-lg border-2 border-black z-10">
          <ul className="font-medium flex flex-col gap-y-[5px]">
            <HeaderMenuButton
              title={"Sapatos"}
              href={""}
              onClick={handleMenuClose}
            />
            <HeaderMenuButton
              title={"Carteiras"}
              href={""}
              onClick={handleMenuClose}
            />
            <HeaderMenuButton
              title={"Cintos"}
              href={""}
              onClick={handleMenuClose}
            />
          </ul>
        </div>
      )}
    </div>
  );
}

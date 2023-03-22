"use client";

import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { useAuth } from "./../../context/AuthContext";

export default function Header() {
  const { setOpen, open, currentUser } = useAuth();

  return (
    <div className="flex items-center justify-between px-3 py-2 mx-auto max-w-[1500px] ">
      <div className="uppercase">
        <h1 className="font-semibold select-none md:text-lg">logo</h1>
      </div>
      {currentUser && (
        <div
          onClick={() => setOpen(!open)}
          className="p-1 font-bold transition rounded-full cursor-pointer md:text-xl hover:bg-white hover:text-black"
        >
          <CiUser />
        </div>
      )}
    </div>
  );
}

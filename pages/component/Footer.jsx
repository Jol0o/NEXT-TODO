import React from "react";
import { BsTwitter } from "react-icons/bs";
import { DiGithubAlt } from "react-icons/di";
import { AiFillFacebook } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="flex justify-center items-center mx-auto max-w-[1500px] text-2xl py-5 gap-5">
      <div className="transition duration-300 hover:opacity-40">
        <DiGithubAlt />
      </div>
      <div className="transition duration-300 hover:opacity-40">
        <BsTwitter />
      </div>
      <div className="transition duration-300 hover:opacity-40">
        <AiFillFacebook />
      </div>
    </div>
  );
}

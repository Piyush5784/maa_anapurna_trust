"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RxCross1 } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import { ModeToggle } from "./theme-toggle";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { useSession } from "next-auth/react";

export const Topbar = ({ showDuration = true }: { showDuration?: boolean }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/About" },
    { label: "Services", href: "/Services" },
    // { label: "Pages", href: "/Pages" },
    { label: "Contact", href: "/Contact" },
    { label: "Stories", href: "/Stories" },
  ];
  return (
    <div>
      <motion.div
        initial={{ y: "-400px" }}
        animate={{ y: "0px" }}
        className={`h-[150px] ${showDuration && "duration-100"}`}
      >
        <div className="flex items-center justify-center">
          <div className="rounded-lg border md:w-[80%] w-full  shadow-lg flex justify-between m-4  p-3 items-center">
            <Link href={"/"}>
              <Image
                height={50}
                width={50}
                alt="logo"
                src={"/logo.jpeg"}
                className="rounded-full"
              ></Image>
            </Link>
            <div className="md:flex gap-10 hidden ">
              {navItems.map((item, idx) => (
                <Link
                  href={item.href}
                  key={idx}
                  className="hover:underline cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="md:flex gap-4 hidden ">
              {" "}
              <LoginButton />
              <Button
                asChild
                className="hover:scale-105 cursor-pointer hover:bg-white hover:text-black border hover:border-black"
              >
                <Link
                  href={"https://pages.razorpay.com/pl_R4K9t3f0IqJQ49/view"}
                >
                  {" "}
                  Donate
                </Link>
              </Button>
            </div>
            <div className="md:hidden" onClick={() => setShowMenu((c) => !c)}>
              {showMenu ? <RxCross1 size={25} /> : <FiMenu size={25} />}
            </div>
          </div>
        </div>
        <div
          className={`flex duration-300 flex-col z-10 bg-white border justify-center items-center shadow-xl relative ${
            showMenu ? "top-0" : "top-[-400px]"
          }  m-4 rounded-3xl p-1`}
        >
          <div className={` w-full text-center p-2`}>
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className="w-full text-center border-b cursor-pointer p-2"
              >
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          <LoginButton />
        </div>
      </motion.div>
    </div>
  );
};

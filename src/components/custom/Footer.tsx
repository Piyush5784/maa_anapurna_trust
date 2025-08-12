import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b4d3a]  rounded-3xl max-w-6xl mx-auto mt-16 mb-6 px-6 py-8 md:py-10 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div className="flex flex-col gap-2 min-w-[200px]">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-full ">
              <Image
                src="/logo.jpeg"
                alt="Pracima Logo"
                width={36}
                height={36}
                className="rounded-full"
              />
            </div>
            <span className="text-white text-2xl font-bold">
              Maa Annapurna Trust
            </span>
          </div>
          <span className="text-white/90 mt-2 text-base">
            Great futures are built with a small charity
          </span>
        </div>
        <div className="flex flex-1 flex-wrap justify-between gap-8 md:gap-16 text-white text-base mt-6 md:mt-0">
          <div className="flex flex-col gap-2 min-w-[120px]">
            <Link href="#" className="hover:underline">
              Our Works
            </Link>
            <Link href="#" className="hover:underline">
              Our Story
            </Link>
            <Link href="#" className="hover:underline">
              Partner with Us
            </Link>
          </div>
          <div className="flex flex-col gap-2 min-w-[120px]">
            <Link href="#" className="hover:underline">
              Donate
            </Link>
            <Link href="#" className="hover:underline">
              Careers
            </Link>
            <Link href="#" className="hover:underline">
              Internships
            </Link>
          </div>
          <div className="flex flex-col gap-2 min-w-[120px]">
            <Link href="#" className="hover:underline">
              Instagram
            </Link>
            <Link href="#" className="hover:underline">
              Twitter
            </Link>
            <Link href="#" className="hover:underline">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-t border-white/20 pt-6 gap-4">
        <span className="text-white/70 text-sm">
          © 2023 Copyright. Maa Annapurna Trust
        </span>
        <Link
          href="https://pages.razorpay.com/pl_R4K9t3f0IqJQ49/view"
          className="ml-auto bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 w-max transition-colors"
        >
          Donate now <ArrowUpRight size={18} />
        </Link>
      </div>
    </footer>
  );
}

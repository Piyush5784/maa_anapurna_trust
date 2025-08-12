import { Cards } from "@/components/custom/cards";
import Footer from "@/components/custom/Footer";
import Insights from "@/components/custom/Insights";
import InsightsSection from "@/components/custom/Insights-Section";
import OurWorks from "@/components/custom/OurWorks";
import Providing from "@/components/custom/Providing";
import Steps from "@/components/custom/Steps";
import Testimonials from "@/components/custom/Testimonials";
import { Topbar } from "@/components/custom/topbar";
import { Button } from "@/components/ui/button";
import { Play, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUp } from "react-icons/go";

export default function Home() {
  return (
    <>
      <Topbar />

      <div className="bg-yellow-300 md:h-48 md:w-[600px] blur-3xl opacity-20 absolute left-98 rounded-full"></div>

      <div className="w-full pb-10">
        <p className="text-center md:text-7xl font-bold font-playfair text-4xl px-1">
          Great Futures are built <br className="md:block hidden" /> with a
          small charity
        </p>
        <p className="text-center font-light pt-10 md:text-xl">
          {" "}
          The world's largest social fundraising platform, <br /> optimized for
          your charity in a more easy way.
        </p>

        <div className="flex items-center  gap-2 justify-center pt-10">
          <Button
            size={"lg"}
            className="bg-primary text-black hover:scale-105 duration-100 cursor-pointer flex gap-2 items-center justify-center  rounded-full"
          >
            <Play size={16} /> Watch Video
          </Button>
          <Button
            asChild
            size={"lg"}
            className="bg-black hover:bg-black flex items-center justify-center gap-2 cursor-pointer hover:scale-105 duration-100  text-white md:px-10 px-6 py-4  rounded-full"
          >
            <Link href={"https://rzp.io/rzp/AzVOiOzY"}>Donate now </Link>
          </Button>
        </div>
      </div>

      {/* Donation Cards Section */}
      <Cards />
      <InsightsSection />
      <Steps />
      <OurWorks />
      <Providing />
      <Testimonials />

      <section className="bg-white px-5 w-full md:px-40">
        <div className=" md:px-6 py-12 mx-auto">
          <div className="text-center ">
            <p className="  text-black font-bold text-4xl">Contact us</p>

            <h1 className="mt-2 text-2xl font-semibold  md:text-3xl  text-black">
              We’d love to hear from you
            </h1>

            <p className="mt-3 text-gray-500 ">Chat to our friendly team.</p>
          </div>

          <Image
            height={600}
            width={800}
            className="object-cover w-full h-64 mt-10 rounded-lg lg:h-96"
            src="/testimonials/group.jpg"
            alt="reload"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}

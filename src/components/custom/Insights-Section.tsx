"use client";
import { GoArrowUp } from "react-icons/go";
import Insights from "./Insights";
import { motion } from "motion/react";
import Image from "next/image";

const InsightsSection = () => {
  return (
    <div className="md:py-12  lg:py-20">
      <Insights />
      <div className=" ">
        <div className="max-w-7xl mx-auto ">
          <div className="flex flex-col p-4 md:p-0 lg:flex-row items-center justify-between md:gap-28">
            {/* Image with animation */}
            <motion.div
              className="flex-1 w-full md:pl-10 "
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                height={500}
                width={500}
                src="/cards/group-2.jpg"
                alt="Children receiving help and education"
                className="rounded-lg w-full h-auto object-cover max-w-lg mx-auto lg:mx-0"
              />
            </motion.div>

            {/* Text with animation */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-4xl pt-5 md:pt-0 lg:text-5xl font-bold leading-tight">
                Building Hope <br className="hidden sm:block" />
                Through Compassion
              </h2>
              <p className="pt-6 dark:text-white sm:pt-8 lg:pt-10 text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700 max-w-2xl mx-auto lg:mx-0">
                Our mission is creating lasting change in communities around the
                world. We believe every person deserves access to basic
                necessities, quality education, and opportunities to thrive.
                Through your support, we're able to reach those who need it most
                and build stronger, more resilient communities.
              </p>

              {/* Button with animation */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-black mt-8 sm:mt-10 cursor-pointer duration-200 rounded-full border-black border text-base sm:text-lg"
              >
                <div className="flex gap-2 items-center justify-center">
                  Our Mission{" "}
                  <GoArrowUp size={20} className="sm:w-6 sm:h-6 rotate-45" />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;

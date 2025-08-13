"use client";
import { motion } from "motion/react";
import Image from "next/image";

const Steps = () => {
  return (
    <div className="bg-[#fff0a3] dark:bg-gray-900  p-5">
      <div className="text-center p-10">
        <motion.p
          className="font-bold text-4xl text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How We Make Impact
        </motion.p>
        <motion.p
          className="pt-5 text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our transparent process ensures every donation creates{" "}
          <br className="hidden md:block" />
          meaningful change in communities worldwide
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row justify-around">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="text-[#5f5f5f] dark:text-gray-400">STEP 01</span>
            <p className="text-4xl font-semibold text-gray-900 dark:text-white">
              Identify Need
            </p>
            <p className="py-5 text-gray-700 dark:text-gray-300">
              We work directly with local communities to identify their{" "}
              <br className="hidden md:block" />
              most pressing needs, whether it's access to clean water,{" "}
              <br className="hidden md:block" />
              education, healthcare, or emergency relief support.
            </p>
            <div className="h-[1px] bg-gray-400 dark:bg-gray-600 rounded my-4"></div>

            <span className="text-[#5f5f5f] dark:text-gray-400">STEP 02</span>
            <p className="text-4xl font-semibold text-gray-900 dark:text-white">
              Take Action
            </p>
            <p className="py-5 text-gray-700 dark:text-gray-300">
              Your donations are immediately put to work through our{" "}
              <br className="hidden md:block" />
              network of trusted partners and volunteers on the ground{" "}
              <br className="hidden md:block" />
              to deliver aid and implement sustainable solutions.
            </p>
            <div className="h-[1px] bg-gray-400 dark:bg-gray-600 rounded my-4"></div>

            <span className="text-[#5f5f5f] dark:text-gray-400">STEP 03</span>
            <p className="text-4xl font-semibold text-gray-900 dark:text-white">
              Track Impact
            </p>
            <p className="py-5 text-gray-700 dark:text-gray-300">
              We provide regular updates and transparent reporting{" "}
              <br className="hidden md:block" />
              so you can see exactly how your contribution is making{" "}
              <br className="hidden md:block" />a real difference in people's
              lives.
            </p>
            <div className="h-[1px] bg-gray-400 dark:bg-gray-600 rounded mb-10 md:mb-0"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src={"/child3-full.png"}
            alt="Volunteers helping in community"
            height={300}
            width={500}
            className="rounded-lg relative -top-2"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Steps;

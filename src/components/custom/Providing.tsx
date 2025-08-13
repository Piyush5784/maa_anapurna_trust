"use client";
import Image from "next/image";
import { motion } from "motion/react";

const Providing = () => {
  return (
    <div className="lg:h-screen p-10 text-center">
      <motion.p
        className="py-10 text-6xl font-bold"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        What We Provide
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        We are dedicated to nourishing communities across Assam with wholesome
        meals <br className="hidden md:block" />
        and compassionate support to create food security for all families.
      </motion.p>

      <div className="flex items-center flex-col md:pl-20 lg:flex-row gap-32 p-5 pb-0 pt-10 justify-center">
        <motion.div
          className="flex flex-col items-center justify-center gap-3 max-w-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative w-80 h-60 mb-6">
            <Image
              src="/cards/child3.png"
              alt="Child receiving food assistance"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-3xl py-5">Food Security</p>
            <p className="text-gray-500">
              We provide fresh, nutritious meals and food{" "}
              <br className="hidden md:block" />
              packages to families across Assam. Our{" "}
              <br className="hidden md:block" />
              mobile kitchens reach remote villages daily.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center gap-3 max-w-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative w-80 h-60 mb-6">
            <Image
              src="/testimonials/clothes.jpg"
              alt="Clothing donation and assistance"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-3xl py-5">Emergency Relief</p>
            <p className="text-gray-500">
              During floods and disasters in Assam,{" "}
              <br className="hidden md:block" />
              we provide immediate food relief{" "}
              <br className="hidden md:block" />
              to affected communities and families.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center gap-3 max-w-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative w-80 h-60 mb-6">
            <Image
              src="/sections/plants.jpg"
              alt="Tree planting and environmental restoration"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-3xl py-5">Tree Planting</p>
            <p className="text-gray-500">
              We organize tree planting drives{" "}
              <br className="hidden md:block" />
              across Assam to restore forests and{" "}
              <br className="hidden md:block" />
              combat climate change in our region.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Providing;

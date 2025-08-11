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
        We are dedicated to supporting communities worldwide with essential
        needs <br className="hidden md:block" />
        and environmental restoration to create a sustainable future for all.
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
              We provide nutritious meals and food{" "}
              <br className="hidden md:block" />
              packages to families in need. Our{" "}
              <br className="hidden md:block" />
              goal is ensuring no one goes hungry.
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
            <p className="text-3xl py-5">Clothing Assistance</p>
            <p className="text-gray-500">
              We distribute clothing and essential{" "}
              <br className="hidden md:block" />
              items to those in need, ensuring{" "}
              <br className="hidden md:block" />
              dignity and comfort for everyone.
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
              src="/cards/group-2.jpg"
              alt="Tree planting and environmental restoration"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-3xl py-5">Tree Planting</p>
            <p className="text-gray-500">
              We plant trees to combat climate{" "}
              <br className="hidden md:block" />
              change and restore ecosystems for{" "}
              <br className="hidden md:block" />a healthier planet and future.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Providing;

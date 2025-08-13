"use client";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import Image from "next/image";

const OurWorks = () => {
  return (
    <div>
      <div className="p-4 bg-yellow-50 border">
        <div className="flex w-full md:px-14 flex-col md:flex-row justify-between items-start md:items-center mb-8 lg:mb-10 text-secondary-foreground gap-6 md:gap-8 lg:gap-16 max-w-7xl mx-auto">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl pt-4 lg:pt-10 leading-tight">
              Our Impact in Assam
            </h2>
            <p className="py-4 sm:py-6 lg:py-8 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
              Witness the transformative power of food security in communities
              across Assam through our dedicated food distribution programs.
            </p>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="pt-4 lg:pt-10">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                View all Donation Drive's
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row pb-20 justify-center items-start gap-8 md:gap-12 lg:gap-20 text-secondary-foreground  md:px-14 xl:px-32">
          <motion.div
            className="flex flex-col items-center text-center max-w-sm mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Image
              height={500}
              width={500}
              src={"/testimonials/boy-eating-food.jpg"}
              alt="Child receiving nutritious meal"
              className="rounded-lg object-cover w-full max-w-[400px] sm:max-w-[350px] h-64 sm:h-64 md:h-72"
            />
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold pt-6 sm:pt-8 lg:pt-10">
              Food Security
            </h3>
            <p className="pt-4 sm:pt-6 lg:pt-10 text-sm sm:text-base lg:text-lg leading-relaxed">
              Providing nutritious meals to children and families in need. Our
              food programs have reached over 10,000 people this year alone.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center max-w-sm mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              height={500}
              width={500}
              src={"/testimonials/childrens.jpeg"}
              alt="Children in education program"
              className="rounded-lg object-cover w-full max-w-[400px] sm:max-w-[350px] h-64 sm:h-64 md:h-72"
            />
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold pt-6 sm:pt-8 lg:pt-10">
              Education Access
            </h3>
            <p className="pt-4 sm:pt-6 lg:pt-10 text-sm sm:text-base lg:text-lg leading-relaxed">
              Building schools and providing educational resources to
              underserved communities. Empowering the next generation through
              knowledge and opportunity.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center max-w-sm mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Image
              height={500}
              width={500}
              src={"/testimonials/Volenteer.jpeg"}
              alt="Volunteers helping in community"
              className="rounded-lg object-cover w-full max-w-[400px] sm:max-w-[350px] h-64 sm:h-64 md:h-72"
            />
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold pt-6 sm:pt-8 lg:pt-10">
              Community Support
            </h3>
            <p className="pt-4 sm:pt-6 lg:pt-10 text-sm sm:text-base lg:text-lg leading-relaxed">
              Working directly with local communities to build sustainable
              infrastructure and provide emergency relief when disasters strike.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OurWorks;

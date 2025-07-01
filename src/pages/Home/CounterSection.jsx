import React from "react";
import CountUp from "react-countup";
import { FaUtensils, FaAward, FaHandshake, FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  {
    id: 1,
    number: 1176,
    label: "Customers Served",
    icon: <FaUtensils className="text-amber-400" size={24} />,
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  {
    id: 2,
    number: 1127,
    label: "Expert Chefs",
    icon: <FaUserTie className="text-amber-400" size={24} />,
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  {
    id: 3,
    number: 1219,
    label: "Happy Customers",
    icon: <FaHandshake className="text-amber-400" size={24} />,
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  {
    id: 4,
    number: 1268,
    label: "Awards Won",
    icon: <FaAward className="text-amber-400" size={24} />,
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
];

const CounterSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="relative overflow-hidden bg-gray-900 mt-10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0 opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-600/20 to-gray-900/50 z-10" />
      <div className="relative z-20 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {stats.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover="hover"
              className="flex flex-col items-center text-center p-6 group"
            >
              <div className="relative w-44 h-44 mb-8">
                <div className="absolute inset-0 rounded-full bg-orange-600/20 blur-lg group-hover:bg-orange-600/30 transition-all duration-500" />

                <div
                  className={`absolute inset-0 rounded-full ${item.color} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500`}
                >
                  <div className="absolute inset-4 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800">
                    <span className="text-3xl font-bold text-amber-400">
                      <CountUp
                        start={0}
                        end={item.number}
                        duration={3}
                        separator=","
                        enableScrollSpy
                        scrollSpyDelay={500}
                      >
                        {({ countUpRef }) => (
                          <span ref={countUpRef} />
                        )}
                      </CountUp>
                      <span className="text-orange-400">+</span>
                    </span>
                  </div>
                </div>

                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 p-3 rounded-full shadow-lg border border-gray-800"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {item.icon}
                </motion.div>

                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-amber-400"
                    style={{
                      left: `${Math.cos((i * Math.PI) / 2) * 35 + 50}%`,
                      top: `${Math.sin((i * Math.PI) / 2) * 35 + 50}%`,
                    }}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {item.label}
              </h3>
              <p className="text-amber-500 text-sm font-medium tracking-wider">
                SINCE 2015
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-orange-600/10 blur-3xl" />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-amber-600/10 blur-3xl" />

        <div className="absolute inset-0 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,black)]">
          <div className="absolute inset-0 bg-[size:20px_20px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)]"></div>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;

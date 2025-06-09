import React from "react";
import CountUp from "react-countup";
import { FaUtensils, FaAward, FaHandshake, FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  {
    id: 1,
    number: 1176,
    label: "Customers Served",
    icon: <FaUtensils className="text-orange-500" size={24} />,
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
  },
  {
    id: 2,
    number: 1127,
    label: "Expert Chefs",
    icon: <FaUserTie className="text-orange-500" size={24} />,
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
  },
  {
    id: 3,
    number: 1219,
    label: "Happy Customers",
    icon: <FaHandshake className="text-orange-500" size={24} />,
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
  },
  {
    id: 4,
    number: 1268,
    label: "Awards Won",
    icon: <FaAward className="text-orange-500" size={24} />,
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
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
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background image with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80')`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover="hover"
              className="flex flex-col items-center text-center p-6"
            >
              {/* Animated circle with floating elements */}
              <div className="relative w-40 h-40 mb-6">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-md group-hover:bg-orange-500/20 transition-all duration-500" />
                
                {/* Main circle */}
                <div className={`absolute inset-0 rounded-full ${item.color} flex items-center justify-center shadow-lg`}>
                  <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">
                      <CountUp
                        start={0}
                        end={item.number}
                        duration={3}
                        separator=","
                        scrollSpyDelay={500}
                        enableScrollSpy
                      />
                      <span className="text-orange-500">+</span>
                    </span>
                  </div>
                </div>

                {/* Floating icon */}
                <motion.div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-md"
                  initial={{ y: 0 }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {item.icon}
                </motion.div>

                {/* Floating dots */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white"
                    style={{
                      left: `${Math.cos((i * Math.PI) / 2) * 30 + 50}%`,
                      top: `${Math.sin((i * Math.PI) / 2) * 30 + 50}%`,
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

              <h3 className="text-xl font-bold text-white mb-2">
                {item.label}
              </h3>
              <p className="text-amber-300 text-sm font-medium">Since 2015</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl" />
      </div>
    </div>
  );
};

export default CounterSection;
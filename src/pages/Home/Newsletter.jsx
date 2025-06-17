import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiGift, FiClock, FiChevronRight } from "react-icons/fi";
import { GiMeal, GiChopsticks, GiSaucepan, GiFruitBowl, GiCook } from "react-icons/gi";
import { FaLeaf, FaWineGlassAlt, FaPepperHot } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const cuisines = [
    { name: "Italian", icon: <GiSaucepan />, color: "from-red-300 to-orange-200" },
    { name: "Asian", icon: <GiChopsticks />, color: "from-amber-300 to-yellow-200" },
    { name: "Vegetarian", icon: <FaLeaf />, color: "from-green-300 to-emerald-200" },
    { name: "Mediterranean", icon: <FaWineGlassAlt />, color: "from-sky-300 to-cyan-200" },
    { name: "Spicy", icon: <FaPepperHot />, color: "from-rose-300 to-pink-200" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <div className="relative py-16 overflow-hidden bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10 dark:border-white/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Visual */}
            <div className="relative h-64 lg:h-auto min-h-[400px] bg-gradient-to-br from-amber-900/70 to-gray-900/80 flex items-center justify-center p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white text-center"
              >
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-400 p-4 rounded-full mb-6">
                  <FiGift className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Join Our Savory Spoon Journey</h3>
                <p className="text-amber-100 mb-6 max-w-md mx-auto">
                  Subscribe now and receive exclusive recipes, chef secrets & offers.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 inline-block">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                      20%
                    </span>
                    <span className="text-white font-medium">OFF</span>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-amber-200 mt-1">
                    Your first reservation
                  </p>
                </div>
              </motion.div>

              {/* Floating Icon */}
              <motion.div 
                className="absolute top-1/4 left-1/4 text-amber-400/20 text-8xl"
                animate={{ rotate: [0, 15, -15, 0], y: [0, -20, 20, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              >
                <GiCook />
              </motion.div>
            </div>

            {/* Right Form */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-stone-100 to-stone-50 dark:from-gray-800 dark:to-gray-900">
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-8 h-full flex flex-col items-center justify-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-300 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                      Welcome to Our Foodie Family!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Your 20% discount code is on its way to your inbox.
                    </p>
                    <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-xl p-4 inline-block">
                      <p className="text-lg font-mono font-bold text-amber-800">GOURMET20</p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                      Check your promotions tab if you don't see our email within 5 minutes.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="h-full"
                  >
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                      Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Difference</span>
                    </h2>

                    <ul className="grid grid-cols-1 gap-3 mb-8 text-gray-700 dark:text-gray-200">
                      {[{ icon: <GiMeal className="text-amber-500" />, text: "Weekly chef-curated recipes" },
                        { icon: <FiClock className="text-amber-500" />, text: "Early access to seasonal menus" },
                        { icon: <FiGift className="text-amber-500" />, text: "Exclusive discounts" },
                        { icon: <GiCook className="text-amber-500" />, text: "Behind-the-scenes secrets" }].map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          <span className="mt-1 mr-3">{item.icon}</span>
                          <span>{item.text}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                          Your Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 pl-10 bg-white/80 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="your@email.com"
                          />
                          <FiMail className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                          Your Cuisine Preference (Optional)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {cuisines.map((cuisine) => (
                            <motion.button
                              key={cuisine.name}
                              type="button"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className={`p-2 rounded-lg border transition-all duration-200 hover:scale-105 ${
                                selectedCuisine === cuisine.name
                                  ? `bg-gradient-to-r ${cuisine.color} text-gray-900 font-semibold border-transparent shadow-md`
                                  : 'bg-white/80 dark:bg-gray-800 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              onClick={() =>
                                setSelectedCuisine(
                                  cuisine.name === selectedCuisine ? null : cuisine.name
                                )
                              }
                            >
                              <div className="flex flex-col items-center text-lg">
                                <div className="mb-1">{cuisine.icon}</div>
                                <span className="text-xs font-medium">{cuisine.name}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.3)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 py-4 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group flex items-center justify-center"
                      >
                        <span className="relative z-10 flex items-center">
                          Subscribe Now <FiChevronRight className="ml-1" />
                        </span>
                      </motion.button>

                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        By subscribing, you agree to our <a href="#" className="text-amber-600 hover:underline">Privacy Policy</a>.<br />
                        We respect your inbox - no spam, ever.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Newsletter;

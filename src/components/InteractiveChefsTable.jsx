import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiChefToque, GiCookingPot, GiMeal } from 'react-icons/gi';
import { FaStar, FaRegClock, FaUtensils } from 'react-icons/fa';

const InteractiveChefsTable = () => {
  const [selectedChef, setSelectedChef] = useState(null);
  const [activeTab, setActiveTab] = useState('signature');

  const chefs = [
    {
      id: 1,
      name: "Marco Russo",
      position: "Executive Chef",
      experience: "15 years",
      specialty: "Italian Cuisine",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1374&q=80",
      bio: "Trained in Florence, brings authentic Tuscan flavors with modern techniques.",
      dishes: [
        {
          id: 1,
          name: "Truffle Risotto",
          description: "Creamy Arborio rice with wild mushrooms and black truffle",
          prepTime: "25 mins",
          type: "signature"
        },
        {
          id: 2,
          name: "Osso Bucco",
          description: "Milanese-style braised veal shanks with gremolata",
          prepTime: "3.5 hours",
          type: "signature"
        }
      ]
    },
    {
      id: 2,
      name: "Sophie Laurent",
      position: "Pastry Chef",
      experience: "10 years",
      specialty: "French Patisserie",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1374&q=80",
      bio: "Paris-trained pastry artist specializing in delicate desserts and viennoiserie.",
      dishes: [
        {
          id: 1,
          name: "Soufflé au Chocolat",
          description: "Airy chocolate soufflé with crème anglaise",
          prepTime: "35 mins",
          type: "signature"
        },
        {
          id: 2,
          name: "Tarte Tatin",
          description: "Caramelized upside-down apple tart with vanilla ice cream",
          prepTime: "1 hour",
          type: "signature"
        }
      ]
    },
    {
      id: 3,
      name: "Raj Patel",
      position: "Sous Chef",
      experience: "8 years",
      specialty: "Indian Fusion",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1374&q=80",
      bio: "Combines traditional Indian spices with contemporary plating techniques.",
      dishes: [
        {
          id: 1,
          name: "Lamb Rogan Josh",
          description: "Kashmiri-style lamb curry with aromatic spices",
          prepTime: "4 hours",
          type: "signature"
        },
        {
          id: 2,
          name: "Masala Dosa",
          description: "Crispy rice crepe with spiced potato filling",
          prepTime: "1 hour",
          type: "signature"
        }
      ]
    }
  ];

  const fallbackImage = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1470&q=80";

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-orange-500 to-amber-600 dark:from-orange-700 dark:to-orange-900"></div>
      <div className="absolute top-1/4 right-0 w-32 h-32 rounded-full bg-amber-200/30 blur-3xl dark:bg-orange-400/10"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-10">
            Meet Our <span className="text-orange-500">Expert Chefs</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Discover the talented chefs behind your dining experience and their signature creations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {chefs.map((chef) => (
            <motion.div
              key={chef.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all ${selectedChef?.id === chef.id ? 'ring-4 ring-orange-400' : ''}`}
              onClick={() => setSelectedChef(chef)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={chef.image || fallbackImage} 
                  alt={chef.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => { e.target.src = fallbackImage; }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-2xl font-bold text-white">{chef.name}</h3>
                  <p className="text-amber-300">{chef.position}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full flex items-center">
                  <FaStar className="text-amber-500 mr-1" />
                  <span className="font-bold text-gray-800 dark:text-white">{chef.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <GiCookingPot className="text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-200">{chef.specialty}</span>
                </div>
                <div className="flex items-center">
                  <FaRegClock className="text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-200">{chef.experience} experience</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedChef && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedChef(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img 
                    src={selectedChef.image || fallbackImage} 
                    alt={selectedChef.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => { e.target.src = fallbackImage; }}
                  />
                  <button 
                    className="absolute top-4 right-4 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => setSelectedChef(null)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-3xl font-bold text-white">{selectedChef.name}</h3>
                    <p className="text-amber-300 text-xl">{selectedChef.position}</p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="bg-amber-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                          <GiChefToque className="text-orange-500 mr-2" />
                          Chef's Profile
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedChef.bio}</p>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <FaStar className="text-amber-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300"><strong>{selectedChef.rating}</strong> rating</span>
                          </div>
                          <div className="flex items-center">
                            <FaRegClock className="text-orange-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300"><strong>{selectedChef.experience}</strong> experience</span>
                          </div>
                          <div className="flex items-center">
                            <GiCookingPot className="text-orange-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">Specializes in <strong>{selectedChef.specialty}</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                        <button
                          className={`px-4 py-2 font-medium ${activeTab === 'signature' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
                          onClick={() => setActiveTab('signature')}
                        >
                          Signature Dishes
                        </button>
                      </div>

                      <div className="space-y-6">
                        {selectedChef.dishes
                          .filter(dish => dish.type === activeTab)
                          .map(dish => (
                            <motion.div
                              key={dish.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="sm:w-1/4 bg-white dark:bg-gray-900 p-3 rounded-lg flex items-center justify-center">
                                <GiMeal className="text-orange-500 text-4xl" />
                              </div>
                              <div className="sm:w-3/4">
                                <h4 className="text-xl font-bold text-gray-800 dark:text-white">{dish.name}</h4>
                                <p className="text-gray-600 dark:text-gray-300 my-2">{dish.description}</p>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <FaRegClock className="mr-1" />
                                  <span>Prep time: {dish.prepTime}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveChefsTable;

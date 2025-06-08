import React from "react";
import CountUp from "react-countup";
import { FaUtensils, FaAward, FaHandshake, FaUserTie } from "react-icons/fa";

const stats = [
  {
    id: 1,
    number: 1176,
    label: "Customer Serve",
    icon: <FaUtensils className="group-hover:text-orange-500 transition-colors" size={24} />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    number: 1127,
    label: "Experience Chef",
    icon: <FaUserTie className="group-hover:text-orange-500 transition-colors" size={24} />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    number: 1219,
    label: "Happy Customer",
    icon: <FaHandshake className="group-hover:text-orange-500 transition-colors" size={24} />,
    color: "from-green-500 to-emerald-500",
  },
  { 
    id: 4, 
    number: 1268, 
    label: "Winning Award", 
    icon: <FaAward className="group-hover:text-orange-500 transition-colors" size={24} />,
    color: "from-yellow-500 to-amber-500",
  },
];

const CounterSection = () => {
  return (
    <div className="relative">
      {/* Background image with stronger overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{ backgroundImage: `url('https://media.istockphoto.com/id/1407832840/photo/foods-enhancing-the-risk-of-cancer-junk-food.jpg?s=612x612&w=0&k=20&c=IBXz9XVfsZS-MM-AOW1kGel3WtgIDZpewFpNO2hGTGE=')` }}
      />
      
      {/* Dark overlay with opacity - increased darkness for better contrast */}
      <div className="absolute inset-0 bg-black/60 z-10 " />
      
      {/* Content */}
      <div className="relative z-20 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col items-center justify-center text-center p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-500"
            >
              <div className="relative w-32 h-32 mb-6">
                {/* Animated gradient border */}
                <div className={`absolute inset-0 rounded-full p-1 bg-gradient-to-r ${item.color} animate-spin-slow`}>
                  <div className="h-full w-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 rounded-full shadow-lg shadow-orange-500/20 dark:shadow-orange-500/10 group-hover:shadow-orange-500/40 transition-all duration-300" />
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r dark:from-white from-gray-800 to-gray-600 dark:to-gray-300 z-10">
                      <CountUp end={item.number} duration={3} /> +
                    </span>
                  </div>
                </div>
                
                {/* Floating dots animation */}
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className={`absolute rounded-full w-2 h-2 bg-orange-500 opacity-70`}
                    style={{
                      top: `${Math.sin(i * Math.PI / 4) * 40 + 50}%`,
                      left: `${Math.cos(i * Math.PI / 4) * 40 + 50}%`,
                      transform: 'translate(-50%, -50%)',
                      animation: `float 3s ease-in-out ${i * 0.4}s infinite alternate`
                    }}
                  />
                ))}
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800 p-4 rounded-full mb-4 shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-white dark:text-gray-100">
                {item.label}
              </h3>
              <p className="text-orange-400 text-sm mt-1">Since 2015</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CounterSection;
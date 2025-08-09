import {
  FiUsers,
  FiShoppingCart,
  FiPackage,
  FiTrendingUp,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosSecure("/total-collection");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {isError.message}</p>;

  const chartData = [
    { name: "Food", value: data.TotalFood },
    { name: "Purchases", value: data.TotalPurchase },
    { name: "Users", value: data.TotalUser },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Dashboard Overview
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card Template */}
        {[
          {
            label: "Total Food Items",
            value: data.TotalFood,
            icon: <FiPackage size={24} />,
            note: "+2.5% from last month",
          },
          {
            label: "Total Purchases",
            value: data.TotalPurchase,
            icon: <FiShoppingCart size={24} />,
            note: "+12.5% from last month",
          },
          {
            label: "Total Users",
            value: data.TotalUser,
            icon: <FiUsers size={24} />,
            note: "+1 new this month",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-amber-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {item.label}
                </p>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {item.value}
                </h2>
                <p className="text-sm text-amber-500 mt-1">{item.note}</p>
              </div>
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-300/20 text-amber-500">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Data Overview
            </h3>
            <div className="flex items-center text-amber-500">
              <FiTrendingUp className="mr-1" />
              <span className="text-sm">Trending</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  tick={{ fill: "#6B7280" }}
                />
                <YAxis stroke="#9CA3AF" tick={{ fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#F59E0B",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                  itemStyle={{ color: "#F59E0B" }}
                  labelStyle={{ fontWeight: "bold", color: "#1F2937" }}
                />
                <Bar
                  dataKey="value"
                  fill="#F59E0B"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1400}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Quick Summary
          </h3>
          <div className="space-y-4">
            {[
              {
                label: "Food Items",
                value: `${data.TotalFood} total items in inventory`,
                icon: <FiPackage size={18} />,
              },
              {
                label: "Purchases",
                value: `${data.TotalPurchase} total transactions`,
                icon: <FiShoppingCart size={18} />,
              },
              {
                label: "Active Users",
                value: `${data.TotalUser} users registered`,
                icon: <FiUsers size={18} />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center p-3 bg-amber-50 dark:bg-gray-700/30 rounded-lg"
              >
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-300/20 text-amber-500 mr-3">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-200">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-500 text-white rounded-lg">
            <div className="flex items-center">
              <FiTrendingUp size={24} className="mr-2" />
              <div>
                <p className="font-bold">System Health</p>
                <p className="text-sm opacity-90">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

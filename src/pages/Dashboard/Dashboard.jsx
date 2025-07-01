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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      {/*  Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Food Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-medium">Total Food Items</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {data.TotalFood}
              </h2>
              <p className="text-sm text-amber-500 mt-1">
                +2.5% from last month
              </p>
            </div>
            <div className="p-3 rounded-full bg-amber-100 text-amber-500">
              <FiPackage size={24} />
            </div>
          </div>
        </div>

        {/* Purchases Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-medium">Total Purchases</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {data.TotalPurchase}
              </h2>
              <p className="text-sm text-amber-500 mt-1">
                +12.5% from last month
              </p>
            </div>
            <div className="p-3 rounded-full bg-amber-100 text-amber-500">
              <FiShoppingCart size={24} />
            </div>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-medium">Total Users</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {data.TotalUser}
              </h2>
              <p className="text-sm text-amber-500 mt-1">+1 new this month</p>
            </div>
            <div className="p-3 rounded-full bg-amber-100 text-amber-500">
              <FiUsers size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#F59E0B",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#F59E0B" }}
                  labelStyle={{ fontWeight: "bold", color: "#1F2937" }}
                />
                <Bar
                  dataKey="value"
                  fill="#F59E0B"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-amber-50 rounded-lg">
              <div className="p-2 rounded-full bg-amber-100 text-amber-500 mr-3">
                <FiPackage size={18} />
              </div>
              <div>
                <p className="font-medium text-gray-700">Food Items</p>
                <p className="text-sm text-gray-500">
                  {data.TotalFood} total items in inventory
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-amber-50 rounded-lg">
              <div className="p-2 rounded-full bg-amber-100 text-amber-500 mr-3">
                <FiShoppingCart size={18} />
              </div>
              <div>
                <p className="font-medium text-gray-700">Purchases</p>
                <p className="text-sm text-gray-500">
                  {data.TotalPurchase} total transactions
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-amber-50 rounded-lg">
              <div className="p-2 rounded-full bg-amber-100 text-amber-500 mr-3">
                <FiUsers size={18} />
              </div>
              <div>
                <p className="font-medium text-gray-700">Active Users</p>
                <p className="text-sm text-gray-500">
                  {data.TotalUser} users registered
                </p>
              </div>
            </div>
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

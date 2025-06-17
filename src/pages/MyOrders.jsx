import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { FaTrash, FaUtensils } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import BackgroundTitle from "../components/BackgroundTitle";
import useApplicationApi from "../Hooks/useApplicationApi";

const MyOrders = () => {
  const { user, loading } = useAuth();
  const { fetchOrders, deleteOrder } = useApplicationApi();
  const queryClient = useQueryClient();

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: () => fetchOrders(user?.email),
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      toast.success("Order deleted successfully");
      queryClient.invalidateQueries(["orders", user?.email]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete order");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (loading || isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <BackgroundTitle title="My Orders" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-4 md:mb-0"
          >
            <div className="p-3 bg-amber-100 dark:bg-amber-800 rounded-full mr-3">
              <FaUtensils className="text-amber-600 dark:text-amber-300 text-xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              My{" "}
              <span className="text-amber-600 dark:text-amber-400">Orders</span>
            </h1>
          </motion.div>
        </div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-xl border-2 border-dashed border-amber-200 dark:border-amber-700"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-amber-100 dark:bg-amber-800 rounded-full">
                <FaUtensils className="text-amber-600 dark:text-amber-300 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-600 dark:text-amber-300 mb-6">
                You haven't placed any orders yet. Start exploring our menu!
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* TABLE VIEW - visible on md+ */}
            <div className="hidden md:block">
              <div className="overflow-hidden rounded-xl border border-amber-100 dark:border-amber-900 shadow-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-amber-100 dark:divide-amber-800">
                    <thead className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-800 dark:to-amber-900">
                      <tr>
                        <th className="py-5 px-6 text-left font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          Food Item
                        </th>
                        <th className="py-5 px-6 text-left font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="py-5 px-6 text-left font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="py-5 px-6 text-left font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="py-5 px-6 text-left font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          Ordered From
                        </th>
                        <th className="py-5 px-6 text-left font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          Order Date
                        </th>
                        <th className="py-5 px-6 text-left font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-amber-100 dark:divide-amber-800">
                      {orders.map((order, index) => (
                        <motion.tr
                          key={order._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-amber-50 dark:hover:bg-amber-900/50 transition-colors duration-200"
                        >
                          <td className="py-5 px-6">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border border-amber-100 dark:border-amber-700">
                                <img
                                  src={order.foodImage}
                                  alt={order.foodName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-2">
                                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                  {order.foodName}
                                </div>
                                <div className="text-sm text-amber-600 dark:text-amber-400">
                                  {order.foodCategory}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center text-lg font-medium text-gray-900 dark:text-gray-100">
                              <FaBangladeshiTakaSign className="mr-1 text-amber-600 dark:text-amber-400" />
                              {order.price}
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="text-lg font-medium text-center text-gray-900 dark:text-gray-100">
                              {order.quantity} item
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center text-lg font-bold text-gray-900 dark:text-gray-100">
                              <FaBangladeshiTakaSign className="mr-1 text-amber-600 dark:text-amber-400" />
                              {order.totalAmount ||
                                (order.price * order.quantity).toFixed(2)}
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="text-gray-700 dark:text-gray-300">
                              {order.buyerName || order.buyerEmail}
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                              {moment(
                                order.purchaseDate || order.createdAt
                              ).format("MMM Do YYYY")}
                              <br />
                              <span className="text-xs text-amber-600 dark:text-amber-400">
                                {moment(
                                  order.purchaseDate || order.createdAt
                                ).format("h:mm a")}
                              </span>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(order._id)}
                              className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all duration-200 disabled:opacity-50"
                              title="Delete"
                              disabled={deleteMutation.isLoading}
                            >
                              <FaTrash />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* CARD VIEW - visible on sm and below */}
            <div className="md:hidden grid grid-cols-1 gap-5">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-amber-100 dark:border-amber-800"
                >
                  <div className="p-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border border-amber-100 dark:border-amber-700 mr-4">
                        <img
                          src={order.foodImage}
                          alt={order.foodName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {order.foodName}
                        </h3>
                        <div className="flex items-center mt-1">
                          <FaBangladeshiTakaSign className="text-amber-600 dark:text-amber-400 mr-1" />
                          <span className="font-medium">{order.price}</span>
                          <span className="mx-2 text-gray-400">×</span>
                          <span className="font-medium">{order.quantity}</span>
                          <span className="mx-2 text-gray-400">=</span>
                          <FaBangladeshiTakaSign className="text-amber-600 dark:text-amber-400 mr-1" />
                          <span className="font-bold">
                            {order.totalAmount ||
                              (order.price * order.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          From: {order.foodOwnerName || order.foodOwnerEmail}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {moment(order.purchaseDate || order.createdAt).format(
                            "MMM Do YYYY, h:mm a"
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(order._id)}
                        className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all duration-200 disabled:opacity-50 flex items-center gap-1"
                        disabled={deleteMutation.isLoading}
                      >
                        <FaTrash /> Remove
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

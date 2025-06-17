import { FaEdit, FaTrash, FaPlus, FaUtensils } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../components/Loading";
import { useState } from "react";
import UpdateFoodModal from "../components/UpdateFoodModal";
import useAuth from "../Hooks/useAuth";
import BackgroundTitle from "../components/BackgroundTitle";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { motion } from "framer-motion";
import useApplicationApi from "../Hooks/useApplicationApi";

const MyFood = () => {
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchFoods, deleteFood } = useApplicationApi();

  const {
    data: foods = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["foods", user?.email],
    queryFn: () => fetchFoods(user?.email),
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFood,
    onSuccess: () => {
      toast.success("Food deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["foods", user?.email] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete food");
    },
  });

  const handleUpdate = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "This action cannot be undone. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#fff",
      backdrop: `
        rgba(0,0,0,0.5)
        url("/images/trash.gif")
        left top
        no-repeat
      `,
      customClass: {
        popup: "rounded-xl border border-amber-200 shadow-xl",
        confirmButton: "rounded-lg px-4 py-2",
        cancelButton: "rounded-lg px-4 py-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(user.email);
        deleteMutation.mutate({id, email: user?.email});
      }
    });
  };

  if (loading || isLoading) return <Loading />;

  return (
    <div>
      <BackgroundTitle title="My Food Collection" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 py-8">
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
              <span className="text-amber-600 dark:text-amber-400">Food</span>{" "}
              Items
            </h1>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/AddFood"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-5 py-3 rounded-lg shadow-lg transition-all duration-300 group"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Add New Food</span>
            </Link>
          </motion.div>
        </div>

        {foods.length === 0 ? (
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
                No Food Items Found
              </h3>
              <p className="text-gray-600 dark:text-amber-300 mb-6">
                You haven't added any food items yet. Start by adding your first
                delicious item!
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/AddFood"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg shadow transition-all duration-300"
                >
                  <FaPlus /> Add Your First Food
                </Link>
              </motion.div>
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
                          Food Details
                        </th>
                        <th className="py-5 px-6 text-left font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="py-5 px-6 text-left font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="py-5 px-6 text-left font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="py-5 px-6 text-left font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-amber-100 dark:divide-amber-800">
                      {foods.map((food, index) => (
                        <motion.tr
                          key={food._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-amber-50 dark:hover:bg-amber-900/50 transition-colors duration-200"
                        >
                          <td className="py-5 px-6">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border border-amber-100 dark:border-amber-700">
                                <img
                                  src={food.foodImage}
                                  alt={food.foodName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                  {food.foodName}
                                </div>
                                <div className="text-sm text-amber-600 dark:text-amber-400">
                                  {food.foodOrigin}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-200 capitalize">
                              {food.foodCategory}
                            </span>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center text-lg font-medium text-gray-900 dark:text-gray-100">
                              <FaBangladeshiTakaSign className="mr-1 text-amber-600 dark:text-amber-400" />
                              {food.price}
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center">
                              <div
                                className={`h-3 rounded-full ${
                                  food.quantity > 10
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                } flex-1 mr-2`}
                                style={{
                                  width: `${Math.min(100, food.quantity * 5)}%`,
                                }}
                              />
                              <span
                                className={`text-sm font-medium ${
                                  food.quantity > 10
                                    ? "text-green-800 dark:text-green-300"
                                    : "text-red-800 dark:text-red-300"
                                }`}
                              >
                                {food.quantity}{" "}
                                {food.quantity === 1 ? "item" : "items"}
                              </span>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex space-x-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdate(food)}
                                className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-all duration-200 disabled:opacity-50"
                                title="Edit"
                                disabled={deleteMutation.isLoading}
                              >
                                <FaEdit />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(food._id)}
                                className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all duration-200 disabled:opacity-50"
                                title="Delete"
                                disabled={deleteMutation.isLoading}
                              >
                                <FaTrash />
                              </motion.button>
                            </div>
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
              {foods.map((food, index) => (
                <motion.div
                  key={food._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-amber-100 dark:border-amber-800"
                >
                  <div className="p-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border border-amber-100 dark:border-amber-700 mr-4">
                        <img
                          src={food.foodImage}
                          alt={food.foodName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {food.foodName}
                        </h3>
                        <p className="text-sm text-amber-600 dark:text-amber-400 mb-1">
                          {food.foodOrigin}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-200 capitalize">
                            {food.foodCategory}
                          </span>
                          <span className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-gray-100">
                            <FaBangladeshiTakaSign className="mr-1 text-amber-600 dark:text-amber-400" />
                            {food.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1 mr-4">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
                              Stock:
                            </span>
                            <span
                              className={`text-sm font-medium ${
                                food.quantity > 10
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {food.quantity}{" "}
                              {food.quantity === 1 ? "item" : "items"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                food.quantity > 10
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${Math.min(100, food.quantity * 5)}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUpdate(food)}
                            className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-all duration-200 disabled:opacity-50"
                            title="Edit"
                            disabled={deleteMutation.isLoading}
                          >
                            <FaEdit />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(food._id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all duration-200 disabled:opacity-50"
                            title="Delete"
                            disabled={deleteMutation.isLoading}
                          >
                            <FaTrash />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {isModalOpen && selectedFood && (
          <UpdateFoodModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            food={selectedFood}
            onSuccess={() => {
              setIsModalOpen(false);
              refetch();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MyFood;

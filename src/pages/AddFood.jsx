import { useState } from "react";
import {
  FiUpload,
  FiSave,
  FiUser,
  FiMail,
  FiGlobe,
} from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import BackgroundTitle from "../components/BackgroundTitle";
import axios from "axios";
import Swal from "sweetalert2";

const AddFood = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Appetizer",
    "Rice Menu",
    "Dessert",
    "Beverage",
    "Snack",
    "Salad",
    "Soup",
  ];

  const countries = [
    "Bangladesh",
    "India",
    "China",
    "Japan",
    "Thailand",
    "Italy",
    "Mexico",
    "United States",
    "France",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    axios
      .post(`${import.meta.env.VITE_API_URL}/foods`, data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Food added successfully!",
            icon: "success",
          });
          e.target.reset();
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error adding food!",
          text: err.message,
          icon: "error",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900">
      <BackgroundTitle title="Add New Food Item" />

      <div className="py-12 px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-amber-100 dark:border-gray-700">
            <div className="bg-amber-600 px-6 py-3 dark:bg-amber-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Food Details
                </h2>
                <div className="bg-white/20 px-2 py-1 rounded-md text-xs text-white">
                  Required *
                </div>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                      Added By (Name)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-amber-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        readOnly
                        defaultValue={user?.displayName || ""}
                        className="w-full pl-10 px-3 py-2 border border-amber-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                      Added By (Email)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-amber-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        readOnly
                        defaultValue={user?.email || ""}
                        className="w-full pl-10 px-3 py-2 border border-amber-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                      Food Name *
                    </label>
                    <input
                      type="text"
                      name="foodName"
                      placeholder="e.g. Chicken Biryani"
                      className="w-full px-3 py-2 border border-amber-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                      Food Category *
                    </label>
                    <select
                      name="foodCategory"
                      className="w-full px-3 py-2 border border-amber-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category.toLowerCase().replace(" ", "-")}
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                      Available Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      placeholder="e.g. 10"
                      className="w-full px-3 py-2 border border-amber-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                      Price (Tk) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-300">৳</span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        min="1"
                        placeholder="e.g. 250"
                        className="w-full pl-8 px-3 py-2 border border-amber-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                    Food Origin (Country) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiGlobe className="h-5 w-5 text-amber-400" />
                    </div>
                    <select
                      name="foodOrigin"
                      className="w-full pl-10 px-3 py-2 border border-amber-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Select country of origin</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                    Food Image URL *
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="url"
                      name="foodImage"
                      placeholder="https://example.com/food-image.jpg"
                      className="flex-1 px-3 py-2 border border-amber-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-amber-100 dark:bg-gray-600 text-amber-700 dark:text-white rounded-md hover:bg-amber-200 dark:hover:bg-gray-500 transition-colors"
                      title="Upload image"
                    >
                      <FiUpload className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                    Food Description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe the food item including ingredients, preparation method, taste, etc."
                    className="w-full px-3 py-2 border border-amber-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                    rows="4"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    <FiSave className="mr-2 h-5 w-5" />
                    {isSubmitting ? "Adding Food Item..." : "Add Food Item"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;

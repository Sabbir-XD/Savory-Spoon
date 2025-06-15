import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaImage,
  FaUtensils,
  FaDollarSign,
  FaBoxes,
  FaGlobeAmericas,
  FaAlignLeft,
} from "react-icons/fa";
import axios from "axios";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Swal from "sweetalert2";

const UpdateFoodModal = ({ isOpen, onClose, food, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(food?.foodImage || "");

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

  const handleImageChange = (e) => {
    const url = e.target.value;
    setPreviewImage(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/foods/${food._id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.modifiedCount) {
        await Swal.fire({
          title: "Success!",
          text: "Food updated successfully",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
          timerProgressBar: true,
        });

        onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update food. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !food) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Update Food Details</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-amber-200 transition"
            disabled={isSubmitting}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Food Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUtensils className="text-amber-500" />
              </div>
              <input
                type="text"
                name="foodName"
                defaultValue={food.foodName}
                placeholder="Food Name"
                className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <select
                  name="foodCategory"
                  defaultValue={food.foodCategory}
                  className="appearance-none pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="appetizer">Appetizer</option>
                  <option value="rice-menu">Rice Menu</option>
                  <option value="snack">Snack</option>
                  <option value="Salad">Salad</option>
                  <option value="main-course">Main Course</option>
                  <option value="dessert">Dessert</option>
                  <option value="drink">Drink</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUtensils className="text-amber-500" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBangladeshiTakaSign className="text-amber-500" />
                </div>
                <input
                  type="number"
                  name="price"
                  defaultValue={food.price}
                  placeholder="Price"
                  className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
            </div>

            {/* Quantity & Origin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBoxes className="text-amber-500" />
                </div>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={food.quantity}
                  placeholder="Quantity"
                  className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaGlobeAmericas className="text-amber-500" />
                </div>
                <select
                  name="foodOrigin"
                  defaultValue={food.foodOrigin}
                  className="appearance-none pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                >
                  <option value="">Select Origin</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaImage className="text-amber-500" />
              </div>
              <input
                type="url"
                name="foodImage"
                defaultValue={food.foodImage}
                onChange={handleImageChange}
                placeholder="Image URL"
                className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            {/* Description */}
            <div className="relative">
              <div className="absolute top-3 left-3">
                <FaAlignLeft className="text-amber-500" />
              </div>
              <textarea
                name="description"
                defaultValue={food.description}
                placeholder="Description"
                rows="4"
                className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            {/* Image Preview */}
            {(previewImage || food.foodImage) && (
              <div className="mt-4 p-3 bg-amber-50 dark:bg-gray-800 rounded-lg border border-amber-100 dark:border-gray-700">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-2">
                  Image Preview:
                </p>
                <img
                  src={previewImage || food.foodImage}
                  alt="Preview"
                  className="h-24 w-full object-cover rounded-md border border-amber-200 dark:border-gray-700"
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition flex items-center gap-2 disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Food"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFoodModal;

import { useState } from "react";
import { FiUpload, FiSave, FiUser, FiMail, FiPlusCircle } from "react-icons/fi";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    //add to data in mongodb
    axios
      .post("http://localhost:5000/foods", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Food added successfully!",
            icon: "success",
            draggable: true,
          });

          e.form.reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      console.log("Form submitted");
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Page Title Section with Background Image */}
      <div>
        <BackgroundTitle />
      </div>

      {/* Form Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-amber-100">
            {/* Form header with pattern */}
            <div className="bg-amber-600 px-6 py-3">
              <div className="flex items-center">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">
                    Food Details
                  </h2>
                </div>
                <div className="bg-white/20 px-2 py-1 rounded-md text-xs text-white">
                  Required *
                </div>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-amber-700 mb-1"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-amber-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        readOnly
                        defaultValue={user?.displayName || ""}
                        className="w-full pl-10 px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-amber-700 mb-1"
                    >
                      Your Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-amber-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        readOnly
                        defaultValue={user?.email || ""}
                        className="w-full pl-10 px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Food Info Section */}
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="foodName"
                      className="block text-sm font-medium text-amber-700 mb-1"
                    >
                      Food Name
                    </label>
                    <input
                      type="text"
                      id="foodName"
                      name="foodName"
                      placeholder="Enter food name"
                      className="w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="foodImage"
                      className="block text-sm font-medium text-amber-700 mb-1"
                    >
                      Food Image URL
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        id="foodImage"
                        name="foodImage"
                        placeholder="https://example.com/image.jpg"
                        className="flex-1 px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="foodCategory"
                      className="block text-sm font-medium text-amber-700 mb-1"
                    >
                      Food Category
                    </label>
                    <select
                      id="foodCategory"
                      name="foodCategory"
                      className="w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-amber-700 mb-1"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        className="w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-amber-700 mb-1"
                      >
                        Price (Tk)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">৳</span>
                        </div>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          className="w-full pl-8 px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    <FiSave className="mr-2 h-5 w-5" />
                    Add Food Item
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

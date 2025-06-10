import { useState } from "react";
import { useNavigate, useLoaderData, useParams } from "react-router";
import {
  FaShoppingCart,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../Hooks/useAuth";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const PurchaseFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const food = useLoaderData();

  const [formData, setFormData] = useState({
    quantity: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableQuantity = Number(food.quantity) || 0;
  const isOwnFood = user?.email === food.email;
  const isOutOfStock = availableQuantity === 0;

  const quantityOptions =
    availableQuantity > 0
      ? Array.from({ length: Math.min(availableQuantity, 20) }, (_, i) => i + 1)
      : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isOwnFood) {
      toast.error("You cannot purchase your own food item!", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
      return;
    }

    if (isOutOfStock) {
      toast.error("This item is currently out of stock.", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
      return;
    }

    setIsSubmitting(true);

    const purchaseTimestamp = Date.now();
    const selectedQuantity = Number(formData.quantity);

    const purchaseData = {
      foodId: food._id,
      foodName: food.foodName,
      foodImage: food.foodImage,
      price: Number(food.price),
      quantity: selectedQuantity,
      buyerName: user?.displayName || "",
      buyerEmail: user?.email || "",
      purchaseDate: purchaseTimestamp,
      totalAmount: (Number(food.price) * selectedQuantity).toFixed(2),
      status: "completed",
    };

    try {
      // 1. Add purchase record
      await addDoc(collection(db, "purchases"), purchaseData);

      // 2. Update Food Quantity in database
      const newQuantity = availableQuantity - selectedQuantity;
      const foodRef = doc(db, "foods", food._id);

      await updateDoc(foodRef, {
        quantity: newQuantity >= 0 ? newQuantity : 0,
      });

      // 3. Show success message
      toast.success(
        <div>
          <h3 className="font-bold">Order Successful!</h3>
          <p>
            {selectedQuantity} {food.foodName} purchased for Tk{" "}
            {purchaseData.totalAmount}
          </p>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
        }
      );

      // 4. Navigate to confirmation page
      setTimeout(() => {
        navigate("/order-confirmation", { state: { purchase: purchaseData } });
      }, 2000);
    } catch (error) {
      toast.error(
        <div>
          <h3 className="font-bold">Order Failed</h3>
          <p>{error.message || "Something went wrong. Please try again."}</p>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = (Number(food.price) * Number(formData.quantity)).toFixed(2);
  const purchaseDateDisplay = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-700 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Complete Your Purchase</h2>
          <p className="text-amber-100 mt-1 text-sm">
            Order confirmation for {food.foodName}
          </p>
        </div>

        <div className="p-6 border-b border-gray-200 dark:border-gray-600 flex items-center space-x-4">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-24 h-24 rounded-xl object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
              {food.foodName}
            </h3>
            <p className="text-amber-600 dark:text-amber-400 font-bold text-lg">
              Tk {Number(food.price)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Available: {availableQuantity} in stock
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
            >
              Quantity
            </label>
            <div className="relative">
              {isOutOfStock ? (
                <p className="text-red-600 font-semibold">
                  This item is currently out of stock. You cannot purchase it.
                </p>
              ) : (
                <select
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                >
                  {quantityOptions.map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Buyer Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Your Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={user?.displayName || ""}
                disabled
                readOnly
                className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-200"
              />
              <FaUser className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
            </div>
          </div>

          {/* Buyer Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Your Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={user?.email || ""}
                disabled
                readOnly
                className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-200"
              />
              <FaEnvelope className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
            </div>
          </div>

          {/* Purchase Date */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Purchase Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={purchaseDateDisplay}
                disabled
                readOnly
                className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-200"
              />
              <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
            </div>
          </div>

          {/* Total */}
          <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                Total Amount:
              </span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                Tk {totalAmount}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || isOutOfStock || isOwnFood}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all flex items-center justify-center
              ${
                isSubmitting || isOutOfStock || isOwnFood
                  ? "bg-amber-400 dark:bg-amber-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl"
              }`}
          >
            {isSubmitting ? (
              "Processing..."
            ) : isOwnFood ? (
              "You cannot purchase your own food"
            ) : isOutOfStock ? (
              "Out of Stock"
            ) : (
              <>
                <FaCheckCircle className="mr-2" />
                Confirm Purchase
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseFood;

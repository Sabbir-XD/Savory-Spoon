import { useState } from 'react';
import { useNavigate, useLocation, useLoaderData, useParams } from 'react-router';
import { FaShoppingCart, FaCheckCircle, FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../Hooks/useAuth';

const PurchaseFood = () => {
  const {id} = useParams();
  const {user} = useAuth();
  const navigate = useNavigate();
  const food = useLoaderData();
  // const location = useLocation();
  // const food = location.state?.food || {};
  
  const [formData, setFormData] = useState({
    quantity: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);    

    // Prepare purchase data
    const purchaseData = {
      foodId: food._id,
      foodName: food.foodName,
      price: food.price,
      quantity: formData.quantity,
      buyerName: user.name,
      buyerEmail: user.email,
      purchaseDate: Date.now(),
      totalAmount: (food.price * formData.quantity).toFixed(2),
      status: 'completed'
    };

    try {
      // Simulate API call (replace with actual API call in your app)
      const response = await mockApiCall(purchaseData);
      
      // Show success toast
      toast.success(
        <div>
          <h3 className="font-bold">Order Successful!</h3>
          <p>{formData.quantity} {food.foodName} purchased for Tk {purchaseData.totalAmount}</p>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );

      // Redirect after delay
      setTimeout(() => {
        navigate('/order-confirmation', { state: { purchase: purchaseData } });
      }, 2000);
    } catch (error) {
      toast.error(
        <div>
          <h3 className="font-bold">Order Failed</h3>
          <p>{error.message || 'Something went wrong. Please try again.'}</p>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock API function (replace with actual API call)
  const mockApiCall = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        Math.random() > 0.1 
          ? resolve({ data: { success: true, purchase: data } })
          : reject(new Error('Payment processing failed. Please check your payment method.'));
      }, 1500);
    });
  };

  // Calculate total
  const totalAmount = (food.price * formData.quantity).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      
      <div className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Complete Your Purchase</h2>
          <p className="text-amber-100 mt-1">Order confirmation for {food.foodName}</p>
        </div>

        {/* Food Summary */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <img 
              src={food.foodImage} 
              alt={food.foodName} 
              className="w-16 h-16 rounded-lg object-cover mr-4"
            />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">{food.foodName}</h3>
              <p className="text-amber-600 dark:text-amber-400 font-bold">Tk {food.price} each</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Food Name (disabled) */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Food Item
            </label>
            <div className="relative">
              <input
                type="text"
                value={food.foodName}
                disabled
                className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-200"
              />
              <FaShoppingCart className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
            </div>
          </div>

          {/* Price (disabled) */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Price
            </label>
            <div className="relative">
              <input
                type="text"
                value={`Tk ${food.price}`}
                disabled
                className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Quantity
            </label>
            <div className="relative">
              <select
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              >
                {[...Array(10).keys()].map(i => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Buyer Name (disabled) */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Your Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={user.displayName}
                disabled
                className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-200"
              />
              <FaUser className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
            </div>
          </div>

          {/* Buyer Email (disabled) */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Your Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-200"
              />
              <FaEnvelope className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
            </div>
          </div>

          {/* Purchase Date (disabled) */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Purchase Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                disabled
                className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-200"
              />
              <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Total Amount:</span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">Tk {totalAmount}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all flex items-center justify-center
              ${
                isSubmitting
                  ? 'bg-amber-400 dark:bg-amber-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl'
              }`}
          >
            {isSubmitting ? (
              'Processing...'
            ) : (
              <>
                <FaCheckCircle className="mr-2" />
                Confirm Purchase
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseFood;
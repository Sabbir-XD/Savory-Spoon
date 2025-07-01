// import { useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useApplicationApi = () => {
  const axiosSecure = useAxiosSecure();

  // Debug only once
  // useEffect(() => {
  //    console.log("Axios Secure Instance Initialized:", axiosSecure);
  // }, [axiosSecure]);

  // Fetch foods by user email
  const fetchFoods = async (email) => {
    try {
      const res = await axiosSecure.get(`/foods/email/${email}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching foods:", error);
      throw error;
    }
  };

  // Delete a specific food
  const deleteFood = async ({id, email}) => {
    console.log(email);
    try {
      const res = await axiosSecure.delete(`/foods/${id}?email=${email}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting food:", error);
      throw error;
    }
  };

  // Fetch orders by user email
  const fetchOrders = async (email) => {
    try {
      const res = await axiosSecure.get(`/purchases/email/${email}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  // Delete a specific order
  const deleteOrder = async (id) => {
    try {
      const res = await axiosSecure.delete(`/purchases/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  };

  

  return {
    fetchFoods,
    deleteFood,
    fetchOrders,
    deleteOrder,
  };
};

export default useApplicationApi;

import axios from "axios";

export const fetchFoods = async (email) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods/email/${email}`);
  return data;
};
  
export const deleteFood = async (id) => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/foods/${id}`);
};

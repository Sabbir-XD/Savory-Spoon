export const getFoodsByEmail = async (email) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/foods?email=${email}`);
    const data = await response.json();
    return data;
  };
  
  export const updateFood = async (id, foodData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/foods/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
    });
    const data = await response.json();
    return data;
  };
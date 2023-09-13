import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from '../reducers/ingredientsSlice';
import axios from 'axios';

function IngredientSearch() {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = useState('');
  const ingredients = useSelector((state) => state.ingredients);
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/search-ingredients?ingredient=${ingredient}`
      );
      console.log('API Response:', response.data);

      dispatch(addIngredient(response.data));
    } catch (error) {
      console.error('Error fetching ingredient:', error);
    }
  };

  return (
    <div>
      <input
        type='text'
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder='Enter ingredient...'
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display the results */}
      <ul>
        {ingredients[0]?.results.map((ing) => (
          <li key={ing.id}>{ing.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientSearch;

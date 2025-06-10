import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import { useNavigate } from 'react-router-dom'

export default function Ingredients() {
  const [ingredients, setIngredients] = React.useState([]);
  const [error, setError] = React.useState(null);
  const BASE_URL = import.meta.env.VITE_MEALDB_BASE_URL;
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setError(null);
        const res = await fetch(`${BASE_URL}/list.php?i=list`);
        const data = await res.json();
        if (data.meals) {
          setIngredients(data.meals);
        } else {
          setIngredients([]);
        }
      } catch (err) {
        setError('Failed to fetch ingredients.');
        setIngredients([]);
      }
    };
    fetchIngredients();
  }, [BASE_URL]);

  const handleIngredientClick = (ingredient) => {
    navigate(`/ingredients/${ingredient.strIngredient}`);
  };

  return (
    <MainLayout>
      <h2 className="text-2xl font-bold mb-4 px-6 text-white">Ingredients</h2>
      {error && (
        <div className="text-center text-red-500 mb-4">{error}</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.idIngredient}
            className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700 flex flex-col items-center cursor-pointer hover:border-emerald-500 transition"
            onClick={() => handleIngredientClick(ingredient)}
            title={`See meals with ${ingredient.strIngredient}`}
          >
            <img
              src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
              alt={ingredient.strIngredient}
              className="w-20 h-20 object-contain mb-4"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold text-gray-100 mb-2">{ingredient.strIngredient}</h3>
            <p className="text-gray-300 text-sm text-center">
              {ingredient.strDescription
                ? ingredient.strDescription.substring(0, 100) + (ingredient.strDescription.length > 100 ? '...' : '')
                : 'No description available.'}
            </p>
          </div>
        ))}
      </div>
      {ingredients.length === 0 && !error && (
        <div className="text-center text-gray-500 mt-8">
          <p>No ingredients found.</p>
        </div>
      )}
    </MainLayout>
  )
}

import React from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
import LoadingIndicator from '../components/LoadingIndicator'

export default function MealDetail() {
  const { id } = useParams();
  const [meal, setMeal] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const BASE_URL = import.meta.env.VITE_MEALDB_BASE_URL;

  const fetchMeal = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
        const data = await res.json();
        if (data.meals && data.meals[0]) {
          setMeal(data.meals[0]);
        } else {
          setMeal(null);
        }
      } catch (err) {
        setError('Failed to fetch meal details.');
        setMeal(null);
      } finally {
        setLoading(false);
      }
    };
    
  React.useEffect(() => {
    fetchMeal();
  }, [id]);

  return (
    <MainLayout>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <div className="text-center text-red-500 mb-4">{error}</div>
      ) : meal ? (
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg shadow-md p-6 border border-gray-700 mt-8">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <h2 className="text-3xl font-bold mb-2 text-white">{meal.strMeal}</h2>
          <p className="text-gray-300 mb-4">{meal.strInstructions}</p>
          <div className="mb-2">
            <span className="text-gray-400 font-semibold">Category:</span>
            <span className="text-gray-200 ml-2">{meal.strCategory}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-400 font-semibold">Area:</span>
            <span className="text-gray-200 ml-2">{meal.strArea}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-400 font-semibold">Tags:</span>
            <span className="text-gray-200 ml-2">{meal.strTags || 'None'}</span>
          </div>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
          >
            Watch on YouTube
          </a>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          <p>Meal not found.</p>
        </div>
      )}
    </MainLayout>
  )
}

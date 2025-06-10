import React from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
import { Card } from '../components/Card'
import LoadingIndicator from '../components/LoadingIndicator'

export default function MealsByIngredient() {
  const { ingredient } = useParams();
  const [meals, setMeals] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const BASE_URL = import.meta.env.VITE_MEALDB_BASE_URL;
  const fetchMeals = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
        const data = await res.json();
        if (data.meals) {
          setMeals(data.meals);
        } else {
          setMeals([]);
        }
      } catch (err) {
        setError('Failed to fetch meals.');
        setMeals([]);
      } finally {
        setLoading(false);
      }
  };

  React.useEffect(() => {
    fetchMeals();
  }, [ingredient]);

  return (
    <MainLayout>
      <h2 className="text-2xl font-bold mb-4 px-6 text-white">Meals with "{ingredient}"</h2>
      {error && (
        <div className="text-center text-red-500 mb-4">{error}</div>
      )}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4'>
            {meals.map((meal) => (
              <Card
                key={meal.idMeal}
                id={meal.idMeal}
                image={meal.strMealThumb}
                title={meal.strMeal}
                description={''}
              />
            ))}
          </div>
          {meals.length === 0 && !error &&
            <div className="text-center text-gray-500 mt-8">
              <p>No meals found for this ingredient.</p>
            </div>
          }
        </>
      )}
    </MainLayout>
  )
}

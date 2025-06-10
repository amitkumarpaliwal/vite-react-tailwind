import React from 'react'
import '../App.css'
import { Card } from '../components/Card'
import MainLayout from '../Layouts/MainLayout'
import SearchForm from '../components/SearchForm'
import LoadingIndicator from '../components/LoadingIndicator'

export default function Home() {
    const [search, setSearch] = React.useState('');
    const [meals, setMeals] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [heading, setHeading] = React.useState('Random Meals');
    const [loading, setLoading] = React.useState(false);
    const BASE_URL = import.meta.env.VITE_MEALDB_BASE_URL;

    // Fetch 6 random meals on mount
    const fetchRandomMeals = async () => {
        try {
            setError(null);
            setLoading(true);
            const promises = Array.from({ length: 6 }).map(() =>
                fetch(`${BASE_URL}/random.php`).then(res => res.json())
            );
            console.log(promises);
            const results = await Promise.all(promises);
            const randomMeals = results
                .map(r => r.meals && r.meals[0])
                .filter(Boolean); // removes null/undefined values
            setMeals(randomMeals);
        } catch (error) {
            setError('Error fetching random meals.');
            setMeals([]);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchRandomMeals();
    }, []);

    const handleSearch = (query) => {
        setError(null);
        setLoading(true);
        setHeading(`Search Results for "${query}"`);
        try {
            const url = `${BASE_URL}/search.php?s=${query}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setMeals(data.meals || []);
                })
                .catch(error => {
                    setError('Error fetching search results.');
                    setMeals([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            setError('Error in handleSearch.');
            setMeals([]);
            setLoading(false);
        }
    }

    return (
        <MainLayout>
            <div className="flex justify-center my-8">
                <SearchForm search={search} setSearch={setSearch} handleSearch={handleSearch} />
            </div>
            <h2 className='text-xl font-bold mb-2 px-6 text-white'>{heading}</h2>
            {error && (
                <div className="text-center text-red-500 mb-4">
                    {error}
                </div>
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
                                description={meal.strInstructions ? meal.strInstructions.substring(0, 100) + '...' : 'No description available.'}
                            />
                        ))}
                    </div>
                    {meals.length === 0 && !error &&
                        <div className="text-center text-gray-500 mt-8">
                            <p>No meals found. Please try a different search.</p>
                        </div>
                    }
                </>
            )}
        </MainLayout>
    )
}

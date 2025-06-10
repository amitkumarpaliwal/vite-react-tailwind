import { useNavigate } from 'react-router-dom'

export function Card({image, title, description, id}) {
    const navigate = useNavigate();
    const handleClick = () => {
        if (id) {
            navigate(`/meal/${id}`);
        }
    };
    return (
        <div className="flex justify-center items-center py-4 mr-4">
            <div
                className="bg-gray-900 rounded-lg shadow-md p-6 max-w-sm w-full border border-gray-700 cursor-pointer hover:border-emerald-500 transition"
                onClick={handleClick}
                title={id ? `See details for ${title}` : undefined}
            >
                <img
                    src={image}
                    alt="Meal"
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-gray-100">{title}</h2>
                <p className="text-gray-300">
                    {description}
                </p>
            </div>
        </div>
    );
}
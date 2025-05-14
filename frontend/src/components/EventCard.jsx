import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EventCard({ id, title, location, startDate, endDate, price, image }) {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/events/${id}`);
    }

    return (
        <div className="w-[400px] h-[450px] bg-white rounded-3xl overflow-hidden shadow-lg flex-col">
            {/* Image Side */}
            <div className="w-full h-1/2 cursor-pointer" onClick={handleCardClick}>
                <img
                src={image}
                alt={<Loading/>}
                className="w-full h-full object-cover"
                />
            </div>

            {/* Text Side */}
            <div className="w-full h-1/2 p-6 flex flex-col justify-center">
                <div className="flex flex-wrap justify-between mb-4">
                    <h2 className="text-4xl font-GenBk font-normal text-black truncate">{title}</h2>
                    <h3 className="text-2xl font-inter font-light text-black text-right">{location}</h3>
                </div>
                <p className="text-lg font-inter text-gray-700 ">{formatDate(startDate)}{endDate ? `- ${formatDate(endDate)}` : ''}</p>
                <p className="text-lg font-inter mb-5 text-gray-700 ">{price}</p>
        
                {/* Book Now Button */}
                <button className="px-4 py-2 w-3/4 mx-auto mb-3 bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer">
                    Book Now
                </button>
            </div>
        </div>
    );
}
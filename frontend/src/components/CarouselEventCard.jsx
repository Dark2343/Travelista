import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CarouselEventCard({ id, title, location, startDate, endDate, price, tags, image }) {

  const navigate = useNavigate();

  const handleCardClick = () => {
      navigate(`/events/${id}`);
  }

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[460px] bg-white rounded-2xl overflow-hidden shadow-md flex">
      {/* Text Side */}
      <div className="w-1/2 p-6 flex flex-col justify-center ">
        <h2 className="text-4xl font-GenBk font-normal mb-1 text-black">{title}</h2>
        <h3 className="text-2xl font-inter font-light mb-20 text-black text-right">{location}</h3>
        <p className="text-2xl font-inter font-light text-gray-700 mb-2">{formatDate(startDate)}{endDate ? `- ${formatDate(endDate)}` : ''}</p>
        <p className="text-2xl font-inter font-light text-gray-700 mb-5">{price}</p>
        <p className="text-lg font-inter font-light text-gray-700 mb-9">{tags.map((tag, index) => (
          <span key={index} className='mr-1'>#{tag}</span>
        ))}</p>

        {/* Book Now Button */}
        <button className="px-4 py-2 w-4/5 mx-auto bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer">
          Book Now
        </button>
      </div>

      {/* Image Side */}
      <div className="w-full h-full cursor-pointer" onClick={handleCardClick}>
        <img
          src={image}
          alt={<Loading/>}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

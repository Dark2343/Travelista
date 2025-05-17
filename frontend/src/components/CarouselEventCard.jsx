import axios from "../services/api";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";


function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CarouselEventCard({ id, title, location, startDate, endDate, price, category, tags, image, user }) {

  const [booked, setBooked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
      navigate(`/events/${id}`);
  }


  useEffect(() => {
      const checkBooking = async () => {
          const result = await isBooked();
          setBooked(result);
  };
      if (user?.role !== 'admin') {
          checkBooking();
      }
  }, []);


  const bookEvent = async () => {
        await axios.post('/bookings', {
          eventId: id,
      }, {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
      })
      .then((response) => {
          console.log('Booking successful:', response.data);
          navigate(`/events/${id}/book`);
      })
  }

  const isBooked = async () => {
      try {
          const response = await axios.get('/bookings/user', {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
      });
      
          // Assuming response.data is an array of bookings
          return response.data.some(booking => booking.event._id === id);
      } catch (error) {
          console.error("Error checking if event is booked:", error);
          return false;
      }
  };

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[460px] bg-white rounded-2xl overflow-hidden shadow-md flex">
      {/* Text Side */}
      <div className="w-2/3 p-6 flex flex-col justify-center ">
        <h2 className="text-4xl font-GenBk font-normal mb-1 text-black">{title}</h2>
        <h3 className="text-2xl font-inter font-light mb-20 text-black text-right">{location}</h3>
        <p className="text-2xl font-inter font-light text-gray-700 mb-2">{formatDate(startDate)}{endDate ? `- ${formatDate(endDate)}` : ''}</p>
        <p className="text-2xl font-inter font-light text-gray-700 mb-5">{price}</p>
        <p className="text-xl font-inter  text-gray-700 mb-1">{category}</p>
        <p className="text-lg font-inter font-light text-gray-700 mb-9">{tags.map((tag, index) => (
          <span key={index} className='mr-1'>#{tag}</span>
        ))}</p>

        {user?.role === 'admin' ? (
            // Admin user
            <button
                className="px-4 py-2 w-4/5 mx-auto bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer"
                onClick={handleCardClick}
            >
                Details
            </button>
        ) : booked === null ? (
            // Still checking booking status
            <Loading />
        ) : !user ? (
            // Not logged in
            <button
                className="px-4 py-2 w-4/5 mx-auto bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer"
                onClick={() => navigate('/login')}
            >
                Book Now
            </button>
        ) : !booked ? (
            // Logged in, not booked
            <button
                className="px-4 py-2 w-4/5 mx-auto bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer"
                onClick={bookEvent}
            >
                Book Now
            </button>
        ) : (
            // Logged in, already booked
            <button
                disabled
                className="px-4 py-2 w-4/5 mx-auto mb-3 bg-[#4d645c] text-white text-lg font-medium rounded-2xl cursor-not-allowed"
            >
                Booked
            </button>
        )}


      </div>

      {/* Image Side */}
      <div className="w-full h-full cursor-pointer" onClick={handleCardClick}>
        <img
          src={image}
          alt={<Loading />}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

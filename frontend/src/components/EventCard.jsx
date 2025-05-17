import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from '../services/api';
import React, { useState, useEffect } from "react";


function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EventCard({ id, title, location, startDate, endDate, price, image, user }) {

    const navigate = useNavigate();
    const [booked, setBooked] = useState(null);

    useEffect(() => {
        const checkBooking = async () => {
            if (!user || user.role === 'admin') return;

            try {
                const result = await isBooked();
                setBooked(result);
            } catch (err) {
                setBooked(false); // fallback to avoid infinite loading
            }
        };

        checkBooking();
    }, [user, id]);



    const bookEvent = async () => {
        await axios.post('/bookings', {
            eventId: id,
        }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(() => {
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


    const handleCardClick = () => {
        navigate(`/events/${id}`);
    }

    return (
        <div className="w-[400px] h-[450px] flex-shrink-0 bg-white rounded-3xl overflow-hidden border border-black shadow-xl flex-col">
            {/* Image Side */}
            <div className="w-full h-1/2 cursor-pointer" onClick={handleCardClick}>
                <img
                src={image}
                className="w-full h-full object-cover"
                />
            </div>

            {/* Text Side */}
            <div className="w-full h-1/2 px-6 flex flex-col justify-center">
                <h2 className="text-3xl font-GenBk font-normal text-black truncate">{title}</h2>
                <h3 className="text-xl font-inter font-light text-black text-right">{location}</h3>
                <p className="text-lg font-inter text-gray-700 ">{formatDate(startDate)}{endDate ? `- ${formatDate(endDate)}` : ''}</p>
                <p className="text-lg font-inter mb-5 text-gray-700 ">{price}</p>
        
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
                    <Loading size={30} />
                ) : !user ? (
                    // Not logged in
                    <button
                        className="px-4 py-2 w-3/4 mx-auto mb-3 bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Book Now
                    </button>
                ) : !booked ? (
                    // Logged in, not booked
                    <button
                        className="px-4 py-2 w-3/4 mx-auto mb-3 bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer"
                        onClick={bookEvent}
                    >
                        Book Now
                    </button>
                ) : (
                    // Logged in, already booked
                    <button
                        disabled
                        className="px-4 py-2 w-3/4 mx-auto mb-3 bg-[#4d645c] text-white text-lg font-medium rounded-2xl cursor-not-allowed"
                    >
                        Booked
                    </button>
                )}

            </div>
        </div>
    );
}
import axios from '../services/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';



function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function convertTo12Hour(time24) {
  let [hours, minutes] = time24.split(':');
  hours = parseInt(hours, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12; // Midnight or noon edge case

  return `${hours}:${minutes} ${ampm}`;
}

export default function EventDetails() {

    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [booked, setBooked] = useState(false);
    const [user, setUser] = useState(null); // State to hold user information
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(`/events/${id}`)
            .then(response => {
                setEvent(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        }, [id]); // Fetch event details when the component mounts or when the id changes
        

    // Check if the user is logged in and decode the JWT token
    useEffect(() => {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decode the token
                setUser(decodedToken); // Set user state with decoded token
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []); // Empty dependency array to run only once on mount

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

    const deleteEvent = async () => {
        await axios.delete(`/events/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
        })
        .then((response) => {
            toast.success('Event deleted successfully');
            console.log('Event deleted successfully:', response.data);
            navigate(`/dashboard`);
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


    if (loading) {
        return <Loading size={50}/>; // Show loading message
    }

    if (error) {
        return <Error message={error.message} size={50}/> // Show error message
    }

    return (
        <div className='relative z-0'>
            {/* Blurred circle background */}
            <div className="absolute w-[500px] h-[450px] rounded-full bg-[#049663] blur-[300px] dark:bg-white dark:blur-[500px] dark:opacity-70 left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
            
            {/* Main content should be above the blur */}
            <div className='relative z-10 flex items-start'>
                {/* Image Side */}
                <img src={event.image} alt={<Loading/>} className='w-1/2 ml-12 rounded-4xl border border-black dark:border-gray-400'/>
                
                {/* Text Side */}
                <div className='flex flex-col w-full ml-8'>
                    {/* Event Title and Location */}    
                    <div className="flex flex-wrap justify-between items-end mb-4">
                        <h1 className="text-5xl font-GenBk font-normal text-black dark:text-white break-words">{event.title}</h1>
                        <h2 className="text-2xl font-inter font-light text-black dark:text-white text-right mr-10">{event.location}</h2>
                    </div>

                    {/* Event Date and Time*/}
                    <div className="flex flex-wrap justify-between items-start mb-2">
                        <p className='text-2xl font-inter font-light text-gray-700 dark:text-white mb-2'>{formatDate(event.startDate)}{event.endDate ? `- ${formatDate(event.endDate)}` : ''}</p>
                        <p className='text-2xl font-inter font-light text-gray-700 dark:text-white mr-10'>{convertTo12Hour(event.time)}</p>
                    </div>

                    {/* Event Price */}
                    <p className='text-2xl font-inter font-light text-white mb-8'>
                    <span className='bg-button-dark-mode text-white px-2 py-1 rounded-xl'>
                        {event.price.toLocaleString('en-US') + ' EGP'}
                    </span>
                    </p>

                    
                    {/* Event Description */}
                    <hr className="w-9/10 mx-auto mb-6 border-t border-black dark:border-gray-300" />
                    <p className='text-xl font-inter font-light text-black dark:text-white mb-6'>{event.description}</p>
                    <hr className="w-1/2 mx-auto mb-10 border-t border-black dark:border-gray-300" />

                    {/* Event Category */}
                    <div className="flex mb-2">
                        <p className='text-xl font-inter text-black dark:text-white font-semibold mr-2'>Category:</p>
                        <p className='text-xl font-inter text-gray-700 dark:text-white font-light mr-2'>{event.category}</p>
                    </div>

                    {/* Event Tags */}
                    <div className="flex mb-15">
                        <p className='text-xl font-inter text-black dark:text-white font-semibold mr-2'>Tags:</p>
                        <p className='text-xl font-inter text-gray-700 dark:text-white font-light mr-2'>{event.tags.map((tag, index) => (
                            <span key={index} className='mr-1'>#{tag}</span>
                        ))}</p>
                    </div>

                    {!user ? (
                        // Not logged in
                        <button
                            className="py-3 w-1/2 mx-auto mt-3 bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer"
                            onClick={() => navigate('/login')}
                        >
                            Book Now
                        </button>
                    ) : user.role === 'admin' ? (
                        <>
                            <button
                                onClick={() => navigate(`/events/${id}/edit`, { state: { event } })}
                                className="py-3 w-1/2 mx-auto mt-3 bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer">
                                Edit
                            </button>
                            <button
                                onClick={deleteEvent}
                                className="py-3 w-1/2 mx-auto mt-3 bg-[#8d2a2a] text-white text-lg font-medium rounded-2xl hover:bg-[#bd3232] transition cursor-pointer">
                                Delete
                            </button>
                        </>
                    ) : !booked ? (
                        // Logged in, not booked
                        <button
                            className="py-3 w-1/2 mx-auto mt-3 bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer"
                            onClick={bookEvent}
                        >
                            Book Now
                        </button>
                    ) : (
                        // Logged in, already booked
                        <button
                            disabled
                            className="py-3 w-1/2 mx-auto mt-3 bg-[#4d645c] text-white text-lg font-medium rounded-2xl cursor-not-allowed"
                        >
                            Booked
                        </button>
                    )}
                </div>
                {/* Render other details about the event */}
            </div>
        </div>
    );
}
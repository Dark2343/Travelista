import {useEffect, useState} from 'react';
import axios from '../services/api';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BookedEvent() {

    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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


    if (loading) {
        return <Loading/>; // Show loading message
    }

    if (error) {
        return <div className="text-black dark:text-white text-2xl flex justify-center">Error: {error.message}</div>; // Show error message
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
                <div className='flex flex-col items-center w-full ml-8'>
                    {/* Success Message */}    
                    <h1 className="text-5xl font-inter font-bold text-button-dark-mode dark:text-white">
                      Success
                    </h1>
                    <hr className="w-1/3 mx-auto mt-2 mb-6 border-t border-black dark:border-gray-300" />
                    <p className='text-3xl font-inter font-light text-center text-black dark:text-white mb-6'>
                      You've successfully booked a seat at<br />
                      <span className='font-bold text-button-dark-mode dark:text-white'>{event.title}</span> event at <span className='font-bold text-button-dark-mode dark:text-white'>{event.location}</span>.
                      <br />
                      <br />
                      The event starts on <span className='font-bold text-button-dark-mode dark:text-white'>{formatDate(event.startDate)}</span><br/> at <span className='font-bold text-button-dark-mode dark:text-white'>{event.time}</span>.
                    </p>
                    <hr className="w-1/2 mx-auto mb-10 border-t border-black dark:border-gray-300" />

                    {/* Return Button */}
                    <button className="py-3 w-1/3 mx-auto mt-3 bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer"
                    onClick={() => navigate('/')}>
                        Return to Events
                    </button>
                </div>
                {/* Render other details about the event */}
            </div>
        </div>
    );
}
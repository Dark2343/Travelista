import React, {useEffect, useState} from 'react';
import axios from '../services/api';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';


function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EventDetails() {

    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        return <div className="text-white text-2xl flex justify-center">Error: {error.message}</div>; // Show error message
    }

    return (
        <div className='relative z-0'>
            {/* Blurred circle background */}
            <div className="absolute w-[500px] h-[450px] rounded-full bg-[#049663] blur-[300px] dark:bg-white dark:blur-[500px] dark:opacity-70 left-1/5 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
            
            {/* Main content should be above the blur */}
            <div className='relative z-10 flex items-start'>
                {/* Image Side */}
                <img src={event.image} alt={<Loading/>} className='w-1/2 ml-12 rounded-4xl border border-black dark:border-gray-400'/>
                
                {/* Text Side */}
                <div className='flex flex-col w-full ml-8'>
                    {/* Event Title and Location */}    
                    <div className="flex flex-wrap justify-between items-start mb-4">
                        <h1 className="text-5xl font-GenBk font-normal text-black dark:text-white break-words">{event.title}</h1>
                        <h2 className="text-2xl font-inter font-light text-black dark:text-white text-right mr-10">{event.location}</h2>
                    </div>

                    {/* Event Date and Time*/}
                    <div className="flex flex-wrap justify-between items-start mb-2">
                        <p className='text-2xl font-inter font-light text-black dark:text-white mb-2'>{formatDate(event.startDate)}{event.endDate ? `- ${formatDate(event.endDate)}` : ''}</p>
                        <p className='text-2xl font-inter font-light text-black dark:text-white mr-10'>{event.time}</p>
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
                        <p className='text-xl font-inter text-black dark:text-white font-light mr-2'>{event.category}</p>
                    </div>

                    {/* Event Tags */}
                    <div className="flex mb-15">
                        <p className='text-xl font-inter text-black dark:text-white font-semibold mr-2'>Tags:</p>
                        <p className='text-xl font-inter text-black dark:text-white font-light mr-2'>{event.tags.map((tag, index) => (
                            <span key={index} className='mr-1'>#{tag}</span>
                        ))}</p>
                    </div>

                    {/* Book Now Button */}
                    <button className="py-3 w-1/2 mx-auto mt-3 bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer">
                        Book Now
                    </button>
                </div>
                {/* Render other details about the event */}
            </div>
        </div>
    );
}
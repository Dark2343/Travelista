import React, {useEffect, useState} from 'react';
import Carousel from '../components/Carousel';
import EventCard from '../components/EventCard';
import axios from '../services/api';
import './EventMenu.css';

export default function EventMenu() {
    const [events, setEvents] = useState([]); // State to hold events data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state

    useEffect(() => {
        axios.get('/events')
        .then((response) => {
            setEvents(response.data); // Set events data
            setLoading(false); // Set loading to false
        })
        .catch((error) => {
            setError(error); // Set error if any
            setLoading(false); // Set loading to false
        });
    }, []); // Empty dependency array to run effect only once

    if (loading) {
        return <div className="text-white text-2xl flex justify-center">Loading...</div>; // Show loading message
    }
    if (error) {
        return <div className="text-white text-2xl flex justify-center">Error: {error.message}</div>; // Show error message
    }

    return (
        <div className="relative">
            {/* Blurred circle background */}
            <div className="absolute w-[400px] h-[400px] bg-white rounded-full blur-[400px] opacity-70 left-1/2 top-1/8 -translate-x-1/2 z-0" />
            <h1 className="text-left text-3xl font-inter text-white ml-40 mb-5">
                New Events
            </h1>
            <div className='relative z-10 mb-20'>
                <Carousel
                events={events.slice(0, 5)}/>
            </div>
            <h1 className="text-left text-3xl font-inter text-white ml-40 mb-5">
                All Events
            </h1>
            <div className="flex flex-wrap justify-center gap-10 mb-20">
                {/* Render the EventCards based on fetched events */}
                {events.map((event) => (
                    <EventCard key={event._id}
                        id = {event._id}
                        title={event.title}
                        location={event.location}
                        startDate={event.startDate}
                        endDate={event.endDate}
                        price={event.price.toLocaleString('en-US') + ' EGP'}
                        image={event.image}/>
                    ))}
            </div>
        </div>
    );
}
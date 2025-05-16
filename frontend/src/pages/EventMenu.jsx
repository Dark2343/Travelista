import {useEffect, useState} from 'react';
import Carousel from '../components/Carousel';
import EventList from '../components/EventList';
import Loading from '../components/Loading';
import axios from '../services/api';
import { jwtDecode } from 'jwt-decode';

export default function EventMenu() {
    const [events, setEvents] = useState([]); // State to hold events data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state
    const [user, setUser] = useState(null); // State to hold user information

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
        axios.get('/events')
        .then((response) => {
            const filteredEvents = response.data.filter((event) => event.status === 'upcoming')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setEvents(filteredEvents); // Set events data
            setLoading(false); // Set loading to false
        })
        .catch((error) => {
            setError(error); // Set error if any
            setLoading(false); // Set loading to false
        });
    }, []); // Empty dependency array to run effect only once

    if (loading) {
        return <Loading/>;
    }
    if (error) {
        return <div className="text-[#313131] dark:text-white text-2xl flex justify-center">Error: {error.message}</div>; // Show error message
    }

    return (
        <div className="relative">
            {/* Blurred circle background */}
            <div className="absolute w-[400px] h-[500px] bg-[#049663] blur-[300px] dark:w-[400px] dark:h-[400px] dark:bg-white dark:blur-[400px] dark:opacity-70 rounded-full left-1/2 top-1/8 -translate-x-1/2 z-0" />
            <h1 className="text-left text-3xl font-inter font-medium text-[#313131] dark:text-white ml-40 mb-5">
                New Events
            </h1>
            <div className='relative z-10 mb-20'>
                <Carousel
                events={events.slice(0, 5)}
                user={user}/>
            </div>
            <h1 className="text-left text-3xl font-inter font-medium text-[#313131] dark:text-white  ml-40 mb-5">
                All Events
            </h1>
            <div className="mb-10">
                {/* Render EventList component and pass events as props */}
                <EventList events={events}
                user={user} />
            </div>
        </div>
    );
}
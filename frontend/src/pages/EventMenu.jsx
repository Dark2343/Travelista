import {useEffect, useState} from 'react';
import Carousel from '../components/Carousel';
import EventList from '../components/EventList';
import Loading from '../components/Loading';
import Error from '../components/Error';
import axios from '../services/api';
import { jwtDecode } from 'jwt-decode';

export default function EventMenu() {
    const EVENTS_LIMIT = 6; // Number of events to fetch per page
    const [events, setEvents] = useState([]); // State to hold events data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [loadingMore, setLoadingMore] = useState(false); // Loading state for "Show More"
    const [error, setError] = useState(null); // State to manage error state
    const [user, setUser] = useState(null); // State to hold user information    
    const [page, setPage] = useState(1); // Current page
    const [hasMore, setHasMore] = useState(true); // If there are more events to load

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

    const fetchEvents = async (pageNum) => {
        try {
            const response = await axios.get(`/events?page=${pageNum}&limit=${EVENTS_LIMIT}&upcomingOnly=true`); // Fetch events from the API
            return response.data;
        } catch (err) {
            throw err;
        }
    };

    // Initial load
    useEffect(() => {
        (async () => {
        try {
            setLoading(true);
            const initialData = await fetchEvents(1);
            setEvents(initialData.events);
            setHasMore(initialData.events.length < initialData.totalEvents);
            setPage(1);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    })();
    }, []);

    // Load more handler
    const loadMoreEvents = async () => {
        setLoadingMore(true);
        try {
            const nextPage = page + 1;
            const newData = await fetchEvents(nextPage);
            setEvents([...events, ...newData.events]);
            setPage(nextPage);
            setHasMore(events.length + newData.events.length < newData.totalEvents);
        } catch (err) {
            setError(err);
        } finally {
            setLoadingMore(false);
        }
    };

    if (loading) {
        return <Loading size={50}/>;
    }
    
    if (error) {
        return <Error message={error.message} size={50}/> // Show error message
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

            {hasMore && (
                <div className="flex justify-center mb-10">
                <button
                    onClick={loadMoreEvents}
                    disabled={loadingMore}
                    className="px-6 py-3 bg-button-dark-mode text-white rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer"
                >
                    {loadingMore ? 'Loading...' : 'Show More'}
                </button>
                </div>
            )}
        </div>
    );
}
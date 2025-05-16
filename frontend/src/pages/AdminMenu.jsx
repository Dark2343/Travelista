import axios from '../services/api';
import EventList from '../components/EventList';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function AdminMenu() {
    const [events, setEvents] = useState([]); // State to hold events data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state
    const [user, setUser] = useState(null); // State to hold user data

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get token from local storage
        if (token) {
            const decodedToken = jwtDecode(token); // Decode the token
            setUser(decodedToken); // Set user data from decoded token
        }
    }, []); // Empty dependency array to run effect only once

    useEffect(() => {
        axios.get('/events')
        .then((response) => {
            setEvents(response.data.events); // Set events data
            setLoading(false); // Set loading to false
        })
        .catch((error) => {
            setError(error); // Set error if any
            setLoading(false); // Set loading to false
        });
    }, []); // Empty dependency array to run effect only once

    const upcoming = events.filter((event) => event.status === 'upcoming');
    const ongoingEvents = events.filter((event) => event.status === 'ongoing');
    const pastEvents = events.filter((event) => event.status === 'past');

    return (
        <div className="relative">
            <div className="absolute w-[400px] h-[500px] bg-[#049663] blur-[300px] dark:w-[400px] dark:h-[400px] dark:bg-white dark:blur-[400px] dark:opacity-70 rounded-full left-1/2 top-1/8 -translate-x-1/2 z-0" />
            <div className='flex justify-between'>
                <h1 className="text-left text-3xl font-inter font-medium text-[#313131] dark:text-white  ml-40 mb-5">
                    Upcoming Events
                </h1>
                <Link to="/dashboard/createEvent">
                    <button className="w-50 mr-73 h-13 bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer">
                        Create New Event
                    </button>
                </Link>
            </div>
            <div className="mb-10">
                <EventList isScrollable={true} events={upcoming} user={user}/>
            </div>
            <h1 className="text-left text-3xl font-inter font-medium text-[#313131] dark:text-white  ml-40 mb-5">
                Ongoing Events
            </h1>
            <div className="mb-10">
                <EventList events={ongoingEvents} user={user}/>
            </div>
            <h1 className="text-left text-3xl font-inter font-medium text-[#313131] dark:text-white  ml-40 mb-5">
                Past Events
            </h1>
            <div className="mb-10">
                <EventList events={pastEvents} user={user}/>
            </div>
        </div>
    );
}
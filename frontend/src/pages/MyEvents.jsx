import axios from '../services/api';
import EventList from '../components/EventList';
import {useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';
import Loading from '../components/Loading';

export default function AdminMenu() {
    const [user, setUser] = useState(null); // State to hold events data
    const [events, setEvents] = useState([]); // State to hold events data
    const [bookings, setBookings] = useState([]); // State to hold events data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state
  
    useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            setUser(jwtDecode(token));

            const [eventsRes, bookingsRes] = await Promise.all([
                axios.get('/events'),
                axios.get('/bookings/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }),
            ]);
            setEvents(eventsRes.data.events);
            setBookings(bookingsRes.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

        fetchData();
    }, []);

    const availableEvents = events.filter(event => {
        return bookings.some(booking => booking.event._id === event._id);
    });

    return (
        <div className="relative">
            <div className="absolute w-[400px] h-[500px] bg-[#049663] blur-[300px] dark:w-[400px] dark:h-[400px] dark:bg-white dark:blur-[400px] dark:opacity-70 rounded-full left-1/2 top-1/8 -translate-x-1/2 z-0" />
            <h1 className="text-left text-3xl font-inter font-medium text-[#313131] dark:text-white  ml-40 mb-5">
                Booked Events
            </h1>
            <div className="mb-10">
                {loading ? <Loading size={50}/> : <EventList events={availableEvents} user={user}/>}
            </div>
        </div>
    );
}
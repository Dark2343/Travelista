import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventMenu from './pages/EventMenu';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminMenu from './pages/AdminMenu';
import BookedEvent from './pages/BookedEvent';
import MyEvents from './pages/MyEvents';
import EditEvent from './pages/EditEvent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from './services/api';


function AppContent() {

  const location = useLocation(); // Get the current location
  const hideNavbarRoutes = ['/login', '/register']; // Define the routes where you want to hide the navbar
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname); // Check if the current route is in the hideNavbarRoutes array (true or false)
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        axios.get('/events')
        .then((response) => {
            setEvents(response.data.events); // Set events data
            console.log("Fetched events:", response.data.events);
          })
        .catch(err => {
            console.error("Failed to fetch events:", err);
        });
    }, []);

    const handleSearch = (query) => {
        const filtered = events.filter(event =>
            event.title.toLowerCase().startsWith(query.toLowerCase()));
        setFilteredEvents(filtered);
    };

  return (
    <>
      {!shouldHideNavbar && <Navbar onSearch={handleSearch} results={filteredEvents}/>}
      <div className={shouldHideNavbar ? '' : "pt-18"}>
        <Routes>
          <Route path="/" element={<EventMenu />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/book" element={<BookedEvent />} />
          <Route path="/events/:id/edit" element={<EditEvent />} />
          <Route path="/dashboard" element={<AdminMenu />} />
          <Route path="/dashboard/createEvent" element={<CreateEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myEvents" element={<MyEvents />} />
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // or "light" | "dark"
        limit={3}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

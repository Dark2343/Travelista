import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventMenu from './pages/EventMenu';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';


function AppContent() {

  const location = useLocation(); // Get the current location
  const hideNavbarRoutes = ['/login', '/register']; // Define the routes where you want to hide the navbar
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname); // Check if the current route is in the hideNavbarRoutes array (true or false)

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div className={shouldHideNavbar ? '' : "pt-18"}>
        <Routes>
          <Route path="/" element={<EventMenu />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/dashboard/createEvent" element={<CreateEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
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

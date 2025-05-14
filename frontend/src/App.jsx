import Navbar from './components/Navbar';
import EventMenu from './pages/EventMenu';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-18">
        <Routes>
          <Route path="/" element={<EventMenu />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/dashboard/createEvent" element={<CreateEvent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

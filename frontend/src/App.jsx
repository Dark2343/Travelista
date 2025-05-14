import Navbar from './components/Navbar';
import EventMenu from './pages/EventMenu';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

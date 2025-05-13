import Navbar from './components/Navbar';
import EventMenu from './pages/EventMenu';

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-18">
        <EventMenu />
      </div>
    </>
  );
}

export default App;

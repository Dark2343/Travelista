import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-18">
        <Carousel />
      </div>
    </>
  );
}

export default App;

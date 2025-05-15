import logo from '../assets/logo.png';
import slogan from '../assets/slogan.png';
import Loading from '../components/Loading';
import axios from '../services/api';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from 'react-icons/fa';


export default function Login() {
    // Initialize the theme state by checking localStorage
    const getInitialTheme = () => {
        // Try to read from localStorage if the theme is already saved
        const savedTheme = localStorage.getItem("theme");
        // If theme exists in localStorage, return it, else default to 'light'
        return savedTheme ? savedTheme === "dark" : false; // false means 'light'
    };
    
    const [isDarkMode, setIsDarkMode] = useState(getInitialTheme); // Get initial theme state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    // Save the theme to localStorage when isDarkMode changes
    useEffect(() => {
        if (isDarkMode) {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]); // Dependency on isDarkMode to trigger theme change

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev); // Toggle theme
    };

    // Handle form submission
    const loginUser = async (userData) => {
        setLoading(true);
        try {
            const response = await axios.post('/users/login', userData);
            localStorage.setItem('token', response.data.token); // Store token in localStorage
            
            console.log('Logged in successfully:', response.data);
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in. Please try again.');
        } finally {
            setLoading(false);
        }
    };
  
    const handleSubmit = () => {

        // Validate form fields
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        const userData = {
            "email": email,
            "password": password,
        };
            
        loginUser(userData);
    };

  return (
    <div className="relative bg-[#bdf0dd] dark:bg-[#134131] h-screen">
        {/* Blurred circle background */}
        <div className="absolute w-[500px] h-[450px] rounded-full bg-[#2a8d6a] blur-[300px] dark:bg-white dark:blur-[500px] dark:opacity-70 left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
        {/* Container */}
        <div className="relative z-10 flex items-center justify-center h-screen">
            {/* Transparent Big Container */}
            <div className="bg-transparent shadow-xl rounded-3xl w-2/3 h-4/5 flex overflow-hidden">
                {/* Green Part Container */}
                <div className="bg-[#033524] w-2/5 h-full flex flex-col ">
                    <Link to="/">
                        <img src={logo} alt={<Loading />} className="h-25 w-70 mt-5 mx-auto select-none pointer-events-none" />
                    </Link>
                    <img src={slogan} alt={<Loading />} className="h-80 w-120 mt-20 mx-auto select-none pointer-events-none" />
                    <div className="cursor-pointer mt-38 ml-7" onClick={toggleDarkMode}>
                        {isDarkMode ? (
                            <FaSun className="text-white" size={37} />
                        ) : (
                            <FaMoon className="text-white" size={37} />
                        )}
                    </div>
                </div>
                {/* White Part Container */}
                <div className="bg-white w-3/5 h-full flex flex-col pt-20 pr-10">
                    {/* Header Text */}
                    <div className="flex flex-col items-start mb-18 pl-15">
                        <h1 className="text-2xl font-inter font-bold text-center  text-gray-700">Continue Your Adventures</h1>
                        <h1 className="text-4xl font-inter font-bold text-center mt-5 text-gray-700">Log In to Travelista</h1>
                    </div>

                    {/* Email and Password Fields */}
                    <div className ='flex flex-col justify-between gap-6 items-center'>
                        <input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[450px] h-[60px] bg-transparent text-gray-700 font-inter rounded-xl border-2 border-gray-400 px-3 mb-4
                                placeholder-gray-500 placeholder:font-inter placeholder:text-lg
                                focus:ring-2 focus:outline-none focus:border-green-600 focus:ring-green-600 transition"/>
                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-[450px] h-[60px] bg-transparent text-gray-700 font-inter rounded-xl border-2 border-gray-400 px-3 mb-4
                                placeholder-gray-500 placeholder:font-inter placeholder:text-lg
                                focus:ring-2 focus:outline-none focus:border-green-600 focus:ring-green-600 transition"/>
                        
                        {/* Login Button */}
                        <button className="py-3 w-1/3 mt-5 bg-button-dark-mode text-white text-lg font-medium rounded-2xl hover:bg-button-hover-dark-mode transition cursor-pointer"
                            onClick={handleSubmit}>
                            {loading ? <Loading/> : 'Log In'}
                        </button>
                    </div>


                    {/* Sign Up Link */}
                    <div className="flex mt-40 ml-5">
                        <h1 className="text-gray-700 font-inter font-medium text-lg">Don't have an account?</h1>
                        <Link to="/register" className="text-green-600 font-inter text-lg font-bold ml-1">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

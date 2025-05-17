import { FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import UserMenu from "./UserMenu";

export default function Navbar({ onSearch, results= [] }) {

    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value); // call parent function with current input
        setShowResults(value.length > 0); // Show results if input is not empty
    };

    // Initialize the theme state by checking localStorage
    const getInitialTheme = () => {
        // Try to read from localStorage if the theme is already saved
        const savedTheme = localStorage.getItem("theme");
        // If theme exists in localStorage, return it, else default to 'light'
        return savedTheme ? savedTheme === "dark" : false; // false means 'light'
    };

    const [isDarkMode, setIsDarkMode] = useState(getInitialTheme); // Get initial theme state
    const [user, setUser] = useState(null); // State to hold user information

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

    // Click outside to close search results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="px-5 pt-5"> {/* Outer container for the navbar */}
            <div className="sticky bg-[#043524] dark:bg-navbar-dark-mode z-50 shadow-md px-4 py-2 rounded-xl flex justify-between items-center">
                <Link to="/">
                    <div className="flex items-center">
                        <img src={logo} alt={<Loading />} className="h-15 w-40" />
                    </div>
                </Link>

                <div className="relative w-1/6" ref={searchRef}>
                    <div className="flex items-center border-b border-white/90 pl-1">
                        <FaSearch className="text-white" />
                        <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search for events..."
                        className="bg-transparent outline-none placeholder-white placeholder:font-semibold px-4 py-2 w-full"
                        onFocus={() => setShowResults(true)}
                        />
                    </div>

                    {search && showResults && results.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-[#04573a] mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                            {results.map((event) => (
                                <Link key={event._id} to={`/events/${event._id}`}>
                                    <div className="px-4 py-2 hover:bg-button-hover-dark-mode cursor-pointer text-white">
                                        {event.title}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex space-x-6 text-white mr-5">
                    {user 
                    ? (
                      <>
                        {user.role === "admin" ? (
                            <Link to="/dashboard">
                                <button className="text-white font-inter py-1 cursor-pointer">
                                    Dashboard
                                </button>
                            </Link>
                        )
                        : (
                            <Link to="/myEvents">
                                <button className="text-white font-inter py-1 cursor-pointer">
                                    My Events
                                </button>
                            </Link>
                        )}
                        <UserMenu setUser={setUser} />
                      </>  
                    )
                    : (
                        <Link to="/login">
                            <button className="text-white font-inter py-1 cursor-pointer">
                                Log In
                            </button>
                        </Link>
                    )}
                    <div className="cursor-pointer" onClick={toggleDarkMode}>
                        {isDarkMode ? (
                            <FaSun size={27} className="text-white" />
                        ) : (
                            <FaMoon size={27} className="text-white" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

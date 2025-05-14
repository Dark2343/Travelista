// Navbar.jsx
import { FaSearch, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

// In your Navbar component
export default function Navbar() {

    const [isDarkMode, setIsDarkMode] = useState(false); // State to manage theme

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

      // Persist the theme setting in local storage (optional)
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
        }
    }, []);

    useEffect(() => {
        // Save the theme to local storage when it changes
        if (isDarkMode) {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div className="px-5 pt-5"> {/* Outer container for the navbar */}
            {/* Inner container for the sticky navbar */}
            <div className="sticky bg-[#043524] dark:bg-navbar-dark-mode z-50 shadow-md px-4 py-2 rounded-xl flex justify-between items-center">  
                {/* Left side: Logo or brand */}
                <Link to="/">
                    <div className="flex items-center">
                        <img src={logo} alt={<Loading/>} className="h-15 w-40" />
                    </div>
                </Link>

                {/* Center: Search bar */}
                <div className="flex items-center border-b border-white/90 pl-1 w-1/6">
                    <FaSearch className="text-white" />
                    <input
                    type="text"
                    placeholder="Search for events..."
                    className="bg-transparent outline-none placeholder-white placeholder:font-semibold px-4 py-2 w-full"
                    />
                </div>

                {/* Right side: Icons */}
                <div className="flex space-x-6 text-white mr-5">
                    <FaUser className="cursor-pointer" size={27}></FaUser>
                    {/* Toggle sun and moon icons based on dark mode */}
                    <div className="cursor-pointer" onClick={toggleDarkMode}>
                        {isDarkMode ? (<FaSun size={27} className="text-white" />) : (<FaMoon size={27} className="text-white" />)}
                    </div>
                </div>
            </div>
        </div>
    );
}


import { FaSearch, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

export default function Navbar() {
    // Initialize the theme state by checking localStorage
    const getInitialTheme = () => {
        // Try to read from localStorage if the theme is already saved
        const savedTheme = localStorage.getItem("theme");
        // If theme exists in localStorage, return it, else default to 'light'
        return savedTheme ? savedTheme === "dark" : false; // false means 'light'
    };

    const [isDarkMode, setIsDarkMode] = useState(getInitialTheme); // Get initial theme state

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

    return (
        <div className="px-5 pt-5"> {/* Outer container for the navbar */}
            <div className="sticky bg-[#043524] dark:bg-navbar-dark-mode z-50 shadow-md px-4 py-2 rounded-xl flex justify-between items-center">
                <Link to="/">
                    <div className="flex items-center">
                        <img src={logo} alt={<Loading />} className="h-15 w-40" />
                    </div>
                </Link>

                <div className="flex items-center border-b border-white/90 pl-1 w-1/6">
                    <FaSearch className="text-white" />
                    <input
                        type="text"
                        placeholder="Search for events..."
                        className="bg-transparent outline-none placeholder-white placeholder:font-semibold px-4 py-2 w-full"
                    />
                </div>

                <div className="flex space-x-6 text-white mr-5">
                    <Link to="/login">
                        <FaUser className="cursor-pointer" size={27}></FaUser>
                    </Link>
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

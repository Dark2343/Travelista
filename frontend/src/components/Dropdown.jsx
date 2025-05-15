import { useState, useRef, useEffect } from "react";
import { categories } from "../data/categories"; // Import categories from data file

export default function DropdownSelect({ selectedCategory, onCategoryChange }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Reference for the dropdown menu
  const dropdownRef = useRef(null);
  
  // Toggle the dropdown open or closed
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection and close dropdown
  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  // Close the dropdown if the user clicks outside of the dropdown menu
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener to detect outside click
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <input
        type="text"
        value={selectedCategory}
        onClick={toggleDropdown}
        placeholder="Category"
        readOnly
        className="w-[230px] h-[50px] bg-transparent text-gray-700 dark:text-gray-300 font-inter rounded-xl border-2 border-gray-400 px-3 mb-4 placeholder-gray-500 dark:placeholder-gray-400 placeholder:font-inter focus:ring-2 focus:outline-none focus:border-green-600 focus:ring-green-600 dark:focus:border-gray-100 dark:focus:ring-gray-100 transition cursor-pointer"
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-3 bg-white dark:bg-emerald-900 shadow-lg rounded-xl border-2 border-gray-400 z-10 max-h-[200px] overflow-y-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#4CAF50 #f1f1f1" }} // Inline custom scrollbar styles (for Firefox)
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategorySelect(category)}
              className="block px-4 py-2 w-full text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-emerald-700 hover:rounded-lg transition"
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

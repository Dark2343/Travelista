import React, { useState } from "react";

export default function TimeInput({ value, onChange }) {
  // State variable to manage the time input
  const [error, setError] = useState("");

  const handleChange = (e) => {
    onChange(e.target.value);

    // Only validate if input has reached a reasonable length
    if (inputValue.length === 5 || inputValue.length === 7) {
      const regex = /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
      if (regex.test(inputValue)) {
        setError(""); // Clear error if valid
      } else {
        setError("Please enter time in the format hh:mm AM/PM");
      }
    } else {
      setError(""); // Clear error if the length isn't enough to match the format
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Time (hh:mm AM/PM)"
        className="w-[200px] h-[50px] bg-transparent text-gray-700 dark:text-gray-300 font-inter rounded-xl border-2 border-gray-400 px-3 mb-4 placeholder-gray-500 dark:placeholder-gray-400 placeholder:font-inter focus:ring-2 focus:outline-none focus:border-green-600 focus:ring-green-600 dark:focus:border-gray-100 dark:focus:ring-gray-100 transition"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

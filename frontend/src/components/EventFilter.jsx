import { IoFilter } from "react-icons/io5";
import { categories } from "../data/categories";

export default function EventFilter({ category, setCategory, tag, setTag, maxPrice, setMaxPrice }) {
  return (
    <div className="flex gap-4 justify-start items-center rounded-3xl mb-7 bg-[#1B523F] py-3 w-[900px] ml-50">
      <IoFilter size={40} className="text-white ml-5" />
      <h1 className="text-white text-2xl font-inter mr-10">Filter</h1>

      <div className="relative inline-block w-54">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="appearance-none bg-white text-gray-600 font-inter w-full rounded-2xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Categories...</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="text-gray-700">
              {cat}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="w-4 h-4 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <input
        type="text"
        placeholder="Tags..."
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="bg-white text-gray-600 font-inter w-54 rounded-2xl px-4 py-2"
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="bg-white text-gray-600 font-inter w-54 rounded-2xl px-4 py-2
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}

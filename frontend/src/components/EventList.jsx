import { useState, useEffect } from "react";
import { categories } from "../data/categories";
import EventCard from "./EventCard";

export default function EventList({ events }) {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Update filteredEvents whenever filters or events change
  useEffect(() => {
    let filtered = [...events];

    if (category) {
      filtered = filtered.filter(event => event.category === category);
    }

    if (tag) {
      filtered = filtered.filter(event => event.tags?.includes(tag));
    }

    if (maxPrice) {
      filtered = filtered.filter(event => event.price <= parseFloat(maxPrice));
    }

    setFilteredEvents(filtered);
  }, [category, tag, maxPrice, events]);


  return (
    <div>
      {/* Filter UI */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-xl px-4 py-2"
        >
        <option value="">All Categories</option>
        {categories.map((cat) => (
            <option key={cat} value={cat}>
            {cat}
            </option>
        ))}
        </select>

        <input
          type="text"
          placeholder="Search tag (e.g., AI)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="border rounded-xl px-4 py-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-xl px-4 py-2"
        />
      </div>

      {/* Event Cards */}
      <div className="flex flex-wrap justify-center gap-10 mb-20">
        {filteredEvents.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            title={event.title}
            location={event.location}
            startDate={event.startDate}
            endDate={event.endDate}
            price={event.price.toLocaleString("en-US") + " EGP"}
            image={event.image}
          />
        ))}
      </div>
    </div>
  );
}
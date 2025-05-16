import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import EventFilter from "./EventFilter";

export default function EventList({ events, user }) {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
    <div className="relative">
      <EventFilter
        category={category}
        setCategory={setCategory}
        tag={tag}
        setTag={setTag}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      <div className="flex flex-wrap justify-center gap-10 mb-15">
        {filteredEvents.length > 0 ? (filteredEvents.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            title={event.title}
            location={event.location}
            startDate={event.startDate}
            endDate={event.endDate}
            price={event.price.toLocaleString("en-US") + " EGP"}
            image={event.image}
            user={user}
          />))) : (
          <div className="text-[#313131] dark:text-white font-inter text-2xl flex justify-center mt-10">
            No events found
          </div>
        )}
      </div>
    </div>
  );
}

// components/EventCard.jsx
export default function EventCard({ title, location, startDate, endDate, price, tags, imageUrl }) {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[460px] bg-white rounded-2xl overflow-hidden shadow-md flex">
      {/* Text Side */}
      <div className="w-1/2 p-6 flex flex-col justify-center">
        <h2 className="text-4xl font-GenBk font-normal mb-1 text-black">{title}</h2>
        <h3 className="text-2xl font-inter mb-23 text-black text-right">{location}</h3>
        <p className="text-xl text-gray-600 mb-2">{startDate}{endDate ? `- ${endDate}` : ''}</p>
        <p className="text-xl text-gray-600 mb-5">{price}</p>
        <p className="text-lg text-gray-600 mb-9">{tags.map((tag, index) => (
          <span key={index} className='mr-1'>#{tag}</span>
        ))}</p>

        {/* Book Now Button */}
        <button className="px-4 py-2 w-4/5 mx-auto bg-emerald-700 text-white text-lg font-medium rounded-2xl hover:bg-emerald-600 transition cursor-pointer">
          Book Now
        </button>
      </div>

      {/* Image Side */}
      <div className="w-full h-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

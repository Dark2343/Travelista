import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import CarouselEventCard from './CarouselEventCard';

export default function Carousel({ events }) {

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Swiper Container with Rounded Corners */}
      <div className="rounded-4xl overflow-hidden shadow-lg border border-gray-500">
        {/* Swiper Component */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
          }}
          autoplay={{ delay: 5000 }}
          loop={true}
        >
        {/* Swiper Slides */}
        {events.map((event) => (
            <SwiperSlide key={event._id || index}>  {/* Add key here */}
              <CarouselEventCard
                id={event._id}
                title={event.title}
                location={event.location}
                startDate={event.startDate}
                endDate={event.endDate}
                price={event.price.toLocaleString('en-US') + ' EGP'}
                tags={event.tags}
                image={event.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Pagination Container */}
      <div className="custom-pagination flex justify-center mt-4"></div>
    </div>
  );
}

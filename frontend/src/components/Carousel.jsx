import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import EventCard from './CarouselEventCard';

export default function Carousel() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Swiper Container with Rounded Corners */}
      <div className="rounded-4xl overflow-hidden shadow-lg">
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
        <SwiperSlide>
            <EventCard
              title="Sakura Blossom Festival"
              location="Tokyo, Japan"
              startDate="May 20, 2025"
              endDate="May 30, 2025"
              price="5,800 EGP"
              tags={['Festival', 'Culture']}
              imageUrl="https://images-cdn.ubuy.co.in/660b5da0e76f2c10d359e352-japanese-cherry-blossom-tree-seeds-pink.jpg"
            />
          </SwiperSlide>
        <SwiperSlide>
            <EventCard
              title="Yi Peng Lantern Festival"
              location="Chiang Mai, Thailand"
              startDate="November 5, 2025"
              price="10,800 EGP"
              tags={['Festival', 'Night Life']}
              imageUrl="https://www.thailandnow.in.th/wp-content/uploads/2021/07/Lantern-1.jpeg"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Custom Pagination Container */}
      <div className="custom-pagination flex justify-center mt-4"></div>
    </div>
  );
}

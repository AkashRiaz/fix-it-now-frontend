"use client";

import { Star, StarHalf } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Md Rashedul Islam",
    review: "The technician arrived on time and fixed the issue quickly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sadia Sultana",
    review: "Excellent service. The technician was professional and helpful.",
    rating: 5,
  },
  {
    id: 3,
    name: "Abdullah Al Mamun",
    review: "Easy booking process and great service quality.",
    rating: 5,
  },
  {
    id: 4,
    name: "Md Naimul Islam",
    review: "The technician was knowledgeable and provided valuable advice.",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Mr. John Doe",
    review: "I am extremely satisfied with the service. Highly recommended!",
    rating: 5,
  },
];

const RatingStars = ({ rating }: { rating: number }) => {
  const stars = [];

  const fullStars = Math.floor(rating);

  const hasHalfStar = rating % 1 !== 0;

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        size={20}
        className="fill-yellow-400 text-yellow-400"
      />,
    );
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <StarHalf
        key="half"
        size={20}
        className="fill-yellow-400 text-yellow-400"
      />,
    );
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} size={20} className="text-gray-300" />);
  }

  return <div className="flex gap-1">{stars}</div>;
};

const CustomerReviewsSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:w-7xl">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>

          <p className="mt-3 text-gray-600">
            Trusted by hundreds of happy customers.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="
                  rounded-2xl
                  border
                  bg-white
                  p-8
                  shadow-sm
                  transition
                  hover:shadow-md
                "
              >
                {/* Rating */}
                <div className="mb-5">
                  <RatingStars rating={item.rating} />
                </div>

                {/* Review */}
                <p
                  className="
                    leading-7
                    text-gray-700
                  "
                >
                  {item.review}
                </p>

                {/* Customer */}
                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-3
                  "
                >
                  {/* Avatar */}
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-100
                      font-bold
                      text-blue-600
                    "
                  >
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <p
                      className="
                        font-semibold
                        text-gray-900
                      "
                    >
                      {item.name}
                    </p>

                    <p
                      className="
                        text-sm
                        text-gray-500
                      "
                    >
                      Verified Customer
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;

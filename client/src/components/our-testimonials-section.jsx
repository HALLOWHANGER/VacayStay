import SectionTitle from '../components/section-title';
import { StarIcon } from 'lucide-react';

export default function OurTestimonialSection() {
const data = [
  {
    review:
      "VacayStay made my trip so easy. The hotel was spotless, affordable, and exactly as described. Booking was completely stress-free!",
    name: "Richard Nelson",
    about: "Business Traveler",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    review:
      "Amazing service! The room was cozy and the check-in experience was incredibly smooth. I’ll definitely book through VacayStay again.",
    name: "Sophia Martinez",
    about: "Content Creator",
    rating: 3,
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  },
  {
    review:
      "Found the perfect hotel within minutes. Great prices, great locations, and a super clean room. VacayStay is a lifesaver!",
    name: "Ethan Roberts",
    about: "Frequent Traveler",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
  },
  {
    review:
      "Loved how transparent everything was—no hidden fees, no stress. The hotel was beautiful and exactly what I needed.",
    name: "Isabella Kim",
    about: "Vacation Guest",
    rating: 2,
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
  },
  {
    review:
      "I’ve tried many booking platforms, but this one is simply the best. Smooth experience, great support, and reliable hotels.",
    name: "Liam Johnson",
    about: "Solo Traveler",
    rating: 3,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    review:
      "The hotel exceeded my expectations — modern, clean, and super comfortable. VacayStay made the whole process effortless.",
    name: "Ava Patel",
    about: "Family Vacationer",
    rating: 4,
    image:
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
  },
];


    return (
        <section className='flex flex-col items-center justify-center mt-40'>
            <SectionTitle title='Our Testimonials' subtitle='Hear from our satisfied customers about the benefits of using SlideX. We love hearing from our customers.' />

            <div className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {data.map((item, index) => (
                    <div key={index} className='w-full max-w-88 space-y-4 rounded-md border border-gray-200 bg-white p-5 text-gray-500 transition-all duration-300 hover:-translate-y-1'>
                        <div className='flex gap-1'>
                            {...Array(item.rating)
                                .fill('')
                                .map((_, index) => <StarIcon key={index} className='size-4 fill-gray-600 text-gray-600' />)}
                        </div>
                        <p className='line-clamp-3'>“{item.review}”</p>
                        <div className='flex items-center gap-2 pt-3'>
                            <img className='size-10 rounded-full' src={item.image} alt={item.name} />
                            <div>
                                <p className='font-medium text-gray-800'>{item.name}</p>
                                <p className='text-gray-500 text-xs'>{item.about}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
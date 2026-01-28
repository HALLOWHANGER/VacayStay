'use client';

import SectionTitle from '../components/section-title';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export default function FaqSection() {
    const [isOpen, setIsOpen] = useState(false);
const data = [
    {
        question: 'Do I need prior experience to book a hotel through VacayStay Rental?',
        answer: "No experience is needed. Booking is simple and user-friendly, whether you’re a first-time guest or a frequent traveler.",
    },
    {
        question: 'What is VacayStay Rental and how does it help travelers?',
        answer: 'Otel Rental is a platform that provides easy access to hotel rooms, helping travelers quickly find and book accommodations that fit their needs and budget.',
    },
    {
        question: 'Can I book multiple hotels or rooms in my existing account?',
        answer: 'Yes, you can manage and book multiple hotels or rooms directly from your account, with full access to your bookings history.',
    },
    {
        question: 'How flexible are the booking options?',
        answer: 'Bookings can be customized with check-in/check-out dates, room preferences, and special requests to fit your schedule and needs.',
    },
    {
        question: 'Does VacayStay Rental support group bookings or team travel?',
        answer: 'Yes, you can book multiple rooms for groups, families, or team travel. Some hotels may offer special group rates.',
    },
    {
        question: 'Can I try VacayStay Rental before making a payment?',
        answer: 'Yes, you can browse hotels, view rooms, and check availability before confirming any payment.',
    },
];


    return (
        <section className='flex flex-col items-center justify-center mt-40'>
            <SectionTitle title="FAQ's" subtitle="Looking for answers to your frequently asked questions? Check out our FAQ's section below to find." />
            <div className='mx-auto mt-12 w-full max-w-xl'>
                {data.map((item, index) => (
                    <div key={index} className='flex flex-col border-b border-gray-200 bg-white'>
                        <h3 className='flex cursor-pointer items-start justify-between gap-4 py-4 font-medium' onClick={() => setIsOpen(isOpen === index ? null : index)}>
                            {item.question}
                            {isOpen === index ? <MinusIcon className='size-5 text-gray-500' /> : <PlusIcon className='size-5 text-gray-500' />}
                        </h3>
                        <p className={`pb-4 text-sm/6 text-gray-500 ${isOpen === index ? 'block' : 'hidden'}`}>{item.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
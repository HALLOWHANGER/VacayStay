

export default function WhatWeDoSection() {
    return (
        <section>
        <div className="flex flex-col md:flex-row items-center justify-center gap-20">
            <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
                <img className="max-w-sm w-full object-cover rounded-2xl"
                    src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
                    alt="" />
                <div className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white p-4 rounded-xl">
                    <div className="flex -space-x-4 shrink-0">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="image"
                            className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1" />
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="image"
                            className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-2" />
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                            alt="image"
                            className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-3" />
                        <div
                            className="flex items-center justify-center text-xs  text-white size-9 rounded-full border-[3px] border-white bg-indigo-600 hover:-translate-y-1 transition z-4">
                            50+
                        </div>
                    </div>
                    <p className="text-sm font-medium text-slate-800">Join our developer community</p>
                </div>
            </div>
            <div className="text-sm text-slate-600 max-w-md">
                <h1 className="text-xl uppercase font-semibold text-slate-700">What we do?</h1>
                <div className="w-24 h-[3px] rounded-full bg-linear-to-r from-indigo-600 to-[#DDD9FF]"></div>
                <p className="mt-8">
                VacayStay makes finding the perfect hotel effortless by turning your travel plans into smooth, stress-free stays.
                </p>
                <p className="mt-4">
                Whether you're booking a luxury getaway, a family-friendly room, or a budget stay, our curated listings are designed to give you comfort, convenience, and a seamless booking experience.
                </p>
                <p className="mt-4">
                From premium hotels to cozy apartments, VacayStay empowers you to discover the ideal stay, book instantly, and enjoy your trip your way.
                </p>
            </div>
            </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-20 mt-20">
            <div className="text-sm text-slate-600 max-w-md">
                <h1 className="text-xl uppercase font-semibold text-slate-700">Our Mission</h1>
                <div className="w-24 h-[3px] rounded-full bg-linear-to-r from-indigo-600 to-[#DDD9FF]"></div>
                <p className="mt-8">
  At VacayStay, our mission is to make travel effortless by connecting people with comfortable, reliable, and memorable places to stay.
</p>

<p className="mt-4">
  We believe booking a hotel should be simple, transparent, and stress-free. That’s why we curate quality stays that fit every budget and travel style.
</p>

<p className="mt-4">
  From luxurious getaways to cozy family rooms, our mission is to help you find the perfect stay, book with confidence, and enjoy every moment of your journey.
</p>

            </div>

            <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
                <img className="max-w-sm w-full object-cover rounded-2xl"
                    src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="" />
                </div>
                </div>
        </section>
        
    );
};
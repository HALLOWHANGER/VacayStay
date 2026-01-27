import { assets } from "../assets/assets";


export default function Header() {
    return (
        <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" alt="wwww" className="rounded-full w-32" />
            <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo">
                Welcome to VacayStay
                <img src={assets.logo} alt="" className="w-6 mb-1" />
            </h3>
            <h1 className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo">Best hotel rental service on earth.</h1>
            <p className="max-w-2xl mx-auto font-Ovo">Celebrating 10 years of customer satisfaction in multiple countries.</p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                <a href="/hotels"
                    className="px-10 py-2.5 border rounded-full bg-[#396ce5] text-white flex items-center gap-2 dark:border-transparent">
                    Explore Rooms
                </a>
            </div>
        </div>
    )
}
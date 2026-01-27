import { assets } from "../assets/assets";

export default function About() {

    const data = [
        {
            name: 'Locations',
            icon1: './assets/code-icon.png',
            icon2: './assets/code-icon-dark.png',
            description: 'Nigeria, Dubai, United States, Turkey, ETC.',
        },
        {
            name: 'Services',
            icon1: './assets/edu-icon.png',
            icon2: './assets/edu-icon-dark.png',
            description: 'Hotel Rental and Consultation Services',
        },
        {
            name: 'User Base',
            icon1: './assets/project-icon.png',
            icon2: './assets/project-icon-dark.png',
            description: 'Over 11 Million Satisfied Customers Worldwide',
        },
    ];
    return (
        <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="text-center mb-2 text-lg font-Ovo">Experience</h4>
            <h2 className="text-center text-5xl font-Ovo">About Vacay Stay</h2>

            <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
                <div className="max-w-max mx-auto relative">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" alt="" className="w-64 sm:w-80 rounded-3xl max-w-none" />

                    <div className="bg-white w-1/2 aspect-square absolute right-0 bottom-0 rounded-full translate-x-1/4 translate-y-1/3 shadow-[0_4px_55px_rgba(149,0,162,0.15)] flex items-center justify-center">
                        <img src={assets.logo} alt="" className="w-full animate-spin_slow invert" />
                    </div>
                </div>
                <div className="flex-1">
                    <p className="mb-10 max-w-2xl font-Ovo">We are a customer first rental service, offering hotel rental and consultation services globally, with easy to navigate user interface and top notch transparency</p>

                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
                        {data.map((data) => (
                            <li key={data.name} className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
                                <img src={data.icon1} alt="" className="w-7 mt-3 dark:hidden" />
                                <img src={data.icon2} alt="" className="w-7 mt-3 hidden dark:block" />
                                <h3 className="my-4 font-semibold text-gray-700 dark:text-black">{data.name}</h3>
                                <p className="text-gray-600 text-sm dark:text-black/80">{data.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
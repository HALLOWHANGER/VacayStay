export default function Services() {
    const services = [
        {
            name: 'Hotel Posting',
            icon: './assets/web-icon.png',
            description: 'Hotels are posted by professional and experienced hoteliers...',
            link: '#',
        },
        {
            name: 'Hotel Management',
            icon: './assets/mobile-icon.png',
            description: 'Manage your hotel bookings, customers and services easily...',
            link: '#',
        },
        {
            name: 'Payment Tracking',
            icon: './assets/ui-icon.png',
            description: 'Track payments and transactions with our integrated system...',
            link: '#',
        },
        {
            name: 'User Support',
            icon: './assets/graphics-icon.png',
            description: '24/7 customer support for all your hotel rental needs...',
            link: '#',
        }
    ];
    return (
        <div id="services" className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="text-center mb-2 text-lg font-Ovo">What we offer</h4>
            <h2 className="text-center text-5xl font-Ovo">Our services</h2>
            <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">I am a frontend developer from California, USA with 10 years of experience in multiple companies like Microsoft, Tesla and Apple.</p>

            <div className="grid grid-cols-auto gap-6 my-10">
                {services.map((service) => (
                    <div key={service.name} className="border border-black rounded-lg px-8 py-12 hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500">
                        <img src={service.icon} alt="" className="w-10" />
                        <h3 className="text-lg my-4 text-gray-700 dark:text-black">{service.name}</h3>
                        <p className="text-sm text-gray-600 leading-5 dark:text-black/80">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
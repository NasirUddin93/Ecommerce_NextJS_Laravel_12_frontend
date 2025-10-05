export default function OffersPage() {
    const offers = [
        {
            id: 1,
            title: 'Summer Sale!',
            description: 'Get up to 50% off on all summer collection.',
            image: '/images/summer-sale.jpg', // Placeholder image
        },
        {
            id: 2,
            title: 'Electronics Extravaganza',
            description: 'Huge discounts on your favorite gadgets.',
            image: '/images/electronics.jpg', // Placeholder image
        },
        {
            id: 3,
            title: 'Fashion Frenzy',
            description: 'Buy one get one free on selected apparel.',
            image: '/images/fashion.jpg', // Placeholder image
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
                style={{ backgroundImage: 'url("/images/hero-offers.jpg")' }} // Placeholder image
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl font-extrabold mb-4">Unbeatable Offers Just For You!</h1>
                    <p className="text-xl mb-8">Discover amazing deals on your favorite products.</p>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
                        Shop All Offers
                    </button>
                </div>
            </section>

            <div className="container mx-auto p-8">
                {/* Limited Time Offer Banner */}
                <div className="bg-yellow-400 text-gray-900 text-center p-4 rounded-lg shadow-md mb-8">
                    <p className="text-lg font-semibold">🎉 Limited Time Offers! Grab them before they're gone! 🎉</p>
                </div>

                <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Our Special Deals</h2>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offers.map((offer) => (
                        <div key={offer.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                            <img src={offer.image} alt={offer.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{offer.title}</h3>
                                <p className="text-gray-600 mb-4">{offer.description}</p>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

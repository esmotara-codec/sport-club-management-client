import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const bannerData = [
  {
    id: 1,
    title: "Join the Spirit of the Game",
    subtitle:
      "Be part of our sports community. Train, compete, and grow with athletes who share the same passion for sports and teamwork.",
    buttonText: "Become a Member",
    image:
      "https://res.cloudinary.com/dyuxx8ecm/image/upload/v1757872154/Football-Representational-Image-Getty-Images_cvqpb6.jpg",
    link: "/register"
  },
  {
    id: 2,
    title: "Train Smarter, Play Harder",
    subtitle:
      "From fitness programs to specialized coaching, we provide everything you need to sharpen your skills and stay at the top of your game.",
    buttonText: "Explore Training",
    image:
      "https://res.cloudinary.com/dyuxx8ecm/image/upload/v1757872557/BellevueSportingClub_Day2_Dec.19.2023_HR-101_pznrlz.jpg",
    link: "/training"
  },
  {
    id: 3,
    title: "Events, Matches & More",
    subtitle:
      "Stay updated with tournaments, club events, and exciting matches. Experience the thrill of competition and support your favorite teams.",
    buttonText: "View Events",
    image:
      "https://res.cloudinary.com/dyuxx8ecm/image/upload/v1757872559/bellevuesportingclub_day2_dec_19_2023_hr-070-65a6dffa39349_sbabxv.jpg",
    link: "/events"
  }
];



const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const navigate = useNavigate(); // Remove if not using React Router

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        let interval;

        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [isAutoPlaying, bannerData.length]);

    const goToPrevSlide = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerData.length) % bannerData.length);
    };

    const goToNextSlide = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    };

    const goToSlide = (index) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
    };

    const handleButtonClick = (link) => {
        // If using React Router:
        navigate(link);
        
    };

    return (
        <div className="relative w-full h-[500px] md:h-[700px]  overflow-hidden group">
            {/* Slides container */}
            <div className="w-full h-full relative">
                {bannerData.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={` absolute inset-0 bg-cover text-center   flex flex-col items-center justify-center  transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${banner.image})` }}
                    >

                        <div className="absolute inset-0 bg-black/70"></div>
                        <div className=" z-10 p-8 rounded-lg max-w-4xl mx-4">
                            <h1 className="text-2xl md:text-5xl font-bold mb-4 text-white">{banner.title}</h1>
                            <p className="text-sm md:text-xl mb-8 max-w-3xl text-white">{banner.subtitle}</p>
                            <button
                                onClick={() => handleButtonClick(banner.link)}
                                className="bg-white text-[#108ac2] hover:bg-[#108ac2] hover:text-white px-3 md:px-8 py-3 rounded-full font-bold transition-colors text-sm md:text-lg"
                            >
                                {banner.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
            >
                &larr;
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
            >
                &rarr;
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {bannerData.map((_, index) => (
                    <button
                        key={`indicator-${index}`}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white w-6' : 'bg-gray-400'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
import Marquee from "react-fast-marquee";

const NewsArrival = () => {
    return (
        <div className="overflow-hidden rounded-full bg-[#29485f] px-4 py-3 text-white shadow-[0_18px_45px_rgba(41,72,95,0.25)] sm:px-5 sm:py-4">
            <Marquee pauseOnHover gradient={false} speed={45} className="py-0">
                <span className="whitespace-nowrap text-sm font-medium text-white/90 sm:text-base">
                    New Arrivals: Sand Dune Mosaic
                </span>
                <span className="mx-6 text-white/50">|</span>
                <span className="whitespace-nowrap text-sm font-medium text-white/90 sm:text-base">
                    Weekly Feature: Modern Geometric Patterns
                </span>
                <span className="mx-6 text-white/50">|</span>
                <span className="whitespace-nowrap text-sm font-medium text-white/90 sm:text-base">
                    Join the Community...
                </span>
                <span className="mx-6 text-white/50">|</span>
                <span className="whitespace-nowrap text-sm font-medium text-white/90 sm:text-base">
                    New Arrivals: Ocean Slate Chevron
                </span>
            </Marquee>
        </div>
    );
};

export default NewsArrival;
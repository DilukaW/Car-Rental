import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import LogosSection from "./LogoSection";
import CarCard from "./CarCard";

import HowItWorks from "./HowItWorks";
import Footer from "./Footer";
const CarRentalHome = () => {
    return (
        <div className="homepage text-white" style={{ backgroundColor: "#0F0F24", minHeight: "100vh" }}>
            <Navbar />
            <HeroBanner />
            <LogosSection />
            <CarCard />
            <HowItWorks />
            <Footer />
        </div>
    );
};

export default CarRentalHome;
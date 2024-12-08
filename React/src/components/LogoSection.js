// Logos Section Component

import nissan from "../Images/nissan.png";
import toyota from "../Images/Toyota.png";
import audi from "../Images/audi.png";
import bmw from "../Images/bmw.png";
import benz from "../Images/benz.png";
import mitsu from "../Images/mistsu.png";
import honda from "../Images/honda.png";
import "../style/logo.css"

const LogosSection = () => {
    return (
        <div className="logos-section py-5 ">
            <div className="bg-dark text-white rounded m- container d-flex flex-wrap justify-content-center align-items-center gap-3">
                <img src={honda} alt="Honda" className="img-fluid logo-img" />
                <img src={toyota} alt="Toyota" className="img-fluid logo-img" />

                <img src={nissan} alt="Nissan" className="img-fluid logo-img" />
                <img src={audi} alt="Audi" className="img-fluid logo-img" />
                <img src={bmw} alt="BMW" className="img-fluid logo-img" />
                <img src={benz} alt="Benz" className="img-fluid logo-img" />
            </div>
        </div>
    );
};
export default LogosSection;

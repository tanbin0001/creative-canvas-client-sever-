import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
    return (

        <Carousel className="text-center relative    ">
            <div>
                <img src="https://i.ibb.co/ry7qQ4W/slider1.png" />
            </div>
            <div>
                <img src="https://i.ibb.co/X3HbJwz/slider-2.png" />
            </div>
            <div>
                <img src="https://i.ibb.co/NxbHDyj/slider3.png" />
            </div>

        </Carousel>

    );
};

export default Banner;




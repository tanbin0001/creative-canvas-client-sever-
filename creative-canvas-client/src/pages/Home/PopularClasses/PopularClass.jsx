import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()
const PopularClass = ({ classItem }) => {
    const { courseName, image, instructorName, price, numbersofstuds } = classItem;

    return (
        <div
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
        >
            <motion.div
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}
                className="card  w-80  bg-base-100  shadow-2xl shadow-black  rounded-none    ">
                <figure><img className='h-60' src={image} alt="course image" /></figure>
                <div className="card-body">
                    <h2 className="text-xl"> <span className="font-bold">Course Name:</span> {courseName}</h2>
                    <h2 className=""> <span className="font-bold">Instructor:</span> {instructorName}</h2>
                    <p><span className="font-bold">Price:</span> $ {price}</p>
                    <p><span className="font-bold">Number Of Students:</span> {numbersofstuds}</p>
                    <div className="card-actions justify-end">
                        <Link to='/allClasses'>
                            <button

                                className="btn bg-[#FF7777] text-white font-light">Enroll Now</button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PopularClass;
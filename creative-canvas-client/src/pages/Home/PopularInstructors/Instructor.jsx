
import { motion } from "framer-motion"
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()
const Instructor = ({ instructor }) => {
    const { instructor_image, instructor_email, instructorName, studentsEnrolled } = instructor;
    return (
        <div
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
        >
            <motion.div
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}
                className="card w-80 bg-base-100 shadow-2xl shadow-black rounded-none   " >
                <figure><img className='h-60' src={instructor_image} alt="course image" /></figure>
                <div className="card-body">
                    <h2 className=" 
                    "> <span className="font-bold">Instructor:</span> {instructorName}</h2>
                    <p><span className="font-bold">Email:</span> {instructor_email}</p>


                </div>
                <div className="card-actions justify-end my-2 mx-5" >

                    <button className="btn bg-[#FF7777] text-white font-light">Enroll Now</button>

                </div>
            </motion.div>

        </div >
    );
};

export default Instructor;

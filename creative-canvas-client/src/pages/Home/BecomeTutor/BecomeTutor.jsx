import { motion } from "framer-motion"


const BecomeTutor = () => {
    return (
        <div className='my-20'>
            <div>
                <div className="hero h-[400px] " style={{
                    backgroundImage:
                        "url(https://files.catbox.moe/8f4jhw.jpg)",
                }} >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-start text-neutral-content">
                        <div className=" lg:-ml-[500px]">
                            <motion.h1 whileHover={{ scale: 1.2 }} className="mb-5 text-5xl font-bold">You can become <br />
                                a great private tutor too!</motion.h1>
                            <p className="mb-5">Share your knowledge, live off your passion and be your own boss

                            </p>
                            <button className="btn  bg-[#FF7777] text-white font-light hover:text-black">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default BecomeTutor;
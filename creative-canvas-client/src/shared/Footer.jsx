import React from 'react';
import { BsFacebook, BsYoutube, BsInstagram } from "react-icons/bs";

const Footer = () => {
    return (
        <div className='mt-20'>
            <footer className="footer p-10 bg-neutral text-neutral-content">
                <div>
                    <img className='w-16' src="https://files.catbox.moe/w7zhy9.png" alt="" />
                    <p> <span className='text-2xl font-bold'>Creative Canvas</span>.<br />Explore the universe with colors</p>
                </div>
                <div>
                    <span className="footer-title text-center">Social</span>
                    <div className="grid grid-flow-col gap-4 text-red-500 text-3xl">
                        <BsFacebook></BsFacebook>
                        <BsYoutube></BsYoutube>
                        <BsInstagram></BsInstagram>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
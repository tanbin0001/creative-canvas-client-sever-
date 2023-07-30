import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <img src="https://freefrontend.com/assets/img/html-funny-404-pages/Darknet-404-Page-Concept.png" alt="" />
            <div className=' flex justify-center -mt-20'>
                <Link to='/'>
                    <button className='btn  border-white    bg-red-400 '>Go Back</button>
                </Link>
            </div>s
        </div>
    );
};

export default ErrorPage;
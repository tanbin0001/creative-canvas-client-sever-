import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import useSelectedClass from '../../hooks/useSelectedClass';
import { useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()

const SingleClass = ({ singleClass }) => {
    const { user } = useContext(AuthContext);
    const { courseName, image, instructor, availableSeats, price, _id, studentsEnrolled } = singleClass;
    const [, refetch] = useSelectedClass();
    const isSeatsAvailable = availableSeats > 0;
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const handleSelect = (singleClass) => {
        if (user && user.email) {
            const selectedClass = { classId: _id, courseName, image, instructor, availableSeats, email: user.email, price }
            setIsButtonDisabled(true); //
            fetch('https://creative-canvas-server.vercel.app/selectedClasses', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(selectedClass)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({

                            icon: 'success',
                            title: ' Class Added',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }).catch(error => {
                    setIsButtonDisabled(false);
                    console.error(error);
                });
        }
        else {
            toast.error('Login First To Select the course');
            return;
        }
    };
    const cardClassName = `card w-[350px] bg-base-100 shadow-2xl rounded-none ${!isSeatsAvailable ? 'bg-red-500 text-white' : ''}`;
    return (
        <div>
            <div
                data-aos="fade-up"
                data-aos-duration="3000"
                className={cardClassName}>

                <figure><img className=' h-60' src={image} alt="course image" /></figure>
                <div className="card-body ">
                    <h2 className=" "> <span className="font-bold  ">Course Name:</span> {courseName}</h2>
                    <h2 className=" "> <span className="font-bold">Instructor:</span> {instructor}</h2>
                    <p><span className="font-bold">Available Seats:</span> {availableSeats}</p>
                    <p><span className="font-bold">Students Enrolled:</span> {studentsEnrolled}</p>
                    <p><span className="font-bold">Price:</span> $ {price}</p>

                    <div className="card-actions justify-end">

                        <button
                            onClick={handleSelect}
                            className="btn  bg-[#FF7777] text-white font-light"
                            disabled={!isSeatsAvailable || isButtonDisabled}
                        >
                            {isButtonDisabled ? 'Selected' : (isSeatsAvailable ? 'Select' : <span className='text-white animate-pulse'>No seat available</span>)}
                        </button>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default SingleClass;


import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Spinner from '../../components/Spinner/Spinner';

import { BiHomeAlt } from "react-icons/bi";
import { GiClassicalKnowledge } from "react-icons/gi";
import { IoMdDoneAll } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import { GoTag } from "react-icons/go";
import { MdManageAccounts } from "react-icons/md";
import { MdHotelClass } from "react-icons/md";


import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()



const Dashboard = () => {
    const [userRole, setUserRole] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://creative-canvas-server.vercel.app/users')
            .then(res => res.json())
            .then(data => {

                setUserRole(data);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        const myData = userRole.find(u => u.email === user.email);
        if (myData?.role === 'admin') {
            navigate('adminHome');
        } else if (myData?.role === 'instructor') {
            navigate('myClasses');
        } else {
            navigate('mySelectedClasses');
        }
    }, [userRole, user.email, navigate]);

    const myData = userRole.find(u => u.email === user.email)
    console.log(myData);


    if (isLoading) {
        return <Spinner></Spinner>;
    }


    return (
        <div
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-duration="2000"
            data-aos-easing="ease-in-sine"
        >
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        <Outlet />
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                            Open drawer
                        </label>
                    </div>
                    <div className="drawer-side " >
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 h-full  bg-[#FF7777] text-white font-light">
                            {/* Common routes */}
                            <li>
                                <NavLink to="/"><BiHomeAlt></BiHomeAlt> Home</NavLink>
                            </li>
                            {/* Admin routes */}




                            {
                                myData?.role === 'admin' && (
                                    <>

                                        <li>
                                            <NavLink to="adminHome" className={({ isActive }) => isActive ? 'bg-red-600 text-white' : ' text-black '} > <BiHomeAlt></BiHomeAlt> Admin Home</NavLink>
                                        </li>

                                        <li>
                                            <NavLink className={({ isActive }) => isActive ? 'bg-red-600 text-white' : ' text-black '} s to="manageUsers"> <MdManageAccounts></MdManageAccounts> Manage Users</NavLink >
                                        </li>
                                        <li>
                                            <NavLink className={({ isActive }) => isActive ? 'bg-red-600 text-white' : ' text-black '} s to="manageClasses"> <MdHotelClass></MdHotelClass>  Manage Classes</NavLink>
                                        </li>
                                    </>
                                )
                            }

                            {/* Instructor routes */}
                            {
                                myData?.role === 'instructor' && (
                                    <>
                                        <li>
                                            <NavLink className={({ isActive }) => isActive ? 'bg-red-600 text-white' : ' text-black '} to="addClasses"> <GrAddCircle className='text-white'></GrAddCircle> Add Classes</NavLink >
                                        </li>
                                        <li>
                                            <NavLink className={({ isActive }) => isActive ? 'bg-red-600 text-white' : ' text-black '} to="myClasses"><GoTag></GoTag> My Classes</NavLink >
                                        </li>
                                    </>
                                )
                            }



                            {/* Student routes */}

                            {
                                myData?.role !== 'instructor' && myData?.role !== 'admin' && (
                                    <>

                                        <li>
                                            <NavLink className={({ isActive }) => isActive ? 'bg-red-600 text-white' : ' text-black '} to="mySelectedClasses"><GiClassicalKnowledge></GiClassicalKnowledge> My Selected Classes</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className={({ isActive }) => isActive ? 'bg-red-600 text-white' : ' text-black '} to="myEnrolledClasses">
                                                <IoMdDoneAll></IoMdDoneAll>  My Enrolled Classes</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className={({ isActive }) => isActive ? 'bg-red-600 text-white' : ' text-black '} to="paymentHistory">
                                                <MdPayment></MdPayment> Payment History</NavLink>
                                        </li>
                                    </>
                                )

                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;

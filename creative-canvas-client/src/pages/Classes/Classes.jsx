import React, { useEffect, useState } from 'react';
import SingleClass from './SingleClass';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetch('https://creative-canvas-server.vercel.app/allClasses')
            .then(res => res.json())
            .then(data => {
                setClasses(data);

            })
    }, [])
    console.log(classes, 'from classess');

    const filteredClasses = classes.filter(singleClass => singleClass.status !== 'pending' && singleClass.status !== 'denied');

    return (
        <div>
            <SectionHeading heading="All Classes"></SectionHeading>
            <ToastContainer />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-xl'>
                {filteredClasses.map(singleClass => (
                    <SingleClass key={singleClass._id} singleClass={singleClass} />
                ))}
            </div>

        </div>
    );
};

export default Classes;
import React, { useEffect, useState } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import SingleInstructor from './SingleInstructor';

const Instructors = () => {
    const [allInstructors, setAllInstructors] = useState([]);
    useEffect(() => {
        fetch('https://creative-canvas-server.vercel.app/allInstructors')
            .then(res => res.json())
            .then(data => {
                setAllInstructors(data)
                console.log(data);
                console.log(allInstructors);
            })

    }, [])
    return (

        <div>
            <SectionHeading heading="Our Instructors "></SectionHeading>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {

                    allInstructors.map(instructor => <SingleInstructor key={instructor._id} instructor={instructor}></SingleInstructor>)
                }</div>
        </div>
    );
};

export default Instructors; 

import React, { useEffect, useState } from 'react';

import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import Instructor from './Instructor';

const PopularInstructors = () => {
    const [instructors, setInstructors] = useState([])
    useEffect(() => {
        fetch('https://creative-canvas-server.vercel.app/instructors')
            .then(res => res.json())
            .then(data => {
                setInstructors(data)
                console.log(instructors);
            })

    }, [])
    return (
        <div className='flex justify-center' >
            <div>
                <SectionHeading heading="Popular Instructors"></SectionHeading>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8    '>
                    {
                        instructors.map((instructor) => <Instructor key={instructor._id} instructor={instructor}></Instructor>)
                    }
                </div>
            </div>
        </div >
    );
};

export default PopularInstructors;
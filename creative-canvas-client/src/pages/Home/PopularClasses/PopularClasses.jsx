import React, { useEffect, useState } from 'react';
import PopularClass from './PopularClass';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

const PopularClasses = () => {
    const [classes, setClasses] = useState([])
    useEffect(() => {
        fetch('https://creative-canvas-server.vercel.app/classes')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })

    }, [])
    return (
        <div className='flex justify-center'  >
            <div>
                <SectionHeading heading="Popular Classes"></SectionHeading>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10'>
                    {
                        classes.map((classItem) => <PopularClass key={classItem._id} classItem={classItem}></PopularClass>)
                    }
                </div>
            </div>
        </div>
    );
};

export default PopularClasses;
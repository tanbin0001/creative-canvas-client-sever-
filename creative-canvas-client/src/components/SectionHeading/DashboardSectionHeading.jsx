import React from 'react';

const DashboardSectionHeading = ({ heading }) => {
    return (


        <div className='w-4/12 mx-auto text-center my-10 bg-center border-dotted border-y-2 border-[#FF7777] '  >

            <h3 className='text-3xl uppercase py-4  font-bold  '>{heading}</h3>
        </div>


    );
};

export default DashboardSectionHeading;
import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";

const Spinner = () => {
    return (
        <div className='flex justify-center h-screen items-center'>
            <PropagateLoader color="#FF7777" />

        </div>
    );
};

export default Spinner;
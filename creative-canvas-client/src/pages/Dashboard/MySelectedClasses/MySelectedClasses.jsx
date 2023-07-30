import React, { useEffect, useState } from 'react';
import useSelectedClass from '../../../hooks/useSelectedClass';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';
import DashboardSectionHeading from '../../../components/SectionHeading/DashboardSectionHeading';
const MySelectedClasses = () => {
    const [selectedClasses, refetch] = useSelectedClass();
    const [isLoading, setIsLoading] = useState(true);



    const { id } = useParams();
    console.log(id);



    const handleDelete = selectedClass => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {


                fetch(`https://creative-canvas-server.vercel.app/selectedClasses/${selectedClass._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }



    useEffect(() => {
        refetch()
            .then(() => setIsLoading(false))
            .catch(error => {
                console.error('Error fetching selected classes:', error);
                setIsLoading(false);
            });
    }, []);
    return (
        <div className='w-[1000px]'>
            <DashboardSectionHeading heading='My Selected Classes'></DashboardSectionHeading>
            <div className="overflow-x-auto">
                {isLoading ? (
                    <p className='animate-pulse text-center font-bold text-[#FF7777]'>Selected classes are Loading...</p>
                ) : (
                    <>
                        {selectedClasses.length === 0 ? (
                            <p className='animate-pulse text-center font-bold text-[#FF7777]'>No Classes Found :)...</p>
                        ) : (
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>Class Image</th>
                                        <th>Class Name</th>
                                        <th>Price</th>
                                        <th>Pay</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        selectedClasses.map((selectedClass, index) => <tr key="selectedClass._id">
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask  w-12 h-12">
                                                            <img src={selectedClass?.image} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td className="font-bold">
                                                {selectedClass.courseName}
                                            </td>
                                            <td>$ {selectedClass?.price}</td>
                                            <td>
                                                <Link to={`/dashboard/payment/${selectedClass._id}`}>
                                                    <button className="btn btn-success ">Pay</button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(selectedClass)} className="btn btn-ghost  bg-red-600 text-white">D</button>
                                            </td>

                                            {/* TODO: change button icon */}
                                        </tr>
                                        )
                                    }


                                </tbody>


                            </table>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MySelectedClasses;
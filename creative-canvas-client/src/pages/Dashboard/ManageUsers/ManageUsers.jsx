import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import Swal from 'sweetalert2';
import DashboardSectionHeading from '../../../components/SectionHeading/DashboardSectionHeading';

const ManageUsers = () => {
    const [disabledButtons, setDisabledButtons] = useState([]);


    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('https://creative-canvas-server.vercel.app/users');
        const userData = await res.json();

        // Update disabled buttons for instructors and admins
        const disabledInstructors = userData.filter(user => user.role === 'instructor').map(user => user._id);
        const disabledAdmins = userData.filter(user => user.role === 'admin').map(user => user._id);
        setDisabledButtons([...disabledInstructors, ...disabledAdmins]);

        return userData;
    })



    const handleMakeAdmin = user => {

        fetch(`https://creative-canvas-server.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({

                        icon: 'success',
                        title: `${user.name} is an admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })


                }
            })
    }
    const handleMakeInstructor = user => {


        fetch(`https://creative-canvas-server.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({

                        icon: 'success',
                        title: `${user.name} is an Instructor now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });


                }
            })
    }
    return (
        <div className='min-w-full'>

            <DashboardSectionHeading heading='Manage Users' ></DashboardSectionHeading>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Make Instructor</th>
                                <th>Make Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user.email}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === 'admin'
                                            ? 'admin'
                                            : user.role === 'instructor'
                                                ? 'instructor'
                                                : 'student'}
                                    </td>

                                    <td>
                                        <button
                                            disabled={user.role === 'instructor'}
                                            onClick={() => handleMakeInstructor(user)}
                                            className="btn btn-sm  bg-blue-500 text-white">Instructor</button>
                                    </td>
                                    <td>
                                        <button
                                            disabled={user.role === 'admin'}
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-sm  bg-red-600 text-white">
                                            Admin</button>

                                    </td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
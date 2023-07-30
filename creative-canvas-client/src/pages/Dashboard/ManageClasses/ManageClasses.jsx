import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageClasses = () => {
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [selectedClass, setSelectedClass] = useState(null);
    const [disabledItems, setDisabledItems] = useState([]);

    const { data: allClasses = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('https://creative-canvas-server.vercel.app/myClasses');
        return res.json();
    })



    const handleApprove = aClass => {
        axios.patch(`https://creative-canvas-server.vercel.app/myClasses/manageClasses/approve/${aClass._id}`, allClasses)
            .then(res => {
                console.log(res.data);
                if (res.data.acknowledged) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: `Class Approved`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setDisabledItems((prevDisabledItems) => [...prevDisabledItems, aClass._id]);
                }
            })
    }
    const handleDeny = aClass => {
        axios.patch(`https://creative-canvas-server.vercel.app/myClasses/manageClasses/deny/${aClass._id}`, allClasses)
            .then(res => {
                console.log(res.data);
                if (res.data.acknowledged) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: `Class Denied`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setDisabledItems((prevDisabledItems) => [...prevDisabledItems, aClass._id]);
                }
            })
    }
    const handleSendFeedback = (aClass) => {
        setSelectedClass(aClass._id);
        console.log(selectedClass);
        setFeedbackModalOpen(true);
    };



    const handleSubmitFeedback = () => {
        const classesItem = allClasses.find((item) => item._id === selectedClass);

        fetch(`https://creative-canvas-server.vercel.app/myClasses/manageClasses/deny/${classesItem._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ feedbackText }),
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `feedback send for ${classesItem.courseName} !`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
        setFeedbackModalOpen(false);
        setFeedbackText("");
    };

    return (
        <div className='w-full'>
            <SectionHeading heading="Manage Classes"></SectionHeading>
            <div>
                <div className="overflow-x-auto ">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Images</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Approve</th>
                                <th>Deny</th>
                                <th>Send Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allClasses.map((aClass, index) => <tr key={aClass._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>

                                        <div className="avatar">
                                            <div className="mask  w-12 h-12">
                                                <img src={aClass.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {aClass.courseName}
                                    </td>
                                    <td>{aClass?.status}</td>
                                    <th>
                                        <button
                                            onClick={() => handleApprove(aClass)}
                                            className="btn btn-success"
                                            disabled={disabledItems.includes(aClass._id)} // Disable if item is already disabled
                                        >
                                            Approve
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            onClick={() => handleDeny(aClass)}
                                            className="btn btn-error"
                                            disabled={disabledItems.includes(aClass._id)} // Disable if item is already disabled
                                        >
                                            Deny
                                        </button>
                                    </th>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className=" btn bg-blue-500 font-light text-white px-4 py-2 rounded"
                                            onClick={() => handleSendFeedback(aClass)}
                                            disabled={aClass.status !== "denied"}
                                        >
                                            Send Feedback
                                        </button>
                                    </td>
                                </tr>)
                            }



                        </tbody>


                    </table>
                </div>
                {feedbackModalOpen && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 max-w-sm">
                            <h2 className="text-xl font-bold mb-4">Send Feedback</h2>
                            <textarea
                                className="w-full h-32 border border-gray-300 p-2 mb-4"
                                placeholder="Enter your feedback here"
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                            ></textarea>
                            <div className="flex justify-end">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={handleSubmitFeedback}
                                >
                                    Submit
                                </button>
                                <button
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                    onClick={() => setFeedbackModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ManageClasses;
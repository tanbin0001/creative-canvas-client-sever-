import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import DashboardSectionHeading from "../../../components/SectionHeading/DashboardSectionHeading";

const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const [myClasses, setMyClasses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState("");

    const url = `https://creative-canvas-server.vercel.app/myClasses?instructor_email=${user?.email}`;
    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMyClasses(data)
            })

    }, [url]);

    const openModal = (feedback) => {
        setSelectedFeedback(feedback);
        setIsModalOpen(true);
    };
    console.log(myClasses);
    return (
        <div className="w-full">
            <DashboardSectionHeading heading='My Classes'></DashboardSectionHeading>
            <div className="overflow-x-auto w-full font-marcellus ">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Enrolled Students</th>
                            <th>Price</th>
                            <th>Feedback</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myClasses.map((myClasses, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={myClasses.image} alt={myClasses.name} className="h-20 w-20" />
                                </td>
                                <td>{myClasses?.status}</td>
                                <td >{myClasses?.studentsEnrolled}</td>

                                <td>${myClasses.price}</td>

                                <td>
                                    {myClasses?.feedback ? (
                                        <button className="btn" onClick={() => openModal(myClasses.feedback)}>
                                            View Feedback
                                        </button>
                                    ) : (
                                        "N/F"
                                    )}
                                </td>
                                <td>
                                    <button className="btn  " >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
                    <div className="bg-white p-4 rounded-lg shadow-lg z-10">
                        <h2 className="text-xl font-bold mb-4">Feedback</h2>
                        <p>{selectedFeedback}</p>

                        <button
                            className="btn mt-4"
                            onClick={() => setIsModalOpen(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
};

export default MyClasses;
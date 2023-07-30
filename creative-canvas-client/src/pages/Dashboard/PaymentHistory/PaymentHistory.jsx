import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import useSelectedClass from '../../../hooks/useSelectedClass';
import { AuthContext } from '../../../providers/AuthProvider';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import DashboardSectionHeading from '../../../components/SectionHeading/DashboardSectionHeading';

const PaymentHistory = () => {
    const [allPayments, setAllPayments] = useState([]);
    const { user } = useContext(AuthContext);
    const [selectedClasses, refetch] = useSelectedClass();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://creative-canvas-server.vercel.app/payments');
                const data = await response.json();

                setAllPayments(data);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        })();
    }, [selectedClasses]);
    const filteredPayments = allPayments.filter(payment => payment.email === user?.email).reverse();

    console.log(filteredPayments, 'from filter payments');
    return (
        <div className='w-full'>
            <DashboardSectionHeading heading="Payment History"></DashboardSectionHeading>

            <div>
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <p className='animate-pulse text-center font-bold text-[#FF7777]'>Payment Histories  are Loading...</p>
                    ) : (
                        <>
                            {selectedClasses.length === 0 ? (
                                <p className='animate-pulse text-center font-bold text-[#FF7777]'>No Payments Done Yet :)...</p>
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
                                            <th>Date</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {
                                            filteredPayments.map((payment, index) => <tr key={payment._id}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask  w-12 h-12">
                                                                <img src={payment?.image} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </td>
                                                <td className="font-bold">
                                                    {payment?.courseName}
                                                </td>
                                                <td>$ {payment?.price}</td>
                                                <td>{payment?.date}</td>
                                            </tr>)
                                        }



                                    </tbody>


                                </table>
                            )}
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PaymentHistory;
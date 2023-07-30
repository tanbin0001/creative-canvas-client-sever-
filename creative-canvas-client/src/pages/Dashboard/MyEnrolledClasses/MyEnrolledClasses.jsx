/* import React, { useEffect, useState } from 'react';
import useSelectedClass from '../../../hooks/useSelectedClass';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

const MyEnrolledClasses = () => {
    const [selectedClasses] = useSelectedClass();
    const { allPayments, setAllPayments } = useState();

    useEffect(() => {

        fetch('https://creative-canvas-server.vercel.app/payments')
            .then(res => res.json())
            .then(data => {
                setAllPayments(data);
            })
    }, [])

    console.log(allPayments);


    return (
        <div className='w-[1000px]'>
            <SectionHeading heading='My Enrolled Classes'></SectionHeading>
        </div>
    );
};

export default MyEnrolledClasses;


  useEffect(() => {
        fetch('https://creative-canvas-server.vercel.app/payments')
            .then(res => res.json())
            .then(data => {
                setAllPayments(data);
                const payedItem = allPayments.find(payment => payment.classId === selectedClasses.classId);
                console.log(payedItem);
                setPayedClass(payedItem);
            })

    }, [selectedClasses]);  
 */

import React, { useContext, useEffect, useState } from 'react';
import useSelectedClass from '../../../hooks/useSelectedClass';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import { AuthContext } from '../../../providers/AuthProvider';
import DashboardSectionHeading from '../../../components/SectionHeading/DashboardSectionHeading';

const MyEnrolledClasses = () => {
    const [selectedClasses] = useSelectedClass();
    const [allPayments, setAllPayments] = useState([]);
    const [payedClass, setPayedClass] = useState({});
    const { user } = useContext(AuthContext);
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
    const filteredPayments = allPayments.filter(payment => payment.email === user?.email);




    console.log(allPayments, 'from payedClass  ');

    return (
        <div className='w-[1000px]'>
            <DashboardSectionHeading DashboardSectionHeading heading='My Enrolled Classes'></DashboardSectionHeading>
            <div>
                {isLoading ? (
                    <p className='animate-pulse text-center font-bold text-[#FF7777]'>Enrolled classes are Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
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



                                    </tr>)
                                }



                            </tbody>


                        </table>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyEnrolledClasses;



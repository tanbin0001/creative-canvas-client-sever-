
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSelectedClass from '../../../hooks/useSelectedClass';
import DashboardSectionHeading from '../../../components/SectionHeading/DashboardSectionHeading';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);


const Payment = () => {
    const { id } = useParams();

    const [selectedClasses, refetch] = useSelectedClass();
    const [foundClass, setFoundClass] = useState();
    const [price, setPrice] = useState([]);

    useEffect(() => {
        const matchedClass = selectedClasses.find(classForPay => classForPay._id === id);
        setFoundClass(matchedClass)
        // console.log(foundClass);
        if (matchedClass) {

            setPrice(parseFloat(matchedClass.price))
        }
    }, [price, id, selectedClasses]);



    return (
        <div className='w-[500px]'>
            <DashboardSectionHeading heading='Payment' ></DashboardSectionHeading>
            <Elements stripe={stripePromise}>
                <CheckoutForm foundClass={foundClass} price={price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;
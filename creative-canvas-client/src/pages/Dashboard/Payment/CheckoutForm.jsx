import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const CheckoutForm = ({ price, foundClass }) => {

    console.log(foundClass, 'from  found class');
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);

    const { user } = useContext(AuthContext);




    useEffect(() => {
        fetch('https://creative-canvas-server.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({ price }),
        })
            .then(res => res.json())
            .then(data => {

                setClientSecret(data.clientSecret);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('')

        }
        setProcessing(true)

        const { paymentIntent: paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        })
        if (confirmError) {
            setCardError(confirmError)
        }


        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            console.log(paymentIntent.id)

            //save payment info to the server
            const payment = {
                email: user.email,
                transactionId: paymentIntent.id,
                price,
                new_id: foundClass._id,
                classId: foundClass.classId,
                image: foundClass.image,
                date: new Date().toLocaleDateString(),
                courseName: foundClass.courseName,

            }

            axios.post('https://creative-canvas-server.vercel.app/payments', payment)
                .then(res => {
                    console.log(res);
                    if (res.data.insertedId) {
                        //displayconfirm
                        Swal.fire({
                            icon: 'success',
                            title: `$ ${price} Payment Confirmed`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
    }
    return (
        <div className=' '>
            <div>
                <form className='bg-base-100 shadow-lg  border-2  p-5' onSubmit={handleSubmit}>
                    <CardElement className='border shadow-lg py-3'
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />

                    <input className='btn btn-success btn-md  my-5   w-full' disabled={!stripe || processing} type="submit" value="Pay" />
                </form>
                {cardError && <p className='text-red-600'>{cardError}</p>}
                {transactionId && <p className='text-green-500'>Your Transaction Id: {transactionId}</p>}

            </div>
        </div>

    );
};

export default CheckoutForm;
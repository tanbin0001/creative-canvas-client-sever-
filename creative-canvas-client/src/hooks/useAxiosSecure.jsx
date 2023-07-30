

import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../providers/AuthProvider';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});


const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                // console.log(token, 'from');
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });


        axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401 || status === 403) {
                        return logOut()
                            .then(() => {
                                navigate('/login');
                                return Promise.reject(error);
                            })
                            .catch((logoutError) => {
                                console.log('Error logging out:', logoutError);
                                return Promise.reject(error);
                            });
                    }
                }
                return Promise.reject(error);
            }
        );
    }, [logOut, axiosSecure]);

    return [axiosSecure];
};

export default useAxiosSecure;
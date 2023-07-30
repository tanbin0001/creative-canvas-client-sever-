


import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';

import { FcGoogle } from "react-icons/fc";


const SocialLogin = () => {

    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()

    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);

                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
                fetch('https://creative-canvas-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {


                        navigate(from, { replace: true })


                    })
            })
    }


    return (
        <div>
            <div className="divider"></div>
            <div className='w-full text-center my-4'>
                <button onClick={handleGoogleSignIn} className="btn ">
                    <FcGoogle></FcGoogle> continue with google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
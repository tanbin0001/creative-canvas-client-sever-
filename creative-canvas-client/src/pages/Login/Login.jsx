import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SocialLogin from "../../shared/SocialLogin";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const {
        loading,
        setLoading,
        signIn,
        signInWithGoogle,

    } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                // form.reset();

                navigate(from, { replace: true })
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    toast.error('Invalid password!');
                }
                else if (error.code === 'auth/invalid-email') {
                    toast.error('Invalid Email');
                }
                else if (error.code === 'auth/user-not-found') {
                    toast.error('User not found');
                }
                else {

                    toast.warning(`${error}`);
                }
            })

        console.log(data)
    };


    // handle google signin
    const handleGoogleSignIn = () => {

        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);


                navigate(from, { replace: true })
            }).catch(error => {

                toast.warning(`${error}`);
                console.log(error);
            })
    }
    return (
        <div className="hero min-h-screen  bg-base-200 bg-cover  " style={{
            backgroundImage:
                "url(https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80)",
        }}>
            <div className="hero-content flex-col  ">
                <h1 className="text-4xl font-bold text-red-400 animate-bounce">Please Login</h1>
                <div className="card   shadow-2xl bg-base-100 border-2 border-red-400">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email")} type="text" placeholder="email" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    className="input input-bordered"

                                />
                                <button

                                    className="absolute top-0 right-0 h-full flex items-center px-2 text-gray-500"
                                    onClick={togglePasswordVisibility}
                                >

                                    {showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>}
                                </button>
                            </div>

                        </div>


                        <div className="form-control mt-6">
                            <button className="btn  bg-[#FF7777] text-white font-light"
                            >Login</button>
                        </div>

                    </form>
                    <label className="label">
                        <Link to="/register" className="label-text-alt link link-hover text-customBlue mx-auto text-red-400 font-bold  ">
                            Dont't have an account? <span className="underline">Please Register!</span>
                        </Link>
                    </label>

                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
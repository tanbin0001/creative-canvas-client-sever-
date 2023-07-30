import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../shared/SocialLogin";


const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const { register, watch, handleSubmit, formState: { errors } } = useForm();

    const password = watch("password");
    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateUserProfile(data.name, data.photoURL)

                const savedUser = { name: data.name, email: data.email, }
                console.log(name);
                fetch('https://creative-canvas-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {

                            Swal.fire({

                                icon: 'success',
                                title: 'Registration Successful',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            navigate(from, { replace: true })
                        }
                    })

            }).catch(err => {
                toast.error(err.message);

            })

    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col  ">
                    <div className="text-center  ">
                        <h1 className="text-5xl font-bold text-red-400 animate-bounce "> Register Now</h1>

                    </div>
                    <div className="card  border-2  border-red-400  shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="flex ">
                                <div className="form-control mr-3">
                                    <label className="label">
                                        <span className="label-text">Your Name</span>
                                    </label>
                                    <input  {...register("name", { required: true, maxLength: 20 })} type="text" placeholder="  Name" className="input input-bordered border  border-red-400" />
                                    {errors.name?.type === 'required' && <span className="text-red-500 font-semibold">Name is required </span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input  {...register("photoURL", { required: true, })} type="text" placeholder="Photo" className="input input-bordered border  border-red-400" />
                                    {errors.photoURL?.type === 'required' && <span className="text-red-500 font-semibold">PhotoURL is required </span>}

                                </div>
                            </div>
                            <div>
                                <div className="flex ">
                                    <div className="form-control  mr-3">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input  {...register("email", { required: true })} type="text" placeholder="email" className="input input-bordered border  border-red-400" />
                                        {errors.email?.type === 'required' && <span className="text-red-500 font-semibold">Email is required</span>}



                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            {...register("password", {
                                                required: true,
                                                pattern: /(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6}/
                                            })}
                                            placeholder="password"
                                            className="input input-bordered border  border-red-400"
                                        />

                                        {errors.password?.type === 'required' && <span className="text-red-500 font-semibold">Password is required</span>}
                                        {errors.password?.type === 'pattern' && <span className="text-red-500 font-semibold">Password must be 6 characters, <br /> 1 capital letter and 1 special character</span>}



                                    </div>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password"  {...register("confirm", {
                                    required: true,
                                    validate: (value) => value === password,
                                })} placeholder=" confirm password" className="input input-bordered border  border-red-400" />
                                {errors.confirm?.type === 'required' && <span className="text-red-500 font-semibold">Password is not matched</span>}

                                {errors.confirm?.type === "validate" && (
                                    <span className="text-red-500 font-semibold">
                                        Passwords do not match
                                    </span>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-block  bg-red-400 text-white font-light" type="submit" value='Register' />
                            </div>

                        </form>
                        <label className="label mx-auto">
                            <Link to="/login" className="label-text-alt font-bold  text-red-400 link link-hover text-customBlue">
                                Already have an account? <span className="underline">Please Login!</span>
                            </Link>
                        </label>

                        <SocialLogin></SocialLogin>
                    </div>
                    <ToastContainer></ToastContainer>
                </div>
            </div>

        </div>
    );
};

export default Register;  
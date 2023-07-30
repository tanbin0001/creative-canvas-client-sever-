import { useContext } from "react";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import DashboardSectionHeading from "../../../components/SectionHeading/DashboardSectionHeading";

const image_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddClasses = () => {



    const { user } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;





    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;


                    const { courseName, instructor, instructor_email, price, availableSeats, status, studentsEnrolled } = data;
                    const newItem = { courseName, price: parseFloat(price), availableSeats, instructor, image: imgURL, instructor_email, status, studentsEnrolled };
                    console.log(newItem);

                    fetch('https://creative-canvas-server.vercel.app/allClasses', {
                        method: 'POST',
                        headers: {
                            'content-Type': 'application/json'
                        },
                        body: JSON.stringify(newItem)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('after', data);
                            if (data.insertedId) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Class added',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        });
                }
            });
    };
















    return (
        <div>
            <DashboardSectionHeading heading='Add Classes'></DashboardSectionHeading>
            <div>
                <div className="hero min-h-screen w-[700px] bg-base-200">
                    <div className="hero-content flex-col  ">

                        <div className="card flex-shrink-0 w-full rounded-none shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Class Name</span>
                                    </label>
                                    <input type="text"{...register("courseName", { required: true, })} placeholder="class name" className="input input-bordered" />

                                </div>
                                <div className="flex ">
                                    <div className="form-control mr-3">
                                        <label className="label">
                                            <span className="label-text">Instructor name</span>
                                        </label>
                                        <input type="text" {...register("instructor", { required: true })} value={user?.displayName} readOnly className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Instructor email</span>
                                        </label>
                                        <input type="text"  {...register("instructor_email")} value={user?.email} readOnly className="input input-bordered" />
                                    </div>
                                </div>




                                <div className="flex ">
                                    <div className="form-control mr-3">
                                        <label className="label">
                                            <span className="label-text">Available Seats</span>
                                        </label>
                                        <input type="number" {...register("availableSeats", { required: true })} placeholder="seats" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price</span>
                                        </label>
                                        <input type="number" {...register("price", { required: true })} placeholder='price' className="input input-bordered" />
                                        <input type="text" {...register("status")} value='pending' className="input hidden  input-bordered" />
                                        <input type="text" {...register("studentsEnrolled")} value='0' className="input hidden  input-bordered" />
                                        {/* <input type="text" {...register("feedback")} value='N/A' className="input hidden  input-bordered" /> */}
                                    </div>

                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Please Upload an image</span>

                                    </label>
                                    <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />

                                </div>
                                <div className="form-control mt-6">

                                    <input className="btn bg-[#FF7777] text-white font-light" type="submit" value="Add Class" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddClasses;
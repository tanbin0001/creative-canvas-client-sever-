import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()
const SingleInstructor = ({ instructor }) => {
    const { instructorName, instructor_email, instructor_image } = instructor;
    return (
        <div
            data-aos="fade-up"
            data-aos-duration="3000"
        >
            <div className="card w-80 bg-base-100 shadow-2xl rounded-none   ">
                <figure><img className='h-60' src={instructor_image} alt="course image" /></figure>
                <div className="card-body">
                    <h2 className=" 
                    "> <span className="font-bold">Instructor:</span> {instructorName}</h2>
                    <p><span className="font-bold">Email:</span> {instructor_email}</p>

                    <div className="card-actions justify-end">
                        <button className="btn bg-[#FF7777] text-white font-light">See Details</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SingleInstructor;
import Banner from "../Banner/Banner";
import BecomeTutor from "../BecomeTutor/BecomeTutor";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";


const Home = () => {
    return (
        <div className="   ">
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <BecomeTutor></BecomeTutor>
        </div>
    );
};

export default Home;
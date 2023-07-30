import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import FixedContainer from "../components/FixedContainer/FixedContainer";
import Footer from "../shared/Footer";


const Main = () => {
    return (

        <div style={{
            backgroundImage:
                "url(https://i.ibb.co/F3L75Z2/o9nudw-1.png)",
        }}>


            <div >

                <FixedContainer>
                    <Navbar></Navbar>
                    <Outlet></Outlet>
                    <Footer></Footer>
                </FixedContainer>
            </div>
        </div>


    );
};

export default Main;
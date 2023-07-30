
import {
    createBrowserRouter,

} from "react-router-dom";
import "../index.css";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddClasses from "../pages/Dashboard/AddClasses/AddClasses";
import PrivateRoute from "./PrivateRoute";
import MyEnrolledClasses from "../pages/Dashboard/MyEnrolledClasses/MyEnrolledClasses";
import MySelectedClasses from "../pages/Dashboard/MySelectedClasses/MySelectedClasses";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import Payment from "../pages/Dashboard/Payment/Payment";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>

            },
            {
                path: '/allClasses',
                element: <Classes></Classes>
            }
        ]
    },
    {
        path: '/dashboard',

        element: <PrivateRoute> <Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [

            {
                path: 'addClasses',
                element: <AddClasses></AddClasses>
            },
            {
                path: 'myEnrolledClasses',
                element: <MyEnrolledClasses></MyEnrolledClasses>
            },
            {
                path: 'mySelectedClasses',
                element: <MySelectedClasses></MySelectedClasses>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'manageClasses',
                element: <ManageClasses></ManageClasses>
            },
            {
                path: 'myClasses',
                element: <MyClasses></MyClasses>
            },


            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>
            },


        ]
    }
    ,
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }
]);
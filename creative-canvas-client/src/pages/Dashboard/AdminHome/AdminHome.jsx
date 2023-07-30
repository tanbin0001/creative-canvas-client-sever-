import { useContext } from "react";
import DashboardSectionHeading from "../../../components/SectionHeading/DashboardSectionHeading";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaFunnelDollar } from "react-icons/fa";
import { SiVirustotal } from "react-icons/si";
import { MdFlightClass } from "react-icons/md";
import { FiUsers } from "react-icons/fi";










const AdminHome = () => {
    const { user } = useContext(AuthContext)
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await fetch('https://creative-canvas-server.vercel.app/admin-stats');
            const data = await res.json();
            return data;

        }
    })

    console.log(stats);
    return (
        <div className="w-full">
            <DashboardSectionHeading heading='Admin Home'></DashboardSectionHeading>
            <div>
                <h1 className="my-10 text-3xl font-bold text-center ">Hi, Welcome Back <span className="text-red-400">{user.displayName}</span> (Admin)</h1>
                <div className="flex justify-center ">
                    <div className="stats shadow  ">

                        <div className="stat ">
                            <div className="stat-figure text-red-400 text-xl">
                                <FiUsers></FiUsers>
                            </div>
                            <div className="stat-title text-red-400 font-bold">Total Users</div>
                            <div className="stat-value">{stats.users}</div>

                        </div>

                        <div className="stat">
                            <div className="stat-figure text-red-400 text-xl">
                                <MdFlightClass></MdFlightClass>
                            </div>
                            <div className="stat-title text-red-400 font-bold">Total Classes</div>
                            <div className="stat-value">{stats?.totalClasses}</div>

                        </div>
                        <div className="stat">
                            <div className="stat-figure  text-red-400 text-xl">
                                <SiVirustotal></SiVirustotal>
                            </div>
                            <div className="stat-title text-red-400 font-bold">Enrollments </div>
                            <div className="stat-value">{stats?.enrolledClasses}</div>

                        </div>

                        <div className="stat">
                            <div className="stat-figure text-red-400">

                                <FaFunnelDollar></FaFunnelDollar>
                            </div>
                            <div className="stat-title  text-red-400 font-bold">Revenue</div>
                            <div className="stat-value " >$ {stats?.revenue}</div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
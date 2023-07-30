import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useSelectedClass = () => {

    const { user, loading } = useContext(AuthContext);
    const token = localStorage.getItem('access-token')
    const [axiosSecure] = useAxiosSecure();


    const { refetch, data: selectedClasses = [] } = useQuery({
        queryKey: ['selectedClasses', user?.email],
        queryFn: async () => {
            const response = await fetch(`https://creative-canvas-server.vercel.app/selectedClasses?email=${user?.email}`, {
                headers: {
                    authorization: `bearar ${token}`
                }
            })
            return response.json();
        },


    })

    return [selectedClasses, refetch];
};

export default useSelectedClass;
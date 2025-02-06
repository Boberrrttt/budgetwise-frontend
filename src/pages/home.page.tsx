import GroupNamePopupHome from "@/components/home/groupname.popup.home";
import Nav from "@/components/navigation/nav";
import useBudgetStore from "@/store/useBudgetStore";
import useLoadingStore from "@/store/useLoadingStore";
import axiosInstance from "@/utils/axiosinstance";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface GroupTypes {
    id: number;
    name: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
  }
  

const HomePage = () => {
    const loading = useLoadingStore((state) => state.loading);
    const setLoading = useLoadingStore((state) => state.setLoading);
    
    const setGroup = useBudgetStore((state) => state.setGroup)
    const [groups, setGroups] = useState<GroupTypes[]>([]);
    const [popup, setPopup] = useState<boolean>(false);

    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true)
            const response = await axiosInstance.get('/api/getGroups');
            const groupData = response.data.groups;
            setGroups([...groupData, { id: -1, name: 'plus-button', userId: -1, createdAt: '', updatedAt: '' }]);
            setLoading(false);
        }
        fetchGroups()
    }, [])

    return (
        <div className="h-screen w-screen"> 
            <Nav/>
            <div className="grid grid-cols-3 gap-4 py-5 px-4">
                {loading ? (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">    
                        <CircularProgress/>
                    </div>
                ) : (
                    groups.map((group, idx) => (
                        <div key={idx} className="p-4 h-40 rounded-2xl border-2 flex items-center justify-center border-black dark:border-white ">
                            {group.name === 'plus-button' ? (
                                <button onClick={() => setPopup(true)} className="w-full h-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                                    </svg>
                                </button>
                            ) : (   
                                <Link href={'/group-plan'} onClick={() => setGroup(group.name, group.id)} passHref>
                                    <div className="text-3xl font-bold cursor-pointer">
                                        {group.name}
                                    </div>
                                </Link>
                            )}
                        </div>
                    )) 
                )}
                { popup && <GroupNamePopupHome setPopup={setPopup} groups={groups} setGroups={setGroups} /> }
            </div>
        </div>
    );
};

export default HomePage;
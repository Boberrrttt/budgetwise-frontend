import GroupNamePopupHome from "@/components/home/groupname.popup.home";
import Nav from "@/components/navigation/nav";
import axiosInstance from "@/utils/axiosinstance";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HomePage = () => {
    const [groups, setGroups] = useState<string[]>(['']);
    const [popup, setPopup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axiosInstance.get('/api/getGroups');
                const groupNames = response.data.groups.map((group: any) => group.name);
                setGroups([...groupNames, 'plus-button']);
                setLoading(false)
            } catch (error) {
                console.error('Failed to retrieve groups', error);
            }
        }
        fetchGroups()
    }, [])

    return (
        <div className="h-screen w-screen"> 
            <Nav groupname=""/>
            <div className="grid grid-cols-3 gap-4 py-5 px-4">
                {loading ? (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">    
                        <CircularProgress/>
                    </div>
                ) : (
                    groups.map((name, idx) => (
                        <div key={idx} className="p-4 h-40 rounded-2xl border-2 flex items-center justify-center border-black dark:border-white ">
                            {name === 'plus-button' ? (
                                <button onClick={() => setPopup(true)} className="w-full h-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                                    </svg>
                                </button>
                            ) : (   
                                <Link href={{ pathname: '/group-plan', query: { groupName: name } }} passHref>
                                    <div className="text-3xl font-bold cursor-pointer">
                                        {name}
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
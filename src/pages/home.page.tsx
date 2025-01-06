import GroupNamePopupHome from "@/components/home/groupname.popup.home";
import Nav from "@/components/navigation/nav";
import axiosInstance from "@/utils/axiosinstance";
import React, { useState } from "react";

const HomePage = () => {
    const [index, setIndex] = useState<number[]>([1]);
    const [popup, setPopup] = useState<boolean>(false);

    // const addItem = async () => {
    //     const response = await axiosInstance.post('http://localhost:8000/api/createGroup', {}, {

    //     })
        
    //     setIndex([...index, index.length + 1]);
    // };



    return (
        <div className="h-screen w-screen"> 
            <Nav/>
            <div className="grid grid-cols-3 gap-4 py-5 px-4">
                {index.map((i, idx) => (
                    <div key={i} className="p-4 h-40 rounded-2xl border-2 border-black dark:border-white ">
                        {idx === index.length - 1 ? (
                            <button onClick={() => setPopup(true)} className="w-full h-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                                </svg>
                            </button>
                        ) : (
                            `Item ${i}`
                        )}
                    </div>
                ))}

                { popup && <GroupNamePopupHome setPopup={setPopup} /> }

                

            </div>
        </div>
    );
};

export default HomePage;
import axiosInstance from "@/utils/axiosinstance";
import { useState } from "react";

interface GroupNamePopupHomeProps {
    setPopup: (popup: boolean) => void,
    groups: string[],
    setGroups: React.Dispatch<React.SetStateAction<string[]>>
}

const GroupNamePopupHome = ({ setPopup, groups, setGroups }: GroupNamePopupHomeProps) => {
    const [name, setName] = useState<string>('');
    
    const addItem = async (e: React.FormEvent) => {
        e.preventDefault();
        await axiosInstance.post('http://localhost:8000/api/createGroup', {
            name: name
        })
        setGroups([...groups, name]);
        setPopup(false)
    };

    return (
        <div onClick={() => setPopup(false)} className="bg-black bg-opacity-40 w-screen h-screen fixed top-0 left-0 z-10 flex items-center justify-center">
            <form onClick={(e) => e.stopPropagation()} onSubmit={e => addItem(e)} className="bg-white flex items-center py-6 px-7 gap-4 justify-center flex-col rounded-2xl">
                <h1 className="text-black font-bold text-2xl">Input group name</h1>
                <div className="border border-black flex rounded-xl">
                    <input type="text" onChange={e => setName(e.target.value)} value={name} className="bg-white text-black px-3 rounded-l-xl focus:outline-none" />
                    <button className="bg-brandPrimary rounded-r-xl text-white font-bold py-2 px-3" type="submit">
                        Enter
                    </button>
                </div>
            </form>
        </div>
    )
}

export default GroupNamePopupHome
import axiosInstance from "@/utils/axiosinstance";
import { useState } from "react";

interface GroupTypes {
  id: number;
  name: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface GroupNamePopupHomeProps {
  setPopup: (popup: boolean) => void;
  groups: GroupTypes[];
  setGroups: React.Dispatch<React.SetStateAction<GroupTypes[]>>;
}

const GroupNamePopupHome = ({ setPopup, groups, setGroups }: GroupNamePopupHomeProps) => {
  const [name, setName] = useState<string>('');

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('http://localhost:8000/api/createGroup', {
        name: name
      });
      const newGroup: GroupTypes = response.data.group;
      setGroups([...groups, newGroup]);
      setPopup(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to create group', error);
    }
  };

  return (
    <div onClick={() => setPopup(false)} className="bg-black bg-opacity-40 w-screen h-screen fixed top-0 left-0 z-10 flex items-center justify-center">
      <form onClick={(e) => e.stopPropagation()} onSubmit={e => addItem(e)} className="bg-white dark:bg-neutral-900 flex items-center py-6 px-7 gap-4 justify-center flex-col rounded-2xl">
        <h1 className="text-black font-bold text-2xl">Input group name</h1>
        <div className="border border-black flex rounded-xl">
          <input type="text" onChange={e => setName(e.target.value)} value={name} className="bg-white text-black px-3 rounded-l-xl focus:outline-none" />
          <button className="bg-brandPrimary rounded-r-xl text-white font-bold py-2 px-3" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroupNamePopupHome;
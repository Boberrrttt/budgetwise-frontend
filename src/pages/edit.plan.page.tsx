import AddItemPopup from "@/components/edit-plan/addItemPopup";
import GroupChat from "@/components/group-plan/groupchat";
import Nav from "@/components/navigation/nav";
import axiosInstance from "@/utils/axiosinstance";
import { useLoading } from "@/utils/useLoading";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ItemsType {
  name: string,
  price: number
}

const EditPlanPage = () => {
  const { loading, setLoading } = useLoading();
  const searchParams = useSearchParams();
  const { groupName, plan } = Object.fromEntries(searchParams!);
  const budgetPlan = JSON.parse(plan);
  
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [items, setItems] = useState<ItemsType[]>([])
  
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const fetchedItems = await axiosInstance.get(`/api/budgetPlan/getItems?planId=${budgetPlan.id}`)
      setItems([ ...fetchedItems.data.items, { name: 'plus-button' }]);
      
      setLoading(false)
    }
    fetchItems();
  }, [])  
  
  return (
    <div className="flex flex-col h-[100vh]">
      <Nav groupname={groupName}/>

      <div className="flex w-full overflow-hidden h-full">

        <div className="flex flex-col flex-grow items-center py-10 overflow-y-auto">
            <h1 className=" text-4xl font-bold mb-6">{budgetPlan.name}</h1>
            <h1 className=" text-2xl">P {budgetPlan.spentAmount} / P {budgetPlan.allocatedAmount}</h1>

            <div className="flex w-full items-center flex-col mt-20">
              <div className="flex w-full flex-col justify-center items-center gap-20">
                {loading ? (
                    <CircularProgress/>
                  ): (
                    items.map( (item, index) => (
                      <div className="w-full flex flex-col items-center" key={index}>
                        {item.name !== 'plus-button'
                          ? (
                            <div className="flex gap-96 w-[60%] justify-between ">
                              <h1 className="text-2xl font-bold">{item.name}</h1>
                              <div className="flex w-40">
                                  <svg className=" mr-3 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m18 9l-.84 8.398c-.127 1.273-.19 1.909-.48 2.39a2.5 2.5 0 0 1-1.075.973C15.098 21 14.46 21 13.18 21h-2.36c-1.279 0-1.918 0-2.425-.24a2.5 2.5 0 0 1-1.076-.973c-.288-.48-.352-1.116-.48-2.389L6 9m7.5 6.5v-5m-3 5v-5m-6-4h4.615m0 0l.386-2.672c.112-.486.516-.828.98-.828h3.038c.464 0 .867.342.98.828l.386 2.672m-5.77 0h5.77m0 0H19.5" />
                                  </svg>
                                  <h1 className="text-xl">P {item.price}</h1>
                              </div>
                            </div>
                          ) : (
                            <>
                              <svg onClick={() => setIsPopup(true)} className="hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                <path fill="currentColor" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z" />
                              </svg>
                            </>
                          )
                        }        
                      </div>
                    ))
                  )
                }
                <div className="w-[60%] bg-brandPrimary h-1 rounded-full "></div>  
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <GroupChat />
          </div>

          
          {isPopup && <AddItemPopup planId={budgetPlan.id} setIsPopup={setIsPopup} />}
      </div>
    </div>
  );
};

export default EditPlanPage;
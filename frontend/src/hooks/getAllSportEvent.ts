import axiosInstance from "@/api/interceptor";
import { getDataFromLocalStorage } from "@/utils/localStorageAuth";
import { useEffect, useState } from "react"


export const useSportEvent = () =>{
    const [dataSportEvent, setData] = useState()
    const fetching = async () =>{
        try {

        const localStorageAuth = await getDataFromLocalStorage();  

        const responseData = await axiosInstance.get("/api/SportEvent",{
            headers:{
                Authorization: localStorageAuth.token
            }
        });  
        
        if(responseData.status === 200){
            setData(responseData?.data)
        }else{
            throw new Error(responseData.data);
        }
        } catch (error) {
            console.log('error', error)
        }

    }
    useEffect(() => {
        fetching()
    }, [])

    return [dataSportEvent]
}
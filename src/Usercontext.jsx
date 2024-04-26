import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Usercontext = createContext({})




function UsercontextProvider({ children }) {

    const token=sessionStorage.getItem("token")

  
    
    const [user, setuser] = useState(null)
    const [ready,setready]=useState(false)
   

    useEffect(() => {
        const getdata = async () => {
            try {
                if (!user) {
                    let res = await axios.get(`/user/profile/${token}`)
                    setuser(res.data)
                    setready(true)
                }
            } catch (error) {
                if (error?.response?.status == 400)
                    toast.error(error.response.data.message)
            }
        }
        getdata()
    },[])


    return <Usercontext.Provider value={{user,setuser,ready}}>
        {children}
    </Usercontext.Provider>
}

export default UsercontextProvider

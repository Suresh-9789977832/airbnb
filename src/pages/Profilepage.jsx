import React, { useContext, useState } from 'react'
import { Usercontext } from '../Usercontext'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Placespage from './Placespage'

import Accountnav from './Accountnav';



function Profilepage() {
    const { ready,user,setuser } = useContext(Usercontext)
    // const navigate = useNavigate()    

    // if (ready && !user) {
    //     return <Navigate to={'/'}/>
    // }


    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage="profile"
    }
        
    

    const handlelogout = async() => {
        sessionStorage.removeItem("token")
        setuser(null)
        navigate('/')
    }


    return <>
        <div>
           <Accountnav/>
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto mb-8">
                    Logged in as {user?.name} ({user?.email})<br />
                    <button className='primary max-w-sm mt-2' onClick={handlelogout}>Logout</button>
                </div>)}
            
            {subpage === "places" && (
                <><Placespage/></>
            )}
        </div>
        

    </>
}

export default Profilepage

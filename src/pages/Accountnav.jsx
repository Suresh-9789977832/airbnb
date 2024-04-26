import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { BsBuildings } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

function Accountnav() {
    const { pathname } = useLocation()
    let subpage = pathname.split('/')?.[2]
    if (subpage === undefined) {
            subpage='profile'
        }
    function linkclasses(type) {

        let classes = 'py-2 px-6 inline-flex items-center gap-2 rounded-full';
        if (type === subpage) {
            classes += ' bg-primary text-white'
        } 
        else{
            classes += " bg-gray-200"
        }
        return classes
    }

    return <>
         <nav className='w-full flex  gap-2 mt-8 justify-center'>
            <Link  className={linkclasses("profile")} to={'/account'}><FaRegUser />My profile</Link>
            <Link  className={linkclasses("bookings")} to={'/account/bookings'}><FaList/>My bookings</Link>
            <Link  className={linkclasses("places")}  to={'/account/places'}><BsBuildings/>My accomodations</Link>
            </nav>
    </>
}

export default Accountnav

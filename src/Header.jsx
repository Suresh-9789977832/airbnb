import React, { useContext } from 'react'
import { FaAirbnb } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Usercontext } from './Usercontext';


function Header() {
  const { user } = useContext(Usercontext)
    return <>
     <header className="flex justify-between">
          <Link to={'/'} className="flex items-center gap-1">
            <FaAirbnb size={25} />
            <span className="font-bold text-2xl sm:max-sm:text-red-600">airbnb</span>
          </Link>
          <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 sm:gap-1 ">
            <div>Anywhere</div>
            <div className="border-l border-gray-300"></div>
            <div>Any week</div>
            <div className="border-l border-gray-300"></div>
            <div>Add guests</div>
            <button className="bg-primary text-white p-1 rounded-full ">
              <CiSearch/>
            </button>
          </div>
          <Link to={user?"/account":'/login'} className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 items-center">
            <RxHamburgerMenu />
            <button className="bg-gray-500 rounded-full p-1 text-white">
            <FaUser/>
          </button>
          {
            user && (<div>{user.name}</div>)
          }
          </Link>
        </header>
    </>
}

export default Header

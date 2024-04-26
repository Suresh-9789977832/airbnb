import React from 'react'
import { FaWifi } from "react-icons/fa6";
import { PiVan } from "react-icons/pi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { FaToriiGate } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";

function Perks({ perks, setperks }) {
    
    function handlecheckbox(e) {
        const { checked,name} = e.target
        if (checked) {
            setperks([...perks,name])
        } else {
            setperks(perks.filter(e=>e!==name))
        }
        console.log(perks)
    }
    return <>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
                            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' name='wifi' checked={perks.includes("wifi")} onChange={handlecheckbox}/>
                                <FaWifi/>
                                <span>Wifi</span>
                            </label>

                            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                                <input type='checkbox' name='parking' checked={perks.includes("parking")} onChange={handlecheckbox}/>
                                <PiVan/>
                                <span>Free parking spot</span>
                            </label>
                            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                                <input type='checkbox' name='tv' checked={perks.includes("tv")} onChange={handlecheckbox}/>
                                <PiTelevisionSimpleBold/>
                                <span>TV</span>
                            </label>
                            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                                <input type='checkbox' name='radio' checked={perks.includes("radio")} onChange={handlecheckbox}/>
                                <FaRadio/>
                                <span>Radio</span>
                            </label>
                            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                                <input type='checkbox' name='pets' checked={perks.includes("pets")} onChange={handlecheckbox}/>
                                <FaCat/>
                                <span>Pets</span>
                            </label>
                            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                                <input type='checkbox' name='entrance' checked={perks.includes("entrance")} onChange={handlecheckbox}/>
                                <FaToriiGate/>
                                <span>Entrance</span>
                            </label>

                        </div>
    </>
}

export default Perks

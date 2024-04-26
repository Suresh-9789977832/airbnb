import { Link, Navigate, useParams } from 'react-router-dom'
import { CgMathPlus } from "react-icons/cg";
import Accountnav from './Accountnav';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Placespage() {
    const [places, setplaces] = useState("")
    const token=sessionStorage.getItem("token")
    useEffect(() => {
        const getalldata = async() => {
            axios.get(`/post/user_places/${token}`).then(({ data }) => {
                setplaces(data)
            })
        }
        getalldata()
    },[])

    console.log(places)

    return <>
        <Accountnav/>
         
        <div className="text-center my-10">
            <br/> <br/>

            <Link className='bg-primary py-2 px-4 rounded-full text-white' to={'/account/places/new'}>{<CgMathPlus className="inline-flex" />}  Account new post </Link>
            <div className='mt-4'>
                {places.length > 0 && places.map((e,i) => {
                    return <Link to={'/account/places/'+e._id} className=" cursor-pointer bg-gray-200 p-4 rounded-2xl flex gap-4" key={i}>
                        <div className='flex w-32 h-32 bg-gray-300 grow shrink-0 rounded-lg' >
                            {e.addedphotos?.length > 0 && (
                                <img className='object-cover aspect-square rounded-lg' src={"http://localhost:3000/"+e?.addedphotos?.[0]} alt='' />
                            )}
                        </div>
                        <div className='grow-0'>
                        <h2 className='text-xl'>{e.title}</h2>
                            <p className='text-sm mt-2'>{e.description}</p>
                    </div>
                    </Link>
                })}
            </div>
            </div>
           
     
    </>
       
      
  
}

export default Placespage

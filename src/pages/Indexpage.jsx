import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Indexpage() {

    const [places,setplaces]=useState([])

    useEffect(() => {
        axios.get('/post/getallplaces').then(res => {
        setplaces([...res.data])
    })
    }, [])
    
console.log(places)
    
    return <>
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> 
        {
            places.length > 0 && places.map((place) => (
                <Link to={'/place/'+place._id}>
                    <div className="bg-gray-500 mb-2  rounded-2xl flex">
            {place.addedphotos?.[0] &&
            <img className="object-cover aspect-square rounded-2xl" src={"http://localhost:3000/" + place?.addedphotos?.[0]} />}
                    </div>
            
                    <h2 className='text-sm truncate '>{place.title}</h2>
                    <h3 className='font-semibold text-gray-500'>{place.address}</h3>
                    <div className=''>
                      <span className='font-bold'> ${place.price}</span> <span>per night</span>  
                        </div>
                </Link>
            ))
        }
        </div>
        
       
    </>
}

export default Indexpage

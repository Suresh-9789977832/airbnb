import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaRegImages } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";


function Placepage() {
    let { id } = useParams()
    const [place, setplace] = useState(null)
    const [showallphotos, setShowallphotos] = useState(false)
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`post/getplacebyid/${id}`).then(res => {
            setplace(res.data)
        })
    }, [id])


    if (!place) return "";

    if (showallphotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className='p-8 grid gap-4 bg-black'>
                    <div className='fixed right-12 top-10'>
                        <button onClick={()=>setShowallphotos(false)} className='inline-flex  items-center px-2 py-1 rounded-lg text-black bg-gray-100 shadow shadow-black'><IoMdClose/>&nbsp;Close photos</button>
                    </div>
                {place?.addedphotos?.length > 0 && place.addedphotos.map(e => (
                    <div>
                        <img src={'http://:3000/'+e} />
                    </div>
                ))}
                </div>
               
            </div>
        )
    }
    
  return (
      <div className='mt-4 bg-gray-100 -mx-8 px-4 p-8'>
          <h1 className="text-2xl ">{place.title}</h1>
          <a className='font-semibold gap-1 my-2 underline flex items-center' target='_blank' href={'https://maps.google.com/?q=' + place.address}><FaMapMarkerAlt/>{place.address}</a>
          <div className="relative">
          <div className='grid gap-2 grid-cols-[2fr_1fr] mt-2 rounded-3xl overflow-hidden'>
              <div>
                  {
                      place.addedphotos?.[0] && (
                    <img onClick={()=>setShowallphotos(true)} src={'https://airbnb-w64o.onrender.com/'+place.addedphotos?.[0]} className="object-cover aspect-square cursor-pointer"/>
                      )
                  }
              </div>
              <div className='grid'>
              {
                      place.addedphotos?.[0] && (
                          <img onClick={()=>setShowallphotos(true)} src={'https://airbnb-w64o.onrender.com/'+place.addedphotos?.[1]} className="object-cover aspect-square cursor-pointer"/>
                      )
                  }
                  <div className="overflow-hidden">
                  {
                      place.addedphotos?.[0] && (
                          <img onClick={()=>setShowallphotos(true)} src={'https://airbnb-w64o.onrender.com/'+place.addedphotos?.[2]} className="object-cover aspect-square relative top-2 cursor-pointer"/>
                      )
                  }
                  </div> 
              </div>
              </div>
              <button onClick={()=>setShowallphotos(true)} className='flex items-center absolute bottom-3 right-3 py-2 px-2 bg-white rounded-xl shadow-lg shadow-black font-semibold border border-black'><FaRegImages/>&nbsp;&nbsp;Show all photos</button>
          </div>
        
          <div className='grid mt-6 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
              <div>
              <div className='my-4'>
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
          </div>
                  Check-in:{place.checkin}<br />
                  Check-out:{place.checkout}<br />
                   Max number of guests:{place.maxguests}
              </div>
              <div>
                  <div className='bg-white  rounded-2xl shadow p-4 my-4'>
                      <div className='text-xl text-center'> 
                      Price:${place.price}/per night
                      </div>
                      <div className='border rounded-2xl mt-4'>
                          <div className='flex  border-b'>
                          <div className=' px-4 py-4'>
                          <label>Check in:</label>
                          <input type="date" />
                      </div>
                      <div className=' px-4 py-4  border-l'>
                          <label>Check out:</label>
                          <input type='date'/>
                      </div>  
                          </div>
                          <div>
                          <div className=' px-4 py-4   border-l'>
                          <label>Number of guests:</label>
                          <input type='number' value={1}/>
                      </div> 
                          </div>
                      
                      </div>
                      <button className='primary'>Book this place</button>

                  </div>
              </div>
          </div>
        
      </div>
      
  )
}

export default Placepage

import React, { useEffect, useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import Perks from '../Perks';
import axios from 'axios';
import Accountnav from './Accountnav';
import { FaRegTrashAlt } from "react-icons/fa";
import { Navigate, useParams } from 'react-router-dom';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";



function Placesformpage() {
    const {id}=useParams()
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [addedphotos, setAddedphotos] = useState([])
    const [photolink, setPhotolink] = useState("")
    const [description, setDescription] = useState("")
    const [perks, setperks] = useState([])
    const [extrainfo, setExtrainfo] = useState("")
    const [checkin, setCheckin] = useState("")
    const [checkout, setCheckout] = useState("")
    const [maxguests, setMaxguests] = useState(1)
    const [redirect, setredirect] = useState(false)
    const [price,setprice]=useState(100)
    
    useEffect(() => {
        if (!id) {
            return;
        }
        else {
            axios.get('/post/getplacebyid/' + id)
                .then(res => {
                    const { data } = res;
                    setTitle(data.title)
                    setDescription(data.description)
                    setperks(data.perks)
                    setMaxguests(data.maxguests)
                    setAddedphotos(data.addedphotos)
                    setCheckin(data.checkin)
                    setCheckout(data.checkout)
                    setExtrainfo(data.extrainfo)
                    setAddress(data.address)
                    setprice(data.price)
            })
        }
    },[])

    function imageupload (e) {
        const files = e.target.files
        const data = new FormData();
        for (let i = 0; i < files.length; i++){
            data.append("photos", files[i])
        }
        axios.post('user/upload', data, {
            headers:{"Content-Type":"multipart/form-data"}
        }).then(response => {
            const { data } = response
            setAddedphotos([...addedphotos, ...data])
        })
        setAddedphotos('')
    }

    function preInput(header, description) {
        return (
            <>
                {inputheader(header)}
                {inputpara(description)}
            </>
         )
    }

    function inputheader(text){
        return (
            <h2 className="text-lg mt-6 font-semibold">{text}</h2>
            )
    }

    function inputpara(text) {
        return (
            <p className="text-sm text-gray-500">{text}</p>
        )
    }

    function removephoto(ev, link) {
        ev.preventDefault()
       setAddedphotos(addedphotos.filter((e)=>e!=link))
    }

    function selectedmainphoto(ev, photo) {
        ev.preventDefault()
        setAddedphotos([photo, ...addedphotos.filter((e) => e !== photo)])
    }   


    const saveplaces=async(e)=> {
        e.preventDefault()
        let token=sessionStorage.getItem("token")
        try {
            const placedata = {
                title, address, addedphotos,
                description, extrainfo,perks,
                checkin, checkout, maxguests,price
            }
            if (id) {
                await axios.put(`/post/editplaces/${token}`, {
                    id, ...placedata
                })
                setredirect(true)
            } else {
              
                let finaldata = await axios.post(`/post/places/${token}`, placedata)
                console.log(finaldata)
                setredirect(true)
            }
          
        } catch (error) {
            console.log(error)
        }
       
    }

    if (redirect) {
        return <Navigate to={'/account/places'}/>
    }

    console.log(addedphotos)
    return <>
            <Accountnav/>
              <form onSubmit={saveplaces}>
                        {preInput("Title","Title for your place. should be short and cachy as in advertisement")}
                        <input value={title} type='text' placeholder='title, for expalmple:My lovely apt'
                            onChange={(e) => setTitle(e.target.value)} />
                        
                        {preInput("Address","Adress to this place")}
                        <input type='text' value={address} placeholder='address'
                            onChange={(e) => setAddress(e.target.value)} />
                        
                        {preInput("Photos","more = better")}
                        <div className='flex gap-2'>
                            <input type='text' value={photolink} placeholder={"Add using a link ...jpg"}
                                onChange={(e) => setPhotolink(e.target.value)} />
                            <button className='bg-gray-300 px-4 rounded-2xl font-semibold'>Add&nbsp;photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedphotos.length > 0 && addedphotos.map((e,i) => {
                                return <div className="relative border h-32 flex p-2 rounded-lg justify-center" key={i}>
                                    <img src={'http://localhost:3000/' + e} className='w-full object-cover rounded-lg' />
                                    <button onClick={(ev)=>removephoto(ev,e)} className='absolute bottom-3 right-3 text-white bg-black py-2 px-3 bg-opacity-50 rounded-xl cursor-pointer'>
                                    <FaRegTrashAlt/>
                                    </button>

                                    <button onClick={(ev) => selectedmainphoto(ev,e)} className='absolute bottom-3 left-3 text-white bg-black py-1 px-2 bg-opacity-50 rounded-xl cursor-pointer'>
                                        {e === addedphotos[0] && (<FaStar fontSize={25} />)}
                                        {e!==addedphotos[0] &&  (<CiStar fontSize={25} />)}
                                   
                                    </button>
                                </div>
                            })}
                            <label className='flex justify-center gap-2 border p-8 rounded-2xl bg-transparent text-2xl text-gray-600 cursor-pointer'>
                            <input type='file' className='hidden' multiple onChange={imageupload}/>
                                <IoCloudUploadOutline />Upload</label>
                        </div>
                        {preInput("Description","description of the place")}
                        <textarea value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                        
                        {preInput("Perks","Select all the perks of your place")}
                        <Perks perks={perks} setperks={setperks} />

                        {preInput("Extra info","house rules,etc")}
                        <textarea value={extrainfo} onChange={(e) =>setExtrainfo(e.target.value) } />
                        
                        {preInput("Check in&out times","add check in and out times, remember to have some time window for cleaning the room between guests")}
                        <div>
                            <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
                            <div>
                                <h3 className='mt-2 -mb-2 '>Check in time</h3>
                            <input type='text' placeholder='14:00' value={checkin} onChange={(e)=>setCheckin(e.target.value)}/>
                            </div>
                            <div>
                            <h3>Check out time</h3>
                            <input type='text' value={checkout} onChange={(e)=>setCheckout(e.target.value)} placeholder='15'/>
                            </div>
                    <div>
                            <h3>Max number of guests</h3>
                            <input type='number' value={maxguests} onChange={(e)=>setMaxguests(e.target.value)} />
                    </div>
                    
                    <div>
                            <h3>Price per night</h3>
                            <input type='number' value={price} onChange={(e)=>setprice(e.target.value)} />
                    </div>
                            </div>
                            <div>
                                <button className='primary my-4'>Save</button>
                            </div>
                           
                        </div>
                    </form>
    </>
}

export default Placesformpage

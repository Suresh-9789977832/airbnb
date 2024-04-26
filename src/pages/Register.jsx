import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Loader'


function Register() {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loader,setloader]=useState(true)
    const navigate=useNavigate()

    const handleregister =  async(e) => {
        e.preventDefault()
        try {
            setloader(false)
           let res= await axios.post('/user/register', {
                name,
                email,
                password
           })

            if (res.status === 201) {
                setloader(true)
                toast.success("created")
                navigate('/login')

            }
            
        } catch (error) {
            if (error.response.status == 400) {
                setloader(true)
                toast.error(error.response.data.message)
            }
            console.log(error)
        }
    }

    return <>
            <div className='m-4 grow flex items-center justify-around'>
            <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto my-2">
                <input type="text" placeholder='Enter your name' onChange={(e)=>setname(e.target.value)} value={name}/>
                <input type="email" placeholder='Enter your email' onChange={(e)=>setemail(e.target.value)} value={email}/>
                <input type="password" placeholder='Enter your password' onChange={(e)=>setpassword(e.target.value)} value={password}/>
                    <button className="primary" onClick={handleregister}>{loader?"Register":<Loader/>}</button>
                    <div className="text-center py-2 text-gray-500">
                       Already a member<Link to={'/login'} className="underline text-black">Login</Link></div>
            </form>
            </div>
           
        </div>
    </>
}

export default Register

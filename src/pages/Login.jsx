import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Loader'
import toast from 'react-hot-toast'
import { Usercontext } from '../Usercontext'

function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loader,setloader]=useState(true)
    const navigate=useNavigate()
    const {setuser}=useContext(Usercontext)

    const handlelogin = async (e) => {
        e.preventDefault()
        try {
            setloader(false)
            let data = await axios.post('/user/login', { email, password })
            if (data.status == 200)
                setloader(true)
                setuser(data.data.restdata)
            sessionStorage.setItem("token",data.data.token)
            toast.success(data.data.message)
            
            navigate('/')
            // console.log(data)
        } catch (error) {
            if (error.response?.status == 400) {
                setloader(true)
                toast.error(error.response.data.message)
            }
        }
    }
    
    return <>
        <div className='m-4 grow flex items-center justify-around'>
            <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto my-2">
                <input type="email" placeholder='Enter your email' onChange={(e)=>setemail(e.target.value)}/>
                <input type="password" placeholder='Enter your password' onChange={(e)=>setpassword(e.target.value)}/>
                    <button className="primary" onClick={handlelogin}>{loader?"Login":<Loader/>}</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link to={'/register'} className="underline text-black">Register</Link></div>
            </form>
            </div>
           
        </div>
    </>
}

export default Login

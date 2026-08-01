import './style.css'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link,useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'


const Login = () =>{

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    async function login(e){
        e.preventDefault()
        if(!email.trim() || !password.trim())
        {
            toast.error("Enter details!")
            return 
        }
        setLoading(true)
        const res = await axios.post('https://taskmanager-backend-5j73.onrender.com/users/login',{
            email,password
        })
        setLoading(false)
        if(res.data.status)
        {
            setEmail('')
            setPassword('')
            localStorage.setItem('token',res.data.token)
            toast.success(res.data.message)
            navigate('/data')
        }
        else{
            toast.error(res.data.message)
        }
    }
    

    return (
        <div className='login-container'>
            <form onSubmit={(e)=>login(e)}>
                <h2>Sign in</h2>
                 <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
               
                <button type='submit' disabled={loading}>{loading?<Loader />:"Sign in"}</button>
                <p>No acc? <Link to='/register'>Sign up</Link> </p>
        
            </form>
        </div>
    )
}

export default Login
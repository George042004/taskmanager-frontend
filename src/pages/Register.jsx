import { useState } from 'react'
import './style.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Register = () =>{

    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [confirm,setConfirm] = useState('')
    const [loading,setLoading] = useState(false)

    async function register(e){
        e.preventDefault()
        if(!name.trim() || !email.trim() || !password.trim() || !confirm.trim())
        {
            toast.error("Enter details")
            return
        }
        if(password.trim()!==confirm.trim()){
            toast.error('password must be same')
            return
        }

        setLoading(true)
        const res = await axios.post('https://taskmanager-backend-5j73.onrender.com/users/register',{
            name,email,password
        })
        setLoading(false)
        if(res.data.status)
        {
            toast.success(res.data.message)
            setName('')
            setEmail('')
            setPassword('')
            setConfirm('')
        }
        else{
            toast.error(res.data.message)
        }

    }

    return (
        <div className='login-container'>
            <form onSubmit={(e)=>register(e)}>
                <h2>Sign up</h2>

                <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} />
                <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <input type="password" placeholder="confirm" value={confirm} onChange={(e)=>setConfirm(e.target.value)}/>
                <button type='submit'>Sign up</button>
                <p>Already have acc? <Link to='/' >Sign in</Link> </p>
            </form>
        </div>
    )
}

export default Register
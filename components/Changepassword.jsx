import { useState } from 'react'
import './style.css'
import axios from 'axios'
import Loader from './Loader'
import toast from 'react-hot-toast'

const Changepassword =()=>{

    const [oldpass,setOldpass] = useState('')
    const [newpass,setNewpass] = useState('')
    const [confirmpass,setConfirmpass] = useState('')
    const [loading,setLoading] = useState(false)

    async function changpass(e){
        e.preventDefault()

        if(!oldpass.trim() || !newpass.trim() || !confirmpass.trim())
        {
            toast.error("Enter password!")
            return 
        }
        if(newpass.trim()!==confirmpass.trim())
        {
            toast.error("new password must be same")
            return
        }

        const token = localStorage.getItem('token')
        setLoading(true)

        const res = await axios.put('https://taskmanager-backend-5j73.onrender.com/users/updatepass',{
            oldpass,newpass
        },
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        setLoading(false)
        if(res.data.status)
        {
            toast.success(res.data.message)
        }
        else{
            toast.error(res.data.message)
        }


    }

    return(
        <>
            <form className='changepass' onSubmit={(e)=>changpass(e)}>
                <h3>change password</h3>
                <input type="password" placeholder='old password' value={oldpass} onChange={(e)=>setOldpass(e.target.value)} />
                <input type="password" placeholder='new password' value={newpass} onChange={(e)=>setNewpass(e.target.value)} />
                <input type="password" placeholder='confirm password' value={confirmpass} onChange={(e)=>setConfirmpass(e.target.value)} />
                <button type='submit' disabled={loading}>{loading?<Loader />:"change password"}</button>
            </form>
        </>
    )

}


export default Changepassword
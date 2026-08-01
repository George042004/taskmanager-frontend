import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import toast from "react-hot-toast"
import './style.css'
import { useNavigate } from "react-router-dom"
import Changepassword from "../../components/Changepassword"

const Data = ()=>{

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [option,setOption] = useState('add')
    const [tasks,setTasks] = useState([])
    const [task,setTask] = useState('')
    const navigate = useNavigate()

    async function getdata(){

        const token = localStorage.getItem('token')
        setLoading(true)
        const res = await axios.get('https://taskmanager-backend-5j73.onrender.com/users/getdata',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setLoading(false)

        if(res.data.status)
        {
            setData(res.data.message)
        }
        else{
            toast.error(res.data.message)
        }

    }

    async function addtask(e) {

        e.preventDefault()
        if(!task.trim())
        {
            toast.error('Fill the field!')
            return
        }
        const token = localStorage.getItem('token')
        const res = await axios.post('https://taskmanager-backend-5j73.onrender.com/tasks/add',{task},{
            headers:{
                Authorization:`Bearer ${token}`
            }})

        if(res.data.status)
        {
            setTask('')
            toast.success(res.data.message)
        }
        else{
            toast.error(res.data.message)
        }
    }

    async function gettasks(){
        const token = localStorage.getItem('token')
        const res = await axios.get('https://taskmanager-backend-5j73.onrender.com/tasks/gettasks',{
            
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        if(res.data.status)
        {
            setTasks(res.data.message[0])
        }

    }

    async function deltask(e,_id){
        e.preventDefault()
        const okk = confirm('Delete task?')
        if(!okk)
        {
            return
        }

        const res = await axios.delete(`https://taskmanager-backend-5j73.onrender.com/tasks/deltask/${_id}`)
        if(res.data.status)
        {
            toast.success(res.data.message)
            gettasks()
        }
        else{
            toast.error(res.data.message)
        }
    }

    async function changetaskstatus(e,task,taskstatus) {
        e.preventDefault()
        const res = await axios.put(`https://taskmanager-backend-5j73.onrender.com/tasks/taskstatus/${task}`,{
         taskstatus
        })
        
        if(res.data.status)
        {
            console.log(res.data.status)
            gettasks()
        }

    }


    function logout(){
        localStorage.removeItem('token')
        toast.success("logout")
        navigate('/')
    }

    useEffect(()=>{
        getdata()
        
    },[])

    useEffect(()=>{
        gettasks()
    },[option])
    return(
        <>
        <div className="options">
            <button onClick={()=>setOption('add')}>Add tasks</button>
            <button onClick={()=>setOption('view')}>View tasks</button>
            <button onClick={()=>setOption('changepassword')}>Change password</button>
        </div>
            {
            data.map((details)=>{
                return(
                    <>
                        <div key={details._id} className="data-container" >
                            <div key={details._id}>
                                <h3>{details.name}</h3>
                                <p>{details.email}</p>
                            </div>
                            <div>
                                <button onClick={logout} className="logout">Logout</button>
                            </div>
                        </div>


                    </>
                )

            })}

           { 
            option === 'add' &&
            <div className="tasks-container">
                <h2>Add tasks</h2>
                <div>
                    <input type="text" placeholder="Enter task.." value={task} onChange={(e)=>setTask(e.target.value)} />
                    <button onClick={(e)=>addtask(e)}>Add</button>
                </div>
            </div>
            }

            {
                option === 'view' && 
                
                    
                        <ul className="tasks-data">
                            <h2>tasks</h2>
                        
                        {
                            tasks.length?
                            tasks.map((tsk)=>{
                                return (
                                    <div className={`${tsk.taskstatus?'tasks-completed':'tasks-div'}`}>
                                        <p key={tsk._id} onDoubleClick={(e)=>deltask(e,tsk._id)} >{tsk.task}</p>
                                        <input type='checkbox'
                                         checked={tsk.taskstatus}
                                         onChange={(e)=>{ 
                                         changetaskstatus(e,tsk._id,e.target.checked)}}
                                          /> 
                                    </div>
                            )
                    
                        })
                        :
                            <h4 className="Notasks">No tasks added</h4>
                        }
                        </ul>

            }

            {
                option === 'changepassword' &&
                <Changepassword />
            }
        </>
    )
}


export default Data
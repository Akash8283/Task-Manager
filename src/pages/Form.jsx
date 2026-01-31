import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addTaskAPI, editTaskAPI, viewTaskAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';

function Form() {

    const [task,setTask] = useState({
        title:"",description:"",status:"pending"
    })
    console.log(task);
    const navigate = useNavigate()
    
    const{id} = useParams()

    const addTask = async()=>{
        const {title} = task
        if (title) {
            const result = await addTaskAPI(task)
            if (result.status == 200) {
                toast.success("Task added successfully")
                setTimeout(()=>{
                   navigate('/')
                },2500)
                setTask({title:"",description:""})

            }
            else if (result.status == 409) {
                toast.warning("Task already exists")
            }
            else{
                console.log(result);
            }
        }
        else{
            toast.info("Please add any task")
        }
    }

    useEffect(()=>{
        if (id) {
            viewTask()
        }
    },[])

    const viewTask = async()=>{
        const result = await viewTaskAPI(id)
        if (result.status == 200) {
            setTask(result.data)
        }
        else{
            console.log(result);
        }
    }

    const editTask = async()=>{
        const {title,status} = task
        if (!title || !status) {
            toast.info("Please fill the form")
        }
        else{
            const result = await editTaskAPI(id,task)
            if (result.status == 200) {
                setTask({title:"",description:""})
                toast.success("Task upadated successfully")
                setTimeout(()=>{
                    navigate('/')
                },2500)
            }
            else if(result.status == 409){
                toast.info("No change in task details")
            }
            else{
                console.log(result);
            }
        }

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {id?"Edit Task":"Add New Task"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            value={task.title}
            onChange={e=>setTask({...task,title:e.target.value})}
            type="text"
            placeholder="Enter task title"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            value={task.description}
            onChange={e=>setTask({...task,description:e.target.value})}
            rows="4"
            placeholder="Enter task description"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       {
         id &&
         <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
                Status
            </label>

            <select value={task.status} onChange={e=>setTask({...task,status:e.target.value})} className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
         </div>
        }

        <div className="flex justify-end gap-3">
          <Link to={'/'} className="px-4 py-2 border rounded hover:bg-gray-100 transition">
            Cancel
          </Link>
          {
            id?
            <button onClick={editTask} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Update
          </button>
            :
            <button  onClick={addTask} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Add Task
          </button>}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="dark"
       />
    </div>
  )
}

export default Form
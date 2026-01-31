import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { deleteTaskAPI, getAllTaskAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';

function Home() {

   const [allTasks,setAllTasks] = useState([])
   const [searchTerm, setSearchTerm] = useState("");

//    console.log(allTasks);

   useEffect(()=>{
    getAllTasks()
   },[])
   
   const getAllTasks = async()=>{
    const result = await getAllTaskAPI()
    if (result.status == 200) {
        setAllTasks(result.data)
    }
    else{
        console.log(result);
    }
   }

   const deleteTask = async(id)=>{
    const isConfirm = window.confirm("Are you sure you want to delete this task?")
    if (!isConfirm) {
        return
    }
    const result = await deleteTaskAPI(id)
    if (result.status == 200) {
        getAllTasks()
        toast.success("Task deleted successfully")
    }
    else{
        console.log(result);
        
    }
   }

   const filteredTask = allTasks.filter(task=>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
   )

  return (
     <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-4xl font-semibold">
          Task Details
        </h1>

        <div className='flex items-center gap-2'>
             <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-3 py-2 rounded w-64 focus:outline-none focus:ring-3 focus:ring-blue-500"
            />
            <Link to={'/add'}  className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition cursor-pointer">
              Add Task
            </Link>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border border-gray-200 bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {
                filteredTask?.length>0?
                 filteredTask?.map((task,index)=>(
                    <tr key={task?._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">{index+1}</td>
              <td className="px-4 py-3">{task?.title}</td>
              <td className="px-4 py-3 text-gray-600">{task?.description}</td>
              <td className="px-4 py-3">
                   {task?.status === "pending" && (
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                        Pending
                    </span>
                    )}

                    {task?.status === "in-progress" && (
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                        In Progress
                    </span>
                    )}

                    {task?.status === "completed" && (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                        Completed
                    </span>
                    )}
              </td>
              <td className='px-4 py-3 flex items-center gap-1'>
                <Link to={`/edit/${task?._id}`} className="px-2 py-1 bg-yellow-400 text-white rounded shadow hover:bg-white hover:text-yellow-400  transition flex items-center gap-1 cursor-pointer">
                    <FaEdit/>Edit 
                </Link>
                <button onClick={()=>deleteTask(task?._id)} className="px-2 py-1 bg-red-600 text-white rounded shadow hover:bg-white hover:text-red-600 transition flex items-center gap-1 cursor-pointer">
                    <FaTrashAlt/>Delete 
                </button>
              </td>
            </tr>
                 ))
                :
                <tr>
                    <td colSpan={5} className='text-center py-6 text-gray-500'>No data available</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
      <ToastContainer
         position="top-center"
         autoClose={2000}
         theme="dark"
       />
    </div>
  )
}

export default Home
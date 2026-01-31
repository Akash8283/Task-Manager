import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

// get all task
export const getAllTaskAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/tasks`)
}

// add task
export const addTaskAPI = async(task)=>{
    return await commonAPI("POST",`${serverURL}/tasks`,task)
}

// view task
export const viewTaskAPI = async(id)=>{
    return await commonAPI("GET",`${serverURL}/tasks/view/${id}`)
}

// edit task
export const editTaskAPI = async(id,task)=>{
    return await commonAPI("PUT",`${serverURL}/tasks/${id}`,task)
}

// delete task
export const deleteTaskAPI = async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/tasks/${id}`)
}
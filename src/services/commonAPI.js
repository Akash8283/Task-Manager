import axios from 'axios'

const commonAPI = async(httpMethod,url,reqBody)=>{
    const config = {
        method:httpMethod,
        url,
        data:reqBody
    }
    return await axios(config).then(res=>res).catch(err=>err)
}

export default commonAPI
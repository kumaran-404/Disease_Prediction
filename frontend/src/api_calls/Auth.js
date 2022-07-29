import axios,{AxiosError} from "axios"
import jwt_decode from "jwt-decode"

// get jwt token
export const LoginEnd = async(data,handleUsername)=>{
    
    try {
        const response = await axios.post("http://localhost:8000/api/token/",data)
        data = await response.data 
        localStorage.setItem("access",data.access)
        localStorage.setItem("refresh",data.refresh)
	var username = jwt_decode(data.access).name 
	handleUsername(username)
        return [true] 
    }
    catch(err){
        console.log(err)
        if(err.code==="ERR_BAD_REQUEST"){
            return [false,1] //1 for bad credentials
        }
        else {
            return [false,2] // 2 for network error 
        }
        
    }
    
}

// create new user 
export const SignUpEnd = async(data)=>{
        console.log(data)
        try {
            const response = await axios.post("http://localhost:8000/api/signup/",data)
            data = await response.data 
            return data 
        }
        catch(err){
            return {message:"failure" ,error:"network error"}
        }
}

// verifying token 
export async function VerifyTokenEnd(handleAuth){
        if(!localStorage.access)
            return false 
       
        console.log(localStorage.access)
        

        try {
            
             const response = await axios.post("http://localhost:8000/api/token/verify/",{
            "token" : localStorage.access 
                })
            return [true,jwt_decode(localStorage.access).name] 
        }
        catch(err){
             if(!localStorage.refresh){
                 localStorage.removeItem("access")
                 return [false] 
             }
             let resp =true 
             
             GetAccessTokenEnd(handleAuth).then(res=>{
                 let resp
                 if(res.message==="success"){
                     localStorage.access = res.data.access 
		     resp= [true,jwt_decode(res.data.access).name]
                 }
                 else {
                     resp= [false]
                 }
             })
		return resp
        }
        
}



// get new refresh token 
export const GetAccessTokenEnd = async(handleAuth)=>{
    
       handleAuth(null)
        try {
            
            const response = await axios.post("http://localhost:8000/api/token/refresh/",{
              "refresh" : localStorage.refresh 
            })
            return {message:"success" ,data :response.data}
        }
        catch(err){
            if(err.response.data.code==="token_not_valid"){
                localStorage.removeItem("access")
                localStorage.removeItem("refresh")
                handleAuth(false)
            }
            return {message:"failure"}
        }


}


export const Logout= (handleAuth)=>{
    
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    handleAuth(false)
}



import axios from "axios"


// get jwt token
export const LoginEnd = async(data)=>{
    console.log(data)
    const response = await axios.post("http://localhost:8000/api/token/",data)
    data = await response.data 
    console.log(data)
}

// create new user 
export const SignUpEnd = async(data)=>{

}

// verifying token 
export const VerifyTokenEnd = async()=>{
        if(!localStorage.accessToken)
            return false 
        const response = await axios.post("http://localhost:8000/api/token/verify/",{
            "token" : localStorage.accessToken
        })

        const data = await response.data 
        if(data.code==="token_not_valid") return false 
        else return true 
}



// get new refresh token 
export const GetRefreshTokenEnd = async()=>{

}




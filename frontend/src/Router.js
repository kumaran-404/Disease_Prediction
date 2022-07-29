import React,{useState,useEffect} from 'react'

import {Routes,Route,BrowserRouter as Router_,Navigate} from "react-router-dom"
import { VerifyTokenEnd} from "./api_calls/Auth"


import  Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Predict from './pages/Predict/Predict'
import Home from './pages/Home/Home'
import Results from './pages/Predict/Results'


const Router = () => {

    const [IsAuthenticated,handleAuth] = useState(null)
    const [IsLoading,handleIsLoading]  = useState(true)
    const [username,handleUsername] = useState("")    
    
	useEffect(()=>{
        handleIsLoading(true)
        VerifyTokenEnd(handleAuth).then(res=>{
            handleIsLoading(false)
            handleAuth(res[0])
            if(res[0]===true) handleUsername(res[1])
        })
    },[])

    if((IsLoading) ){
        return(
            <div>
                Loading...
            </div>

        )
    }
    else {
        if(!IsAuthenticated){
            return <PublicRoute  handleUsername ={handleUsername} handleAuth={handleAuth}/>
        }
        else {
            return <ProtectedRoute username={username}  handleAuth={handleAuth}/>
        }
    }

}

const PublicRoute =({handleAuth,handleUsername})=>{
    
    return(
        <Router_>
            <Routes>
                <Route path="login"  element={<Login handleUsername={handleUsername}  handleAuth={handleAuth}/>}></Route>
                <Route path="signup" element={<Signup/>}></Route>
                <Route path="/*" element={<Navigate to="login"/>}></Route>
            </Routes>
        </Router_>
        
    )
}

const ProtectedRoute =({handleAuth,username})=>{
  
    return (
        <Router_>
            <Routes>
                <Route path="predict" element={<Predict/>}></Route>
                <Route path="predict/results" element={<Results/>}></Route>
                <Route  path="/" element={<Home username={username} handleAuth={handleAuth}/>}></Route>
                <Route path="/*" element={<Navigate to="/"/>}></Route>
            </Routes>
        </Router_>
        
    )
}

export default Router

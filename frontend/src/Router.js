import React,{useState,useEffect} from 'react'

import {Routes,Route,BrowserRouter as Router_,Navigate} from "react-router-dom"
import { VerifyTokenEnd} from "./api_calls/Auth"


import  Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Predict from './pages/Predict/Predict'
import Home from './pages/Home/Home'


const Router = () => {

    const [IsAuthenticated,handleAuth] = useState(null)
    const [IsLoading,handleIsLoading]  = useState(true)
    
    useEffect(()=>{
        handleIsLoading(true)
        VerifyTokenEnd(handleAuth).then(res=>{
            handleIsLoading(false)
            handleAuth(res)
            
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
            return <PublicRoute handleAuth={handleAuth}/>
        }
        else {
            return <ProtectedRoute  handleAuth={handleAuth}/>
        }
    }

}

const PublicRoute =({handleAuth})=>{
    
    return(
        <Router_>
            <Routes>
                <Route path="login"  element={<Login handleAuth={handleAuth}/>}></Route>
                <Route path="signup" element={<Signup/>}></Route>
                <Route path="/*" element={<Navigate to="login"/>}></Route>
            </Routes>
        </Router_>
        
    )
}

const ProtectedRoute =({handleAuth})=>{
  
    return (
        <Router_>
            <Routes>
                <Route path="predict" element={<Predict/>}></Route>
                <Route  path="/" element={<Home handleAuth={handleAuth}/>}></Route>
                <Route path="/*" element={<Navigate to="/"/>}></Route>
            </Routes>
        </Router_>
        
    )
}

export default Router
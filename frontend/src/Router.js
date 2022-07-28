import React,{useState,useEffect} from 'react'

import {Routes,Route,BrowserRouter as Router_} from "react-router-dom"
import { VerifyTokenEnd} from "./api_calls/Auth"
import  Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'


const Router = () => {

    const [IsAuthenticated,handleAuth] = useState(false)
    const [IsLoading,handleIsLoading]  = useState(true)
    
    useEffect(()=>{
        VerifyTokenEnd().then(res=>{
            handleAuth(res)
            handleIsLoading(false)
        })
    },[])

    if(IsLoading){
        return(
            <div>
                Loading...
            </div>

        )
    }
    else {
        if(!IsAuthenticated){
            return <PublicRoute/>
        }
        else {
            return <ProtectedRoute/>
        }
    }

}

const PublicRoute =()=>{
   
    return(
        <Router_>
            <Routes>
                <Route path="login" element={<Login/>}></Route>
                <Route path="signup" element={<Signup/>}></Route>
                
            </Routes>
        </Router_>
        
    )
}

const ProtectedRoute =()=>{
    return (
        <Router_>
            <Routes>
                <Route path="predict"></Route>
                <Route path="home"></Route>
            </Routes>
        </Router_>
        
    )
}

export default Router
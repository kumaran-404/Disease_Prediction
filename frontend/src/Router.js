import React,{useState,useEffect,Suspense} from 'react'

import {Routes,Route,BrowserRouter as Router_,Navigate} from "react-router-dom"
import { VerifyTokenEnd} from "./api_calls/Auth"

import Loader from "./components/Loader"
import NavBar from './components/NavBar'
import Home from "./pages/Home/Home"
const  Login =React.lazy(()=>import('./pages/Login/Login'))
const  Signup =React.lazy(()=>import('./pages/Signup/Signup'))
const  Predict =React.lazy(()=>import( './pages/Predict/Predict'))
const  Results =React.lazy(()=>import( './pages/Predict/Results'))


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
            <Loader/>

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
                <Route path="login"  element={<Suspense fallback={<Loader/>}> <Login handleUsername={handleUsername}  handleAuth={handleAuth}/> </Suspense>}></Route>
                <Route path="signup" element={<Suspense fallback={<Loader/>}> <Signup/></Suspense>}></Route>
                <Route path="/*" element={<Navigate to="login"/>}></Route>
            </Routes>
        </Router_>
        
    )
}

const ProtectedRoute =({handleAuth,username})=>{
    const [location,handleLocation] = useState("/")
    return (
        <Router_>
	   <NavBar handleAuth={handleAuth}  location={location}/>
            <Routes>
                <Route path="predict"  element={<Suspense fallback={<Loader/>}> <Predict handleLocation={handleLocation}  /></Suspense>}></Route>
                <Route path="predict/results" element={<Suspense fallback={<Loader/>}><Results/></Suspense>}></Route>
                <Route  path="/" element={<Home handleLocation={handleLocation} username={username} handleAuth={handleAuth}/>}></Route>
                <Route path="/*" element={<Navigate to="/"/>}></Route>
            </Routes>
        </Router_>
        
    )
}

export default Router

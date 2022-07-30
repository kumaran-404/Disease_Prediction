import React,{useState,useEffect,Suspense} from 'react'

import {Routes,Route,BrowserRouter as Router_,Navigate} from "react-router-dom"
import { VerifyTokenEnd} from "./api_calls/Auth"

<<<<<<< HEAD

import  Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Predict from './pages/Predict/Predict'
import Home from './pages/Home/Home'
import Results from './pages/Predict/Results'
=======
import Loader from "./components/Loader"
import NavBar from './components/NavBar'
import Home from "./pages/Home/Home"
const  Login =React.lazy(()=>import('./pages/Login/Login'))
const  Signup =React.lazy(()=>import('./pages/Signup/Signup'))
const  Predict =React.lazy(()=>import( './pages/Predict/Predict'))
const  Results =React.lazy(()=>import( './pages/Predict/Results'))
>>>>>>> 8c59d67f1ce7dedf2043ae1f00f25f25f0acb68f


const Router = () => {

    const [IsAuthenticated,handleAuth] = useState(null)
    const [IsLoading,handleIsLoading]  = useState(true)
    const [username,handleUsername] = useState("")    
    
<<<<<<< HEAD
    useEffect(()=>{
        handleIsLoading(true)
        VerifyTokenEnd(handleAuth).then(res=>{
            handleIsLoading(false)
            handleAuth(res)
            
=======
	useEffect(()=>{
        handleIsLoading(true)
        VerifyTokenEnd(handleAuth).then(res=>{
            handleIsLoading(false)
            handleAuth(res[0])
            if(res[0]===true) handleUsername(res[1])
>>>>>>> 8c59d67f1ce7dedf2043ae1f00f25f25f0acb68f
        })
    },[])

    if((IsLoading) ){
        return(
            <Loader/>

        )
    }
    else {
        if(!IsAuthenticated){
<<<<<<< HEAD
            return <PublicRoute handleAuth={handleAuth}/>
        }
        else {
            return <ProtectedRoute  handleAuth={handleAuth}/>
=======
            return <PublicRoute  handleUsername ={handleUsername} handleAuth={handleAuth}/>
        }
        else {
            return <ProtectedRoute username={username}  handleAuth={handleAuth}/>
>>>>>>> 8c59d67f1ce7dedf2043ae1f00f25f25f0acb68f
        }
    }

}

<<<<<<< HEAD
const PublicRoute =({handleAuth})=>{
=======
const PublicRoute =({handleAuth,handleUsername})=>{
>>>>>>> 8c59d67f1ce7dedf2043ae1f00f25f25f0acb68f
    
    return(
        <Router_>
            <Routes>
<<<<<<< HEAD
                <Route path="login"  element={<Login handleAuth={handleAuth}/>}></Route>
                <Route path="signup" element={<Signup/>}></Route>
=======
                <Route path="login"  element={<Suspense fallback={<Loader/>}> <Login handleUsername={handleUsername}  handleAuth={handleAuth}/> </Suspense>}></Route>
                <Route path="signup" element={<Suspense fallback={<Loader/>}> <Signup/></Suspense>}></Route>
>>>>>>> 8c59d67f1ce7dedf2043ae1f00f25f25f0acb68f
                <Route path="/*" element={<Navigate to="login"/>}></Route>
            </Routes>
        </Router_>
        
    )
}

<<<<<<< HEAD
const ProtectedRoute =({handleAuth})=>{
  
=======
const ProtectedRoute =({handleAuth,username})=>{
    const [location,handleLocation] = useState("/")
>>>>>>> 8c59d67f1ce7dedf2043ae1f00f25f25f0acb68f
    return (
        <Router_>
	   <NavBar handleAuth={handleAuth}  location={location}/>
            <Routes>
<<<<<<< HEAD
                <Route path="predict" element={<Predict/>}></Route>
                <Route path="predict/results" element={<Results/>}></Route>
                <Route  path="/" element={<Home handleAuth={handleAuth}/>}></Route>
=======
                <Route path="predict"  element={<Suspense fallback={<Loader/>}> <Predict handleLocation={handleLocation}  /></Suspense>}></Route>
                <Route path="predict/results" element={<Suspense fallback={<Loader/>}><Results/></Suspense>}></Route>
                <Route  path="/" element={<Home handleLocation={handleLocation} username={username} handleAuth={handleAuth}/>}></Route>
>>>>>>> 8c59d67f1ce7dedf2043ae1f00f25f25f0acb68f
                <Route path="/*" element={<Navigate to="/"/>}></Route>
            </Routes>
        </Router_>
        
    )
}

export default Router

import React from 'react'
import {Logout} from "../../api_calls/Auth"
import { NavLink } from 'react-router-dom'

const Home = ({handleAuth}) => {
    
  return (
    <div>

        <button onClick={()=>{Logout(handleAuth)}}>Logout</button>
        <NavLink to="Predict">predict</NavLink>
        <NavLink to="/">Home</NavLink>
    </div>
  )
}

export default Home

import { NavLink } from 'react-router-dom';
import {Button} from "@mui/material"
import {Logout} from "../api_calls/Auth"

function NavBar({location,handleAuth}){

	
	
	return (
		<div className="navbar">
			<img className="logo" src="/images/logo.jpeg"  />
			<div className="navlinks">
				<NavLink to="/"   className={ location==="/"?"link active-link":"link"}> Home</NavLink>
				<NavLink  to="predict" className={location==="/predict"?"link active-link":"link"}>Predict</NavLink>
				<a className="link" id="News"  href="#news">{location==="/"?"News":""}</a>
				<Button onClick={()=>{Logout(handleAuth)}}>Logout</Button>
			</div>					
		</div>
	)

}

export default NavBar 


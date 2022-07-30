import React from 'react'
import {Logout} from "../../api_calls/Auth"
import { NavLink } from 'react-router-dom'
<<<<<<< HEAD


const Home = ({handleAuth}) => {
    
  return (
    <div>
        <button onClick={()=>{Logout(handleAuth)}}>Logout</button>
        <NavLink to="Predict">predict</NavLink>
        <NavLink to="/">Home</NavLink>
=======
import axios from "axios"
import Styles from "./Home.module.css"
import {Card,CardContent,CircularProgress} from "@mui/material"

const Home = ({handleAuth,username,handleLocation}) => {
   
  const [data,handleData] = React.useState(null)  
  handleLocation("/")
  React.useEffect(()=>{
	 async function getData(){
		const token = 'Bearer '+localStorage.access
		const resp = await axios.get("http://localhost:8000/api/news/",
			{ headers :{  Authorization :token}} )
		const data = await resp.data
		console.log(data) 
		handleData(data)}
	getData()
	},[])
  return (
    <div className={Styles.Wrapper}>
        
	<div className={Styles.top}>
	    	
		Welcome Back !!{username}		
	</div>
	<div id="news" style={{display:"flex" ,position:"relative",flexDirection:"column",alignItems:"center"}}>
	    	<h3 className={Styles.header}> See Latest news</h3>
	{data===null? <CircularProgress sx={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/> : <div className={Styles.Container}>
	        
		{
		   data.map((el,key)=>{
			return(
			<Card variant="outlined" id={key} className={Styles.eachStory} sx={{display:"flex",flexDirection:"column",alignItems:"center"}} onClick={()=>{window.open(el.link,"_blank")}}>
			   <CardContent style={{height:"100%",display:"flex",flexDirection:"column" ,margin:"0",padding:"0"}} >
		           	<img  width={"100%"} height={"200px"}  src={el.image}/>
				<span className={Styles.title}>{el.title}</span>
			   	<p className={Styles.content}> {el.content}</p>
				<span className={Styles.time}>{el.postedAt}</span>			
			   </CardContent>
			</Card>
			)
			})
			
		}

		</div>}
	</div>
>>>>>>> 8c59d67f1ce7dedf2043ae1f00f25f25f0acb68f
    </div>
  )
}

<<<<<<< HEAD
export default Home
=======
export default Home
>>>>>>> 8c59d67f1ce7dedf2043ae1f00f25f25f0acb68f

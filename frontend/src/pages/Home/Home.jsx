import React from 'react'
import {Logout} from "../../api_calls/Auth"
import { NavLink } from 'react-router-dom'
import axios from "axios"
import Styles from "./Home.module.css"
import {Card,Typography,CardContent} from "@mui/material"

const Home = ({handleAuth,username}) => {
   
  const [data,handleData] = React.useState(null)  
 
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
        <button onClick={()=>{Logout(handleAuth)}}>Logout</button>
        <NavLink to="Predict">predict</NavLink>
        <NavLink to="/">Home</NavLink>
	{username}
	<h3>News feeds </h3>
	{data===null?"Fetching pls wait" : <div className={Styles.Container}>

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
  )
}

export default Home

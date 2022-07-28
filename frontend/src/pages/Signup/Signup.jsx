import React from 'react'
import TextField from '@mui/material/TextField'
import  Button  from '@mui/material/Button'
import Styles from "../Login/Login.module.css"
import {NavLink,useNavigate} from "react-router-dom"
import {SignUpEnd} from "../../api_calls/Auth"

const Signup = () => {
  const email = React.useRef()
  const password  = React.useRef()
  const username  = React.useRef()
  const navigate = useNavigate()
  const [IsLoading,handleIsLoading] = React.useState(false)
  const [error,handleError] = React.useState({
    'email' :[false ,""],
    'password' :[false,""],
    "username" :[false,""]
  })

  React.useEffect(()=>{
      email.current = document.getElementById("email")
      password.current = document.getElementById("password")
      username.current = document.getElementById("username")
  },[])

  const Submit = async()=>{
    
    //check email 
    if(email.current.value.trim().length===0){
        handleError(prev=>{

          let newemail = [true,"Empty Email"]
          return {...prev ,email:newemail}
        } )
        return 
    }

    else {
      handleError(prev=>{

        let newemail = [false,""]
        return {...prev ,email:newemail}
      } )
    }

    // check password 

    if(password.current.value.length<8){
      handleError(prev=>{

        let newpassword = [true,"Weak password(min 8)"]
        return {...prev ,password:newpassword}
      } )
      return 
    }
    else {
      handleError(prev=>{

        let newpassword = [false,""]
        return {...prev ,password:newpassword}
      } )

    }

    // check user name 

    if(username.current.value.trim().length==0){
      handleError(prev=>{
        let newusername = [true,"Empty Name"]
        return {...prev ,username:newusername}
      } )
      return 
    }
    else {
      handleError(prev=>{

        let newusername= [false,""]
        return {...prev ,username:newusername}
      } )

    }

    handleIsLoading(true)
    SignUpEnd({
      username :username.current.value ,
      password :password.current.value,
      email :email.current.value 
    }).then(response=>{
      handleIsLoading(false)
      if(response.message==="success"){
         navigate("login")
      }
      else {
          if(response.error==="EMAIL_TAKEN"){
            handleError(prev=>{
              let newemail = [true,"Email already taken"]
              return {...prev ,email:newemail}
            } )
          }
          else {
              console.log("some server err")
          }
      }
    })

  
    
   
  }

  return (
    <div class={Styles.container}>
        <img src="/images/logo.jpeg" className="logo" />
        <TextField
          style={{margin:"10px"}}
          id="email"
          label="Enter Email"
          size="small"
          error={error.email[0]}
          helperText = {error.email[1]}
        />

        <TextField
          style={{margin:"10px"}}
          id="password"
          type="password"
          label="Enter Password"
          size="small"
          error={error.password[0]}
          helperText ={error.password[1]}
        />

        <TextField
          style={{margin:"10px"}}
          id="username"
          label="Enter Name"
          size="small"
          error={error.username[0]}
          helperText ={error.username[1]}
        />

        <Button 
          variant="contained" 
          disableElevation  
          disabled={IsLoading} 
          onClick={Submit}
          style={{margin:"10px"}}
          color ="warning"
          >
            {IsLoading?"Loading..":"Signup"}
        </Button>

        <div style={{margin:"10px",alignSelf:"center"}}>
           Already Have Account? <NavLink to="/login">Login</NavLink>
        </div>
    </div>
  )
}

export default Signup
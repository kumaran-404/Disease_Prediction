import React from 'react'
import TextField from '@mui/material/TextField'
import  Button  from '@mui/material/Button'
import {LoginEnd} from "../../api_calls/Auth"
import Styles from "./Login.module.css"
import {NavLink} from "react-router-dom"

<<<<<<< HEAD
const Login = ({handleAuth}) => {
=======
const Login = ({handleAuth,handleUsername}) => {
>>>>>>> 8c59d67f1ce7dedf2043ae1f00f25f25f0acb68f
  
  const email = React.useRef()
  const password  = React.useRef()
  const [IsLoading,handleIsLoading] = React.useState(false)
  const [error,handleError] = React.useState({
    'email' :[false ,""],
    'password' :[false,""]
  })

  React.useEffect(()=>{
      email.current = document.getElementById("email")
      password.current = document.getElementById("password")
  },[])


  const Submit = async()=>{
    
    if(email.current.value.trim().length===0){
        handleError(prev=>{

          let newemail = [true,"Empty Email"]
          return {...prev ,email:newemail}
        } )
        return 
    }

    handleError(prev=>{
      let newemail = [false,""]
      return {password:[false,""] ,email:newemail}
    } )

    handleIsLoading(true);
    // send to endpoint 

<<<<<<< HEAD
    LoginEnd({email:email.current.value,password:password.current.value}).
=======
    LoginEnd({email:email.current.value,password:password.current.value},handleUsername).
>>>>>>> 8c59d67f1ce7dedf2043ae1f00f25f25f0acb68f
    then(res=>{
        if(res[0]){
            handleAuth(true)
        }
        else {
          if(res[1] ===1) {
            const newpassword = [true,"wrong credentials"]
            const newemail = [true,""]
            handleError(prev=>{
              return {email:newemail,password:newpassword}
            })
            handleIsLoading(false)
          }
        }
    })
    
   
  }

  return (
    <div class={Styles.container}>
        <img src="/images/logo.jpeg" className="logo"/>
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

        <Button 
          style={{margin:"10px"}}
          variant="contained" 
          disableElevation  
          disabled={IsLoading} 
          onClick={Submit}
          >
            {IsLoading?"Loading..":"Login"}
        </Button>

        <div style={{margin:"10px",alignSelf:"center"}}>
           Join us ! <NavLink to="/signup">Create Account</NavLink>
        </div>
    </div>
  )
}


export default Login 

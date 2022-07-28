import React from 'react'
import TextField from '@mui/material/TextField'
import  Button  from '@mui/material/Button'
import {LoginEnd} from "../../api_calls/Auth"

const Login = () => {

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
      return {...prev ,email:newemail}
    } )
    // send to endpoint 
    LoginEnd({email:email.current.value,password:password.current.value})
    
   
  }

  return (
    <div class={""}>

        <TextField
          id="email"
          label="Enter Email"
          size="small"
          error={error.email[0]}
          helperText = {error.email[1]}
        />

        <TextField
          id="password"
          type="password"
          label="Enter Password"
          size="small"
          error={error.password[0]}
          helperText ={error.password[1]}
        />

        <Button 
          variant="contained" 
          disableElevation  
          disabled={IsLoading} 
          onClick={Submit}
          >
            {IsLoading?"Loading..":"Login"}
        </Button>
    </div>
  )
}


export default Login 
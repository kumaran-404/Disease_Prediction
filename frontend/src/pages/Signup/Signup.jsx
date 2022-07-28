import React from 'react'
import TextField from '@mui/material/TextField'
import  Button  from '@mui/material/Button'

const Signup = () => {
  const email = React.useRef()
  const password  = React.useRef()
  const username  = React.useRef()
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

        <TextField
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
          >
            {IsLoading?"Loading..":"Signup"}
        </Button>
    </div>
  )
}

export default Signup
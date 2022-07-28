import React from 'react'
import {useLocation, useNavigate} from "react-router"

function Results() {

    const props = useLocation()
    const navigate = useNavigate()
    const data = props.state.result
   console.log(data)
    React.useEffect(()=>{
            if(!data){
                navigate("/predict")
            }
    },[])
  if(!data){
      return <span>Loading</span>
  }
  else {
      return <div>
          {JSON.stringify(data)}
          <button onClick={()=>navigate("/predict")}>Back</button>
      </div>
  }
}


export default Results
import React from 'react'
import {useLocation, useNavigate} from "react-router"
import {Button} from "@mui/material"
 
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
      return <div style={{margin:"0 auto",width:"70vw"}}>
                <Button variant="outlined" onClick={()=>navigate("/predict")}>Go Back</Button>
                <span style={{display:"flex",alignItems:"baseline"}}><h1 style={{textDecoration:"underline",textTransform:"capitalize",marginRight:"10px"}}> {data.disease}</h1> is the disease predicted</span>
                <div style={{lineHeight:"1.5",marginBottom:"10px",fontStyle:"italic"}}>{data.captions}</div>
                <a href={data.links} target="_blank"> Read More </a>
        </div>
           
  }
}


export default Results
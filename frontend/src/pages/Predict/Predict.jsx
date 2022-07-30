import React from 'react'
import Styles from "./Predict.module.css"
import {Button,LinearProgress} from "@mui/material"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Predict = ({handleLocation}) => {
  handleLocation("/predict")
  const [IsImage,handleImage] = React.useState(false)
  const [IsUploading,handleUploading]  = React.useState(false)
  const [ImageFile,handleImageFile] = React.useState(null)
  const [progress,handleProgress] = React.useState(0)
  const [name,handlename] = React.useState("")
  const [result,handleResults] = React.useState(null)
  const navigate = useNavigate()

  const ImageAdded =()=>{
    handleImage(true) 
  
    var file = document.getElementById("image-file").files[0]
    handlename(file.name)
    var reader = new FileReader()
    reader.onloadend =()=>{
      handleImageFile(reader.result)
    }
    reader.readAsDataURL(file)

  }

  const DragAndDrop =(ev)=>{
    console.log("ih")
  
    ev.preventDefault()
    let image=new Image(ev.dataTransfer.getData("text"))
    var reader = new FileReader()
    reader.onloadend = ()=>{
      console.log(reader.result)
    }
    reader.readAsDataURL(image)
    }

  const upload =async()=>{
      handleProgress(0)
       const tok ="Bearer "+localStorage.access 
       const response = await axios.post("http://localhost:8000/api/predict/",{"image":ImageFile},{ headers :{  Authorization : tok }})
       const data = await response.data
      handleResults(data)  // change to data after wards

  }

  return (
    <div className={Styles.container}>
        <h3>Image upload</h3>
        
        <div id="upload-area" className={Styles.upload_area}>
            {
              IsImage? <AfterImageAdded ImageFile={ImageFile} />  : <BeforeImageAdd  DragAndDrop={DragAndDrop} ImageAdded={ImageAdded}/>
            }
        </div>

        {IsImage&&<Settings progress={progress}  name={name}/>}
        
        

        <Button 
          disableElevation
          style={{alignSelf:"stretch"}}
          variant="contained"
          disabled={!IsImage}
          onClick={ !result?upload:(()=>navigate("/Predict/Results",{state:{result:result}}))}
        >{result?"View Results":"Upload"}</Button>
        
    </div>
  )
}


function AfterImageAdded({ImageFile}){
  return(
     <div class={Styles.AfterUpload}>
         <img src={ImageFile} alt="file"/>
     </div>
  )
}



function BeforeImageAdd({ImageAdded,DragAndDrop}){

    const Add = ()=>{
      document.getElementById("image-file").click()
    }

    return(
      <div class={Styles.BeforeUpload} id="before-upload"  onDragOver={(event)=>{event.preventDefault();document.getElementById("before-upload").style.border="2px dashed blue";event.dataTransfer.effectAllowed = "all";event.dataTransfer.dropEffect = 'copy';}}  onDragLeave={()=>{document.getElementById("before-upload").style.border="1px dashed black"}} onDrop={DragAndDrop} >
        <img src="/images/up.png"/>
        <input onChange={ImageAdded} style={{display:"none"}} type="file" id="image-file"/>
        <span>Drag and drop or <span className={Styles.browse} onClick={Add} >Browse</span> your files</span>
      </div>
    )
}


function Settings({name,progress}){
  return (
    <div className={Styles.settings}>
        <img src="/images/image.png"></img>
        <div className={Styles.settingsProps}>
            <span>{name}</span>
            {(progress>0&&progress<100)&&<LinearProgress style={{marginTop:"5px"}} variant="buffer" value={progress}/>}
        </div>
    </div>
  )
}


export default Predict

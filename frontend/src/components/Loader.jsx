
import {CircularProgress} from "@mui/material"


function Loader(){
	return(
		<div	style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>

			<CircularProgress/>
		</div>

	)

}


export default Loader ;

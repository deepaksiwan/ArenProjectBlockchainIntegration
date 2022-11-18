import {makeStyles} from "@mui/styles";
import { color } from "@mui/system";
export const useStyles = makeStyles ({
  editmodal:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    backgroundColor: '#060f2c',
    border: '2px solid #000',
    boxShadow:" 24px",
    padding:"40px",
    borderRadius: '15px',
    height:"auto",
  
  },
  textmodal:{
    textAlign: "center",
    color: "white",
    fontSize: "20px"
  },
  desc:{
   textAlign: "center",
   color: "white",
   fontSize: "15px"
 },
 image:{
   display:"flex",
   color: "white",
   fontSize: "15px",
   "& img":{
      margin:"0 auto !important" ,
      width:"200px", height:"200px"
 }
} 
}
)

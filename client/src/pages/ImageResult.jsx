import { React, useState, useEffect, useCallback } from 'react'
import Navbar from "../components/Navbar";
import { Typography, TextField, Button, IconButton, Switch, 
   Container, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ErrorSnackBar from '../components/ErrorSnackBar';
import { Style } from '../components/Theme';


export default function ImageResult() {
   const saved_result = JSON.parse(localStorage.getItem('result'));
   const [imgLink, setImgLink] = useState(Array(saved_result.result.length).fill(""));
   //let imgLink = Array(saved_result.result.length).fill("");
   //console.log(saved_result);
   const [barErrorMsg, setBarErrorMsg] = useState("");
   const [barOpen, setBarOpen] = useState(false);
   const [finish, setFinish] = useState(false);

   async function fetchImages () {
      let tempImgLink = Array(saved_result.result.length).fill("");
      // Loop through the array and call getImage for each filename
      for (let index = 0; index < saved_result.result.length; index++) {

        const filename = saved_result.result[index];
        const response = await fetch('http://localhost:5000/display_image/' + filename);
        const images = await response.blob();
        // Convert the image to a URL
        let outside = URL.createObjectURL(images);
        tempImgLink[index] = outside;
      }
      setImgLink(tempImgLink);
      setFinish(true);
   }

   try {
      if (!finish){
         fetchImages();
      }
   } 
   catch (error) {
      setBarErrorMsg("Failed to get images.")
      setBarOpen(true);
   }
   
   function downloadFile(index) {
      console.log(index, imgLink[index]);
      let a = document.createElement('a');
      a.href = imgLink[index];
      a.download = index + '.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }

   return(
      <>
         <Navbar/>
         <Container sx={Style.commonContainer}>
         <ErrorSnackBar 
                errorMsg={barErrorMsg} 
                open={barOpen}
                handleClose={()=>{setBarOpen(false)}}
            />
         <Box 
            display='flex'
            flexWrap='wrap'
            flexDirection='row'
            justifyContent='center'
            sx={{mt:4}}>
         {
            imgLink.map((link, index) => (
            <>
               <Box display='flex'  
                  flexDirection='column' 
                  sx={{mx: 6, mb: 2, width: "10em"}}>
                  <img 
                     src={link} 
                     width={200}
                     alt={`${index}.png`}
                     sx={{mx: 4}}></img>
                  <Box display='flex' flexDirection='row' alignItems="center">
                     <Typography>{`${index}.png`}</Typography>
                     <IconButton onClick={()=> downloadFile(index)}>
                        <DownloadIcon/>
                     </IconButton>
                  </Box>
               </Box>        
            </>
            ))
         }
         </Box>
         </Container>
      </>
   )
}
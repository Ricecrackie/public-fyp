import { React, useState, useEffect } from 'react'
import Navbar from "../components/Navbar";
import { Typography, TextField, Button, IconButton, Switch, 
   Container, Box, CircularProgress } from '@mui/material';
import { Style } from '../components/Theme';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function TextResult() {
   const saved_result = JSON.parse(localStorage.getItem('result'));
   const [copied, setCopied] = useState(Array(saved_result.result.length).fill(false));
   const [copyError, setCopyError] = useState(Array(saved_result.result.length).fill(false));

   function copyText(text, index){
      navigator.clipboard.writeText(text, index)
        .then(() => {
            setCopied(prevCopied => {
                const newCopied = [...prevCopied];
                newCopied[index] = true;
                return newCopied;
            });
            setCopyError(prevCopied => {
               const newCopied = [...prevCopied];
               newCopied[index] = false;
               return newCopied;
            });
        })
        .catch(err => {
            setCopyError(prevCopied => {
                  const newCopied = [...prevCopied];
                  newCopied[index] = true;
                  return newCopied;
            });
            setCopied(prevCopied => {
               const newCopied = [...prevCopied];
               newCopied[index] = false;
               return newCopied;
           });
        });
}
   return (
      <>
      <Navbar />
      <Container sx={Style.commonContainer}>
      {/* {
         loading ? (<CircularProgress/>) : (
            result.map((item, index) => (
               <TextField>{item}</TextField>
            ))
         )
      }
         */}
      <Box sx={Style.splitTextBox}>
      {saved_result.result.map((item, index) => (
            <Box display="flex" alignItems="center">
               <TextField
               sx={{my:2}}
               rows={3}
               multiline
               fullWidth
               defaultValue={item}
               InputProps={{
               readOnly: true,
               }}
               color={copied[index] ? "success" : 
                  copyError[index] ? "error" : "primary"
               }
               focused={copied[index] || copyError[index]}
               label={copied[index] ? "Copied!" : 
                  copyError[index] ? "Error in copying!" : ""
               }
               error={copyError[index] ? true : false}
               />
            <Box>
               <IconButton onClick={() => {copyText(item, index)}}>
                  <ContentCopyIcon  />
               </IconButton>
               <IconButton onClick={() => {
                  window.open(`https://wa.me/?text=Hi%2C%20this%20is%20your%20share%20by%20Shamir%27s%20secret%20sharing%20scheme%3A%20${item}`, "_blank")}}>
                  <WhatsAppIcon  />
               </IconButton>
            </Box>
            </Box>
      ))}
      <Button variant='contained' sx={{width: "10em"}} href="/text">Back</Button>
      </Box>
      </Container>
      </>
    );
}


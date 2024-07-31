import { useState } from 'react';
import { Paper, Box, Card, Typography } from '@mui/material';
import { SPLIT_IMAGE_FILEFORMAT, COMBINE_IMAGE_FILEFORMAT, TEXT_FILEFORMAT} from '../String';

function DropFileZone({ setParentFiles, type_id, accepts, multiple }) {
   const [isOver, setIsOver] = useState(false);
   const [files, setFiles] = useState([]);
   const [image, setImage] = useState([]);
   const [isUploaded, setIsUploaded] = useState(false);
   // Define the event handlers
   const re_txt = /(\.txt)$/i;
   const re_img = /(\.jpg|\.jpeg|\.png)$/i;
   const re_combine_img = /(\.png)$/i;

   const handleDragOver = (event) => {
      event.preventDefault();
      setIsOver(true);
   };

   const handleDragLeave = (event) => {
      event.preventDefault();
      setIsOver(false);
   };

   const addFiles = (newFiles) => {
      // Use FileReader to read file content

      newFiles.forEach((file) => {
         const reader = new FileReader();
         reader.filename = file.name;

         reader.onloadend = (event) => {
            if ((accepts == TEXT_FILEFORMAT && !re_txt.exec(event.target.filename)) || (accepts == SPLIT_IMAGE_FILEFORMAT && !re_img.exec(event.target.filename))
            || (accepts == COMBINE_IMAGE_FILEFORMAT && !re_combine_img.exec(event.target.filename))) {
               alert("File extension not supported!");
               return;
            }
            if (!multiple) {
               setFiles([{ file, src: event.target.result }]);
               setParentFiles([{ file, src: event.target.result }]);
            }
            else {
               //setFiles([...files, { file, src: event.target.result }]);
               //setParentFiles([...files, { file, src: event.target.result }]);
               setFiles((prevFiles) => [...prevFiles, { file, src: event.target.result }]);
               setParentFiles((prevFiles) => [...prevFiles, { file, src: event.target.result }]);
            }
         };

         reader.onerror = () => {
            console.error('There was an issue reading the file.');
         };

         reader.readAsDataURL(file);
      });
   };

   const handleDrop = (event) => {
      event.preventDefault();
      setIsOver(false);
      const droppedFiles = Array.from(event.dataTransfer.files);
      if (multiple) {
         addFiles(droppedFiles);
      }
      else {
         addFiles([droppedFiles[0]]);
      }
   };

   const handleClickingUpload = (event) => {
      const uploadedFiles = Array.from(event.target.files);
      addFiles(uploadedFiles);
   }
   // use snack bar to handle error message
   return (
      // <Box sx={{ maxWidth: '100%', maxHeight: '10em', flexGrow: 1 }}>
      <>
         <div
            style={{
               display: 'flex',
               width: '30em',
               //height: '20%',
               flexGrow: 1,
               backgroundColor: isOver ? '#42a5f544' : 'white',
               border: isOver ? '0.2em solid #1976d2' : '0.2em dotted grey',
               borderRadius: '0.25em',
               textAlign: 'center',
               justifyContent: 'center',
               alignContent: 'center',
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <label for={type_id}
               style={{
                  borderRadius: '0.5em',
                  display: 'inline-block',
                  width: '30em',
                  //backgroundColor: '#1976d2',
                  padding: '3em',
                  cursor: 'pointer',
               }}>
               Drag your File or Upload by Clicking here
            </label>
            {
               multiple ? (
                  <input id={type_id} type="file" multiple name={type_id} accept={accepts}
                     onChange={handleClickingUpload}
                     style={{
                        display: 'none',
                     }} />
               ) : (
                  <input id={type_id} type="file" name={type_id} accept={accepts}
                     onChange={handleClickingUpload}
                     style={{
                        display: 'none',
                     }} />
               )
            }
         </div>
      </>
   );
}

export default DropFileZone

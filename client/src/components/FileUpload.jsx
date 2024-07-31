import { useState } from "react";
// import { storage } from "../firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {Button, Box, Typography} from '@mui/material';
import { Style } from "./Theme.js";
import { display } from "@mui/system";


function FileUpload() {
    // State to store uploaded file
    const [file, setFile] = useState(null);

    // Progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload a file first!");
            return;
        }

        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Box display="flex" flexGrow= {1}>
            {/* <Button variant='contained' sx={{my:1, maxWidth: '30%'}}
                onChange={handleChange} accept="/image/*">
                Choose File

            </Button> */}
            <>
            <input type="file" style={{width: '100%', height: '100%'}}/>
            </>
            
        </Box>
    );
}
export default FileUpload

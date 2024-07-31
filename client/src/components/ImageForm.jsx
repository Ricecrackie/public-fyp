
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import fileDownload from 'react-file-download';
import NumberSelectors from './NumberSelectors';
import RecoverK from './RecoverK';
//import axios from 'axios';
const MyForm = () => {
    const [text, setText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileContent(''); // Reset file content when a new file is selected
    };
    const handleFileChange = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };


    const handleFileRead = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target.result;
                setFileContent(content);
                setText(content)
            };
            reader.readAsText(selectedFile);
        }
    };

    const handleOpen = () => {
        if (selectedFile) {
            const fileUrl = URL.createObjectURL(selectedFile);
            window.open(fileUrl, '_blank');
            URL.revokeObjectURL(fileUrl);
        }
    };
    return (
        <div>


            <br />
            Split:<br />

            <form action="http://localhost:5000/split_image" method="post" enctype="multipart/form-data">
                <br />
                <p>upload a file</p>

                <input type="file" name="file" onChange={handleFileSelect} />
                <button onClick={handleOpen} disabled={!selectedFile}>
                    Open
                </button>
                <NumberSelectors />
                <Button type="submit" variant="contained" endIcon={<SendIcon />} >
                    Submit and Split!
                </Button>
            </form>
            Combine:<br />
            <form action="http://localhost:5000/combine_image" method="post" enctype="multipart/form-data">

                <input type="file" name='files' onChange={handleFileChange} multiple />
                <br />
                <RecoverK />
                <Button type="submit" variant="contained" endIcon={<SendIcon />} >
                    Combine!
                </Button>
            </form>
        </div>
    );
};

export default MyForm;
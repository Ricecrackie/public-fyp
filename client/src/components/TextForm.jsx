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

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileContent(''); // Reset file content when a new file is selected
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

  return (
    <div>
      <p>upload a file</p>
      <input type="file" onChange={handleFileSelect} />


      <button onClick={handleFileRead}>Read File</button>
      <br />
      Split:<br />

      <form action="http://localhost:5000/print" method="post">
        Or type some text below:<br />

        <TextField
          label="Text Box"
          variant="outlined"
          multiline
          rows={4}
          value={text}
          onChange={handleInputChange}
          helperText="You may enter the text secret directly if you wish"
          name="txtFile"
        />
        <br />
        <NumberSelectors />
        <Button type="submit" variant="contained" endIcon={<SendIcon />} >
          Submit and Split!
        </Button>
      </form>
      Combine:<br />
      <form action="http://localhost:5000/combine_text" method="post">
        Or type some text below:<br />

        <TextField
          label="Text Box"
          variant="outlined"
          multiline
          rows={4}
          value={text}
          onChange={handleInputChange}
          helperText="You may enter the text secret directly if you wish"
          name="txtFile"
        />
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
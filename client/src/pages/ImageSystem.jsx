import { React, useState } from 'react'
import Navbar from "../components/Navbar";
import { Typography, TextField, Button, 
    Container, Box, RadioGroup, Radio, FormControlLabel, FormLabel 
    , CircularProgress} from '@mui/material';
import DropFileZone from '../components/DropFileZone';
import { Style } from '../components/Theme';
import NumberSelectors from '../components/NumberSelectors';
import ErrorSnackBar from '../components/ErrorSnackBar';
import { SPLIT_IMAGE_FILEFORMAT, COMBINE_IMAGE_FILEFORMAT } from '../String';

const ImageSystem = () => {
    const [splitFiles, setSplitFiles] = useState([]);
    const [combineFiles, setCombineFiles] = useState([]);
    const [barErrorMsg, setBarErrorMsg] = useState("");
    const [barOpen, setBarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [algoType, setAlgoType] = useState(0);

    const FileCheck = (event) => {
        let files = splitFiles;
        if (files.length > 1) {
            console.log("too many files")
            setBarErrorMsg("Too many files, Please only upload 1 file.")
            setBarOpen(true);
        }
        console.log("is test, num of files =", files.length)
    }

    const splitCheck = (files) => {
        console.log(files)
        console.log(files[0].file.name);
        console.log("is test, num of files =", files.length)
        if (files.length > 1) {
            console.log("too many files")
            setBarErrorMsg("Too many files, Please only upload 1 file.")
            setBarOpen(true);
            return
        }
        setSplitFiles(files)
    }

    const combineCheck = (files) => {
        console.log(files);
        setCombineFiles(files);
    }

    function splitSubmit(event) {
        event.preventDefault();  // Prevent the form from submitting normally
        
        // Create a FormData object from the form
        const formData = new FormData(event.target.form);

        if (splitFiles.length < 1){
            setBarErrorMsg("Files not found. Please upload 1 file.")
            setBarOpen(true);
        }
        else {
            const fileObj = splitFiles[0];
        
            // Append the file to the formData
            formData.set('split-image-file-upload', fileObj.file);

            formData.forEach((thing,key)=> {
                console.log(thing, 'haha', key);
            });

            fetch('http://localhost:5000/split_image', {
            method: 'POST',
            body: formData
            })
            .then(setLoading(true))
            .then(response => response.json())
            .then(data => {
                console.log('gg',data)
                // Save the response data to localStorage
                localStorage.setItem('result', JSON.stringify(data));
                setLoading(false);
                //console.log(JSON.parse(localStorage.getItem('result')));
                window.location.href = '/image_result';
            })
            .catch(error => {
                let txt = error.toString();
                setBarErrorMsg(txt);
                setBarOpen(true);
                setLoading(false);
            });
        }
        
    }
    

    function combineSubmit  (event) {
        event.preventDefault();  // Prevent the form from submitting normally
    
        // Create a FormData object from the form
        const formData = new FormData();
    
        if (combineFiles.length < 2){
            setBarErrorMsg("Please upload at least 2 images in jpg/png format.")
            setBarOpen(true);
        }
        else {
            console.log(combineFiles.length);

            combineFiles.forEach(f => formData.append("combine-image-file-upload", f.file))
            /*for (let i = 0; i < combineFiles.length; ++i) {
                const fileObj = combineFiles[i];
                formData.append('combine-image-file-upload', fileObj.file);
            }*/

            formData.forEach((thing,key)=> {
                console.log(thing, 'haha', key);
            });

            fetch('http://localhost:5000/combine_image', {
                method: 'POST',
                body: formData,
            })
            .then(setLoading2(true))
            .then(response => response.json())
            .then(data => {
                // Save the response data to localStorage
                localStorage.setItem('result', JSON.stringify(data));
                setLoading2(false);
                //console.log(JSON.parse(localStorage.getItem('result')));
                window.location.href = '/image_result';
            })
            .catch(error => {
                let txt = error.toString();
                setBarErrorMsg(txt);
                setBarOpen(true);
                setLoading2(false);
            });
        }
    }
    return (
        <>
            <Navbar />
            <ErrorSnackBar 
                errorMsg={barErrorMsg} 
                open={barOpen}
                handleClose={()=>{setBarOpen(false)}}
            />
            <Container sx={Style.commonContainer}>
                <form enctype="multipart/form-data" >
                    <Box sx={Style.commonBox} id="split-session">
                        <Typography variant='h4'>Split</Typography>
                        <Typography variant='body1'>Convert your image to secret shares!</Typography>
                        <Typography variant='body1'>Please upload image file below:</Typography>
                        <DropFileZone setParentFiles={splitCheck} type_id="split-image-file-upload" accepts={SPLIT_IMAGE_FILEFORMAT} />
                        {splitFiles.map((fileObj, index) => (
                            <div key={index} style={{ position: "relative" }}>
                                <p>{fileObj.file.name}</p>
                                <img src={fileObj.src} alt={fileObj.file.name} style={{ width: '100px', height: '100px' }} />
                            </div>
                        ))}
                        <NumberSelectors />
                        <FormLabel id="algorithm-type">Algorithm Type:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="algorithm-type"
                            defaultValue="0"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="0" control={<Radio />} label="Secure" checked={algoType==0} onChange={(event) => {
                        setAlgoType(0)
                    }}/>
                            <FormControlLabel value="1" control={<Radio />} label="Fast" checked={algoType==1} onChange={(event) => {
                        setAlgoType(1)
                    }}/>
                        </RadioGroup>
                        <br></br>
                        {
                            algoType == 0 ? (<Typography variant='body1'>This algorithm will generate a random polynomial
                            for every secret every time, making the shares yielded by the same secret different. It is more secure but it is a lot slower.</Typography>) :
                                (<Typography variant='body1'>This algorithm precomputes the shares for 0 to 255 (RGB values). It is faster but it is not safe. It leaks some information about the secret.</Typography>)
                        }
                        <Box display='flex' width='30em' alignItems="center">
                            <Button sx={{ my: 2, width: '30%' }} type="submit" variant='contained' onClick={splitSubmit}>Submit</Button>
                            { loading ? <CircularProgress sx={{mx: 4}} /> : <></>}
                        </Box>
                        {/* <Typography variant='body1' id="splitErrorMsg">{errorMsg}</Typography> */}
                    </Box>
                </form>
                <form enctype="multipart/form-data">
                    <Box sx={Style.commonBox} id="combine-session">
                        <Typography variant='h4'>Combine</Typography>
                        <Typography variant='body1'>Reconstruct the original message by your shares!</Typography>
                        <Typography variant='body1'>Please upload image files below:</Typography>
                        <DropFileZone setParentFiles={combineCheck} type_id="combine-image-file-upload" accepts={COMBINE_IMAGE_FILEFORMAT} multiple={true} />
                        {combineFiles.map((fileObj, index) => (
                            <div key={index} style={{ position: "relative" }}>
                                <p>{fileObj.file.name}</p>
                                <img src={fileObj.src} alt={fileObj.file.name} style={{ width: '100px', height: '100px' }} />
                            </div>
                        ))}
                        <Box display='flex' width='30em' alignItems="center">
                            <Button sx={{ my: 2, width: '30%' }} type="submit" variant='contained' onClick={combineSubmit}>
                                Submit
                            </Button>
                            { loading2 ? <CircularProgress sx={{mx: 4}} /> : <></>}
                        </Box>
                    </Box>
                </form>
            </Container>

        </>

        // <div><Navbar />
        //     Split<br />
        //     Upload files: <FileUpload />
        //     <br />
        //     Or type some text below:
        //     <TextForm />
        // </div>
    )
}

export default ImageSystem
import { React, forwardRef, useState } from 'react'
import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload"
import DropFileZone from '../components/DropFileZone';
import { Style } from '../components/Theme';
import { Typography, TextField, Button, IconButton, Switch, Container, Box, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import NumberSelectors from '../components/NumberSelectors';
import ErrorSnackBar from '../components/ErrorSnackBar';
import { TEXT_FILEFORMAT } from '../String';

export default function TextSystem() {
    //should be error message if require > out of

    // for managing the multiple text field in combine session
    const [combineTextField, setCombineTextField] = useState([0]);
    // for collecting values form multiple text field in combine session
    const [combineTextValues, setCombineTextValues] = useState([]);
    // for the switch, default false = text entry
    const [splitSwitchChecked, setSplitSwitchChecked] = useState(false);
    const [combineSwitchChecked, setCombineSwitchChecked] = useState(false);
    const [splitFiles, setSplitFiles] = useState([]);
    const [combineFiles, setCombineFiles] = useState([]);
    var saved = false
    const [focused, setFocused] = useState([false]);
    const [splitEmpty, setSplitEmpty] = useState(false);
    const [barErrorMsg, setBarErrorMsg] = useState("");
    const [barOpen, setBarOpen] = useState(false);
    const [loading2, setLoading2] = useState(false);
    //const fileformat = ".txt";

    const addTextField = () => {
        setCombineTextField([...combineTextField, combineTextField.length]);
    }

    const combineCheck = (files) => {
        console.log(files);
        setCombineFiles(files);
    }

    const removeTextField = (indexToRemove) => {
        //let s = '[id="tf'+ (combineTextField.length-1) +'"]'
        //save2(combineTextField.length-1, document.querySelector(s).value)
        setCombineTextField(
            combineTextField.filter((field, index) => index !== indexToRemove));
        setCombineTextValues(combineTextValues.filter((field, index) => index !== indexToRemove));
        setFocused(focused.filter((field, index) => index !== indexToRemove));
    }

    const saveCombineText = (event, index) => {
        const temp = [...combineTextValues];
        temp[index] = event.target.value;
        setCombineTextValues(temp);
        console.log("saving", combineTextValues);
    }

    const save3 = (event, index) => {
        console.log("save3, saved = True");
        console.log("save3, text = ", event.target.value);
        console.log("save3, index = ", index);
        let s = '[id="tf' + (index) + '"]';
        let tf = document.querySelector(s);
        const temp = [...combineTextValues];
        temp[index] = event.target.value;
        setCombineTextValues(temp);
        tf.value = combineTextValues[index]
    }

    const focus2 = (event, index) => {
        console.log("focus2", event.target.value)
        saved = false
        console.log("focus2 set save to ", saved)
        let s = '[id="tf' + (index) + '"]'
        let tf = document.querySelector(s)
        if (!focused[index]) {
            tf.value = ""
            focused[index] = true
            console.log("first focus")
        }
        else {
            tf.value = combineTextValues[index]
            console.log("focus2", tf.value)
        }
    }

    function splitSubmit(event) {
        event.preventDefault();  // Prevent the form from submitting normally
    
        // Create a FormData object from the form
        const formData = new FormData(event.target.form);

        if (!splitSwitchChecked && (formData.get("txtField") === "")) {
            console.log("txtField is empty");
            setSplitEmpty(true);
        } 
        else if (splitSwitchChecked && (splitFiles.length === 0)){
            setBarErrorMsg("Files not found. Please upload 1 file.");
            setBarOpen(true);
        }
        else {
            setSplitEmpty(false);
            if (splitSwitchChecked) {
                const fileObj = splitFiles[0];
                // Append the file to the formData
                formData.set('split-text-file-upload', fileObj.file);
            }
            
            fetch('http://localhost:5000/print', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Save the response data to localStorage
                console.log("there");
                localStorage.setItem('result', JSON.stringify(data));
                localStorage.setItem('error', JSON.stringify(data));
                //console.log(JSON.parse(localStorage.getItem('result')));
                window.location.href = '/text_result';
            })
            .catch(error => {
                let txt = error.toString();
                setBarErrorMsg(txt);
                setBarOpen(true);
            });
        }
    }
    

    function combineSubmit  (event) {
        event.preventDefault();  // Prevent the form from submitting normally
        // Create a FormData object from the form
        const formData = new FormData(event.target.form);
        formData.delete('combine-text-file-upload');
        //const formData = new FormData();

        // Send a POST request to the server
        if (!combineSwitchChecked && (combineTextValues.length < combineTextField.length)){
            setBarErrorMsg("One or more text filed not filled!");
            setBarOpen(true);
        }
        else if (combineSwitchChecked && (combineFiles.length === 0)){
            setBarErrorMsg("Files not found. Please upload 1 or more files.");
            setBarOpen(true);
        }
        else {
            if (combineSwitchChecked) {
                console.log(combineFiles.length);
                combineFiles.forEach(f => formData.append("combine-text-file-upload", f.file));
            }
            
            formData.forEach((thing,key)=> {
                console.log(thing, 'haha', key);
            });
            
            fetch('http://localhost:5000/combine_text', {
                method: 'POST',
                body: formData,
            })
            .then(setLoading2(true))
            .then(response => response.json())
            .then(data => {
                // Save the response data to localStorage
                localStorage.setItem('result', JSON.stringify(data));
                if (data['result']) {
                    console.log(data['result']);
                    setLoading2(false);
                    window.location.href = '/text_result';
                }
            })
            .catch(error => {
                let txt = error.toString();
                setBarErrorMsg(txt);
                setBarOpen(true);
                setLoading2(false);
            });
        }
    }

    const SplitModeSwitch = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                <Typography variant='body1'>Text Entry</Typography>
                <Switch name="splitMode"
                    checked={splitSwitchChecked}
                    onChange={(event) => {
                        setSplitSwitchChecked(event.target.checked)
                    }}
                />
                <Typography variant='body1'>Upload Files</Typography>
            </Box>
        );
    }

    const CombineModeSwitch = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                <Typography variant='body1'>Text Entry</Typography>
                <Switch name="combineMode"
                    checked={combineSwitchChecked}
                    onChange={(event) => {
                        setCombineSwitchChecked(event.target.checked)
                    }}
                />
                <Typography variant='body1'>Upload Files</Typography>
            </Box>
        );
    }

    const DynamicTextField = () => {
        return (
            <>
                {combineTextField.map((field, index) => (
                    <Box display="flex" alignItems="center">
                        <TextField key={index} sx={{ my: 1 }} id={"tf" + index} name={"tf" + index} multiline variant="outlined" rows={3}
                            fullWidth label={`Press Enter for next line`}
                            defaultValue={combineTextValues[index]}
                            onFocus={(event) => focus2(event, index)}
                            onBlur={(event) => save3(event, index)}

                        />
                        {(index + 1) === combineTextField.length ? (
                            <Box>
                                <IconButton onClick={addTextField}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        ) : (<></>)
                        }
                        {index === 0 ? (<></>) : (
                            <Box>
                                <IconButton onClick={() => removeTextField(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                ))}
                <TextField name='combine-k' value={combineTextField.length} style={{ display: 'none' }} />
            </>
        );
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
                <form encType='multipart/form-data'>
                    <Box sx={Style.commonBox} id="split-session">
                        <Typography variant='h4'>Split</Typography>
                        <Typography variant='body1'>Convert your text to secret shares!</Typography>
                        <Typography variant='body1'>Please upload a txt file OR enter some text below:</Typography>
                        <SplitModeSwitch />
                        {
                            !splitSwitchChecked ? (
                                <TextField 
                                    sx={{ my: 1 }} 
                                    multiline 
                                    variant="outlined" 
                                    rows={3} 
                                    label="Press Enter for next line" 
                                    name="txtField" 
                                    error = {splitEmpty}
                                    helperText = {splitEmpty ? "Empty input, please enter some text" : ""}
                                    onClick = {()=>{setSplitEmpty(false)}}
                                    />
                            ) : (
                                <>
                                    <DropFileZone setParentFiles={setSplitFiles} type_id="split-text-file-upload" accepts={TEXT_FILEFORMAT}/>
                                    {splitFiles.map((fileObj, index) => (
                                        <div key={index} style={{ position: "relative" }}>
                                            <p>{fileObj.file.name}</p>
                                            <img src={fileObj.src} alt={fileObj.file.name} style={{ width: '100px', height: '100px' }} />
                                        </div>
                                    ))}</>
                            )
                        }
                        <NumberSelectors />
                        <Button sx={{ my: 2, maxWidth: '30%' }} variant='contained' type="submit" onClick={splitSubmit}>Submit</Button>
                        {/* <Typography variant='body1' name="splitErrorMsg"></Typography> */}
                    </Box>
                </form>
                <form encType='multipart/form-data'>
                    <Box sx={Style.commonBox} id="combine-session">
                        <Typography variant='h4'>Combine</Typography>
                        <Typography variant='body1'>Reconstruct the original message by your shares!</Typography>
                        <Typography variant='body1'>Please upload txt files OR enter some text below:</Typography>
                        <CombineModeSwitch />
                        {
                            !combineSwitchChecked ? (
                                <DynamicTextField />
                            ) : (
                                <>
                                    <DropFileZone setParentFiles={combineCheck} type_id="combine-text-file-upload" accepts={TEXT_FILEFORMAT} multiple={true}/>
                                    {combineFiles.map((fileObj, index) => (
                                        <div key={index} style={{ position: "relative" }}>
                                            <p>{fileObj.file.name}</p>
                                            <img src={fileObj.src} alt={fileObj.file.name} style={{ width: '100px', height: '100px' }} />
                                        </div>
                                    ))}
                                    </>
                            )
                        }

                        <Button sx={{ my: 2, maxWidth: '30%' }} variant='contained' type="submit"
                            onClick={combineSubmit}>
                            Submit
                        </Button>
                        { loading2 ? <CircularProgress sx={{mx: 4}} /> : <></>}
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

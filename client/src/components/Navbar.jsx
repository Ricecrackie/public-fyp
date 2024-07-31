import React, { useState, useEffect} from 'react'
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Style } from './Theme';

function Navbar() {
    
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState("");
    //const [tabValue, setTabValue] = useState("");

    // initialize the currentPage value when entering a page
    // so the tab bar can highlight corresponding value
    useEffect = () => {
        setCurrentPage(location.pathname);

        //console.log("this is location ", currentPage);
    }

    // handle the tab highlighting when clicking different tabs
    const handleChange =(event, newValue) =>{
        setCurrentPage(newValue);
        //console.log("this is", newValue);
    }

    return (
        <><Typography variant="h5" align='center'>Shamir's Secret Sharing System</Typography><Box sx={Style.navbarBox}>

            <Tabs value={currentPage} onChange={handleChange}>
                <Tab label="Home" value="/" component={Link} to="/" />
                <Tab label="text" value="/text" component={Link} to="/text" />
                <Tab label="image" value="/image" component={Link} to="/image" />
            </Tabs>
            <Box display="flex" justifyContent="center" flexGrow={1} sx={{ py: 1, }}>
            </Box>
        </Box></>

    )
}

export default Navbar
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Typography, Box } from '@mui/material';

const NumberSelectors = () => {
    const [number1, setNumber1] = useState(2);
    const [number2, setNumber2] = useState(2);

    const handleNumber1Change = (event) => {
        const value = event.target.value
        if (value === '' || (Number(value) <= Number(number2)))
            setNumber1(value);
        // Handle event for number 1 here

    };

    const handleNumber2Change = (event) => {
        const value = event.target.value
        if (value === '' || (Number(value) >= Number(number1)))
            setNumber2(value);
        // Handle event for number 2 here
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" sx={{my:2}}>
                        <Typography variant='body1'>Require </Typography>
                        <TextField type="number" sx={{ maxWidth: '30%' }} defaultValue="1" value={number1} onChange={handleNumber1Change} name="k"
                            InputProps={{
                                inputProps: { min: 2, max: 999 }
                            }}
                        />
                        <Typography variant='body1'> Out of </Typography>
                        <TextField type="number" sx={{ maxWidth: '30%' }} defaultValue="1" value={number2} onChange={handleNumber2Change} name="n"
                            InputProps={{
                                inputProps: { min: 2, max: 999 }
                            }}
                        />
                        <Typography sx={{ mt: 2 }} variant='body1'> Shares for Reconstruction </Typography>
                    </Box>
    );
};

export default NumberSelectors;
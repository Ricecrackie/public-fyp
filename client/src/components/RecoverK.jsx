import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const RecoverK = () => {
    const [recoverK, setRecoverK] = useState(0);

    const handleRecoverKChange = (event) => {
        const value = event.target.value

        setRecoverK(value);
        console.log(recoverK);

    };



    return (
        <div>
            Need <TextField
                label="RecoverK"
                variant="outlined"
                type="number"
                value={recoverK}
                onChange={handleRecoverKChange}
                inputProps={{
                    min: 0,
                    max: 100,
                    step: 1,
                }}
                InputLabelProps={{
                    style: { fontSize: '0.4rem' },
                }}
                sx={{
                    '& .MuiInputBase-input': {
                        fontSize: '0.6rem',
                        paddingTop: '0.6rem',
                        paddingBottom: '0.6rem',
                    },
                }}
                name="recoverK"
            /> Shares
        </div>
    );
};

export default RecoverK;
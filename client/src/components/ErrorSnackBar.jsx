import { Snackbar, Alert } from "@mui/material";

export default function ErrorSnackBar ({errorMsg, open, handleClose}) {

   return(
      <Snackbar 
         open={open} 
         autoHideDuration={6000} 
         onClose={handleClose}
         anchorOrigin ={{ vertical: 'top', horizontal: 'right' }}
      >
      <Alert
        //onClose={handleClose}
        severity="error"
        variant="filled"
        onClose={handleClose}
        sx={{ width: '100%' }}
      >
        {errorMsg}
      </Alert>
      </Snackbar>
   )
}
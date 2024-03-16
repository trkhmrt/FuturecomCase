import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import Alert from '@mui/material/Alert';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

export default function TransitionsSnackbar({status,message,type}) {
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

 

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
   
     
      <Snackbar
        
        open={status}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        key={state.Transition.name}
        autoHideDuration={2200}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
      >
        <Alert
    onClose={handleClose}
    severity={type}
    variant="filled"
    sx={{ width: '100%' }}
  >
    {message}
  </Alert>
      </Snackbar>
    </div>
  );
}

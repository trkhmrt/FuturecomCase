// Modal component
import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ open,onClose,header,message,id }) => {
  const [durum, setDurum] = useState(open);

  const handleClose = () => {
    setDurum(false); // Modal kapatmak için durum state'ini false yap
    onClose(); // onClose prop'u aracılığıyla, modal kapatıldığında çalıştırılacak fonksiyonu çağır
  };

  useEffect(() => {
    setDurum(open); // open prop'u değiştiğinde durum state'ini güncelle
  }, [open]);


  return (
    <Dialog
      open={durum}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}

        </DialogContentText>
      </DialogContent>
      <DialogActions>
      
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;

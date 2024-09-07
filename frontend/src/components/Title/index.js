import React, { useState } from 'react';
import { Box, Button, Paper, Typography, Modal } from '@mui/material';

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80vh',    
    boxShadow: 24,
    p: 4,
    bgcolor: '#e0e0e0',
    overflow: 'auto',
    maxHeight: '80%',
    overflowY: 'auto', 
  };
  

  export default function Title({ title, buttonText, modalContent }) {
    const [openModal, setOpenModal] = useState(false);
  
    const handleOpenModal = () => {
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
    };
  
    return (
      <Box>
        <Box component={Paper} padding={2} display='flex' alignItems='center' justifyContent='space-between'>
          <Box>
            <Typography variant='h3'>{title}</Typography>
          </Box>
          <Box width='250px'>
            <Button variant='contained' onClick={handleOpenModal}>{buttonText}</Button>
          </Box>
        </Box>
  
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            ...modalStyle,
            maxHeight: '80%',
            overflowY: 'auto',
          }}> 
            {React.cloneElement(modalContent, { handleCloseModal })}
          </Box>
        </Modal>
      </Box>
    );
  }

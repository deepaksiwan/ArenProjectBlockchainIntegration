import React from "react";
import { Box, Modal, Grid, Container, Stack, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

export const ErrorModal = ({error,open,setOpenError}) => {
    const handleClose = () => setOpenError(false);
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>

      <Container sx={{ marginTop: "10px" }}>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <Typography variant="body2" sx={{ color: '#fff', fontSize: '15px', textAlign: "center", marginTop: "5px" }}>
             {error}
            </Typography>
          </Grid>

        </Grid>
      </Container>
      <Container>
        <Stack spacing={2} direction="row" sx={{ pt: '15px' }} justifyContent={"space-between"}>
          <Button onClick={handleClose} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>cancel</Button>
        </Stack>
      </Container>
    </Box>
  </Modal>
  )
  
};

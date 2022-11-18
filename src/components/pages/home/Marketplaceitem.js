import React from "react";
import star from '../../images/star.svg'
import itemline from '../../images/itemline.svg'
import binance from '../../images/binance.svg'
import filtericonl from '../../images/filtericonl.svg'
import filtericonr from '../../images/filtericonr.svg'
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Modal, Grid ,TextField,FormControl,Select,MenuItem,Stack} from '@mui/material';
import { useStyles } from "./ItemStyle";
import item1 from '../../images/item1.svg'







const items = (props) => {
  const classes = useStyles(); 
  const Navigate = useNavigate();
  const [Payment, setPayment] = React.useState('');


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangepayment = (event) => {
    setPayment(event.target.value);
  };

  const Buynowhandler = ()=>{
   Navigate(`/Nftdetails/${props.ItemsData.id}`)

  }


  return (
    <>

      <div className="itembx"
      // onClick=
      // {()=> item(props.ItemsData.id)
      // }
      >
        <Link to={`/Nftdetails/${props.ItemsData.id}`}>
          <div className="itemimg">
            <img src={props.ItemsData.image} />
          </div>
        </Link>
        <div className="itembox-hding">
          <img src={filtericonl} />
          <div className="star">
            <img src={star} />
          </div>
          <img src={filtericonr} />
        </div>
        <div className="itemline">
          <img src={itemline} />
        </div>
        <div className="box-btm">
          <div className="box-btm-l">
            <p>{props.ItemsData.p}</p>
            <h3>{props.ItemsData.name}</h3>
          </div>
          <div className="box-btm-r">

            <p>{props.ItemsData.title}</p>
            <h3>
              <span>
                <img src={binance} />
              </span>
              {props.ItemsData.price}
            </h3>
          </div>
          <div className="editbutton" onClick={Buynowhandler}> <button>Buy Now</button> </div>
        </div>
      </div>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box className={classes.editmodal}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className={classes.textmodal}>
            Edit Option
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className={classes.desc}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Box className={classes.image} >
            <img src={item1} />
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <Typography variant="body2" sx={{ color: '#fff', fontSize: '15px' }}>
                  set Price
                </Typography>
                <TextField fontColor="red" id="outlined-basic" label="" variant="outlined" sx={{ width: '100%', border: "1px solid #fff", borderRadius: "5px", input: { color: "#fff"  } }} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography variant="body2" sx={{ color: '#fff', fontSize: '15px' }}>
                  Payment option
                </Typography>
                <Box >
                  <FormControl fullWidth sx={{ width: '100%', border: "1px solid #fff", borderRadius: "5px" }}>

                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Payment}
                      onChange={handleChangepayment}
                      sx={{ color: '#fff'}}

                    >
                      <MenuItem value={10}>MNG</MenuItem>
                      <MenuItem value={20}>MMFX</MenuItem>
                      <MenuItem value={30}>MMUSD</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
          <Stack spacing={2} direction="row" sx={{ pt: '15px' }} justifyContent={"space-between"}>
              <Button variant="contained" sx={{ fontSize: "18px", width: "150px" }}>List</Button>
              <Button onClick={handleClose} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>concel</Button>
            </Stack>

          </Box>
        </Box>
      </Modal> */}



    </>
  );
};

export default items;

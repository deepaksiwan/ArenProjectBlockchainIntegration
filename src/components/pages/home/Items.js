import React, { useState } from "react";
import star from '../../images/star.svg'
import itemline from '../../images/itemline.svg'
import binance from '../../images/binance.svg'
import filtericonl from '../../images/filtericonl.svg'
import filtericonr from '../../images/filtericonr.svg'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Modal, Grid, TextField, FormControl, Select, MenuItem, Stack } from '@mui/material';
import { useStyles } from "./ItemStyle";
import { useAccount, useContract, useContractRead, useProvider, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { OPEN_MARKETPLACE_ADDRESS } from "../../../Config";
import OPENMARKETPLACE_ABI from "../../../Config/OPENMARKETPLACE_ABI.json";
// import NFT_ABI from "../../../Config/NFT_ABI.json";
// import item1 from '../../images/item1.svg'






const items = ({ ItemsData }) => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const classes = useStyles();
  const [Payment, setPayment] = React.useState('');
  const [price, setprice] = useState(0);
  console.log("price", price)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangepayment = (event) => {
    setPayment(event.target.value);
  };



  //Payment Option edit
  const _payment = useContractRead({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    functionName: 'getERCTokenList',
  })

  let Option = _payment?.data




  const onChangeHandler = (e) => {
    setPayment(e.target.value)
  }

  const handlesaprove = async (e) => {
    let _price = e.target.value;
    setprice(_price);


  };


  //Update function call
  const { config } = usePrepareContractWrite({
    mode:"prepared",
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    functionName: 'updateListing',
    args: [{ _listingId: "4", _newPriceInWei: "6" },]
  })

  

  const { write } = useContractWrite(config)


  const Update = async () => {
    if (address && isConnected) {
      await write();
      handlesaprove();
      onChangeHandler();
    }
  }


  return (
    <>

      <div className="itembx"
      // onClick=
      // {()=> item(props.ItemsData.id)
      // }
      >
        <Link to={`/Listitems/${ItemsData.id}`}>
          <div className="itemimg">
            <img src={ItemsData.image} />
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
            <p>{ItemsData.p}</p>
            <h3>{ItemsData.name}</h3>
          </div>
          <div className="box-btm-r">

            <p>{ItemsData.title}</p>
            <h3>
              {/* <span>
                <img src={binance} />
              </span> */}
              {ItemsData.price}
            </h3>
          </div>
          <div className="editbutton" onClick={handleOpen}> <button>Edit</button> </div>

        </div>
      </div>

      <Modal
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
            <img src={ItemsData.image} />
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <Typography variant="body2" sx={{ color: '#fff', fontSize: '15px' }}>
                  set Price
                </Typography>
                <TextField
                  onChange={handlesaprove}
                  placeholder="0"
                  value={price}
                  fontColor="red" type="number" id="outlined-basic" label="" variant="outlined" sx={{ width: '100%', border: "1px solid #fff", borderRadius: "5px", input: { color: "#fff" } }} />
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
                      onChange={onChangeHandler}

                      sx={{ color: '#fff' }}

                    >
                      {Option && Option.map((v) => {
                        return (
                          <MenuItem value="MNG">{v}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Stack spacing={2} direction="row" sx={{ pt: '15px' }} justifyContent={"space-between"}>
              <Button onClick={Update} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>Update</Button>
              <Button onClick={handleClose} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>concel</Button>
            </Stack>

          </Box>
        </Box>
      </Modal>



    </>
  );
};

export default items;

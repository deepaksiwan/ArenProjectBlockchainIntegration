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
import { useAccount, useContract, useContractRead, useProvider, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { OPEN_MARKETPLACE_ADDRESS } from "../../../Config";
import OPENMARKETPLACE_ABI from "../../../Config/OPENMARKETPLACE_ABI.json";
import { useContext } from "react";
import { OpenMarketplaceContext } from "../../../context/OpenMarketplaceContext";
import { ethers } from "ethers";
// import NFT_ABI from "../../../Config/NFT_ABI.json";
// import item1 from '../../images/item1.svg'






const items = ({ ItemsData }) => {
  const { address, isConnected } = useAccount();
  const { symbolAddress } = useContext(OpenMarketplaceContext)
  const provider = useProvider();
  const classes = useStyles();
  const [Payment, setPayment] = React.useState('');
  const [price, setprice] = useState(0);
  const [priceInWei,setPriceInWei]=useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>  setOpen(false);

  // set Price
  const handlePrice = (event) => {
    const _price = event.target.value;
    setprice(_price);
    const priceInWei=ethers.utils.parseEther(_price.toString())
    setPriceInWei(priceInWei);

  };

  //set payment
  const onChangeHandler = (e,val) => {
    setPayment(val.props.value)
  }


  //Update function call
  const { config:configUpdateListing } = usePrepareContractWrite({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    functionName: 'updateListing',
    args: [ItemsData?.listingId, priceInWei ,Payment]
  })

  const { writeAsync:writeAsyncUpdateListing,data:updateListingData } = useContractWrite(configUpdateListing)
  const {isLoadingUpdateListing}=useWaitForTransaction({
    hash:updateListingData?.hash,
    onSuccess(data){
      window.location.reload();
    }
  })


    // Cancelled function call
    const { config:configCancelListing } = usePrepareContractWrite({
      address: OPEN_MARKETPLACE_ADDRESS,
      abi: OPENMARKETPLACE_ABI,
      functionName: 'cancelListing',
      args: [ItemsData?.listingId]
    })
  
    const { writeAsync:writeAsyncCancelListing,data:cancelListingData } = useContractWrite(configCancelListing)
    const {isLoading:isLoadingCancelListing}=useWaitForTransaction({
      hash:cancelListingData?.hash,
      onSuccess(data){
        window.location.reload();
      }
    })


  return (
    <>

      <div className="itembx"
      // onClick=
      // {()=> item(props.ItemsData.id)
      // }
      >
        <Link to={`/Listitems/${ItemsData.listingId}`}>
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
            <p>#{ItemsData.tokenId}</p>
            <h3>{ItemsData.name}</h3>
          </div>
          <div className="box-btm-r">

            <p>Price</p>
            <h3>
              <span>
                <img src={binance} />
              </span>
              {ItemsData.price}
            </h3>
          </div>
          {/* <div className="editbutton" onClick={handleOpen}> <button>Edit</button> </div> */}

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
                Price
                </Typography>
                <TextField
                  id="price"
                  onChange={handlePrice}
                  value={price}
                  type="number"
                  placeholder="0"
                  fontColor="#fff" label="" variant="outlined" sx={{ width: '100%', border: "1px solid #fff", marginTop: "5px", borderRadius: "5px", input: { color: "#fff", fontSize: "18px", padding: "14px !important" } }} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography variant="body2" sx={{ color: '#fff', fontSize: '15px' }}>
                  Payment Token
                </Typography>
                <Box >
                  <FormControl fullWidth sx={{ width: '100%', border: "1px solid #fff", borderRadius: "5px", input: { color: "#fff", } }}>

                    <Select

                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Payment}
                      onChange={onChangeHandler}
                      sx={{ color: '#fff', fontSize: "15px", }}

                    >
                      {symbolAddress && symbolAddress?.map(({ symbol, address }, index) => {
                        return (
                          <MenuItem key={index} value={address}>{symbol}</MenuItem>
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
              <Button onClick={async()=>{
                try{
                  await writeAsyncUpdateListing?.()
                }catch(err){
                  console.log(err)
                }
              }} disabled={isLoadingUpdateListing} variant="contained" sx={{ fontSize: "18px", width: "150px",bgcolor: "#32e0b4",fontWeight:"600" }}>Update</Button>
              <Button onClick={async()=>{
                try{
                  await writeAsyncCancelListing?.()
                }catch(err){
                  console.log(err)
                }
              }} variant="contained" sx={{ fontSize: "18px", width: "150px" ,bgcolor: "#32e0b4",fontWeight:"600"}}>Cancel</Button>
            </Stack>
            <Box sx={{textAlign: "center", marginTop:"20px"}}>
               <Button  onClick={handleClose} variant="contained" sx={{ fontSize: "18px", width: "150px", justifyContent:"center",bgcolor: "#32e0b4",fontWeight:"600" }}>Close</Button>
          </Box>
          </Box>
        </Box>
      </Modal>



    </>
  );
};

export default items;

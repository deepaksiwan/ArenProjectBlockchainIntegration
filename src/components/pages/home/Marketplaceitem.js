import React,{useEffect, useState,useContext} from "react";
import star from '../../images/star.svg'
import itemline from '../../images/itemline.svg'
import binance from '../../images/binance.svg'
import filtericonl from '../../images/filtericonl.svg'
import filtericonr from '../../images/filtericonr.svg'
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Modal, Grid, TextField, FormControl, Select, MenuItem, Stack } from '@mui/material';
import { useStyles } from "./ItemStyle";
// import item1 from '../../images/item1.svg'
import { usePrepareContractWrite,useContractWrite,useAccount ,erc20ABI,useContractRead, useContractReads,useWaitForTransaction} from "wagmi";
import { OPEN_MARKETPLACE_ADDRESS } from "../../../Config";
import OPENMARKETPLACE_ABI  from "../../../Config/OPENMARKETPLACE_ABI.json"
import {ethers}  from "ethers";
import { OpenMarketplaceContext } from "../../../context/OpenMarketplaceContext";



// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   height: "auto",
//   bgcolor: '#060F2C',
//   border: '2px solid #000',
//   boxShadow: 24,
//   padding: 4,
//   borderRadius: '15px',
// }



const Items = (props) => {
  const classes = useStyles(); 
  const { address, isConnected } = useAccount();
  const { symbolAddress } = useContext(OpenMarketplaceContext)
  const [isAproveERC20,setIsApprovedERC20]=useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>  setOpen(false);
  // const {data:signer}=useSigner()
  const [Payment, setPayment] = React.useState('');
  const [price, setprice] = useState(0);
  const [priceInWei,setPriceInWei]=useState();

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
  


    //Buy Nft function call
    // const { config } = usePrepareContractWrite({
    //   address: OPEN_MARKETPLACE_ADDRESS,
    //   abi: OPENMARKETPLACE_ABI,
    //   functionName: 'buyNFT',
    //   args: [props?.itemData.listingId,props?.ItemsData.price]
    // })
  
    // const {isLoading, writeAsync } = useContractWrite(config);

    
  // const contract = useContract({
  //   address: OPEN_MARKETPLACE_ADDRESS,
  //   abi: OPENMARKETPLACE_ABI,
  //   signerOrProvider: signer,
  // });
    // const BuyNowHandler = async()=>{
    //     // write?.( {   
    //     //   overrides:{
    //     //     value:ethers.utils.parseEther("0.0001")
    //     //   }
    //     //   });
    //       try{
    //       await writeAsync( {   
    //     overrides:{
    //       value:ethers.utils.parseEther("0.0001")
    //     }});
    //     }catch(error){
    //       console.log(error)
    //     }
    // }

    const checkAllowanceContract=useContractRead({
      address:props?.ItemsData.acceptedToken,
      abi:erc20ABI,
      functionName: 'allowance',
      args:[address,OPEN_MARKETPLACE_ADDRESS]
    })

    const { config:configApprove } = usePrepareContractWrite({
      address: props?.ItemsData.acceptedToken,
      abi: erc20ABI,
      functionName: 'approve',
      args: [OPEN_MARKETPLACE_ADDRESS, ethers.utils.parseEther(props?.ItemsData.price)]
    })
    const { writeAsync:writeAsyncApprove,data } = useContractWrite(configApprove)
    const {isLoading}=useWaitForTransaction({
      hash:data?.hash,
      onSuccess(data) {
        window.location.reload();
      },
    })

  const approveERC20=async()=>{
      try{
        await writeAsyncApprove();
      }catch(err){
        console.log(err);
      }
  }

  const buyNft=async()=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log(signer);
      provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then(async(accounts) => {
          const signer = provider.getSigner(accounts[0]);
          //Pull the deployed contract instance
      const contract = new ethers.Contract(OPEN_MARKETPLACE_ADDRESS, OPENMARKETPLACE_ABI, signer);

      const priceInWei=ethers.utils.parseEther(props?.ItemsData.price);
      const platformFee=await contract.getPlatformFee();
      console.log(platformFee);
      const buy=await contract.buyNft(props?.ItemsData.listingId,priceInWei,{value:platformFee})
      await buy.wait();

        })}) 
    }




  useEffect(()=>{
      if(address && isConnected && checkAllowanceContract?.data.toString() === ethers.utils.parseEther(props?.ItemsData.price).toString()){
        setIsApprovedERC20(true);
      }
    },[checkAllowanceContract?.data,!isAproveERC20,address])


          //Update function call
  const { config:configUpdateListing } = usePrepareContractWrite({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    functionName: 'updateListing',
    args: [props?.ItemsData.listingId, priceInWei ,Payment]
  })

  const { writeAsync:writeAsyncUpdateListing,data:updateListingData } = useContractWrite(configUpdateListing)
  const {isLoading:isLoadingUpdateListing}=useWaitForTransaction({
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
      args: [props?.ItemsData.listingId]
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

      <div className="itembx">
        <Link to={`/Listitems/${props?.ItemsData.listingId}`}>
          <div className="itemimg">
            <img src={props?.ItemsData.image} />
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
            <p>#{props?.ItemsData.tokenId}</p>
            <h3>{props?.ItemsData.name}</h3>
          </div>
          <div className="box-btm-r">

            <p>Price</p>
            <h3>
              <span>
                <img src={binance} />
              </span>
              {props?.ItemsData.price}
            </h3>
          </div>
          {/* <div className="editbutton">
          { (()=>{
            switch(props?.ItemsData.status){
              case 0:
              return <p>SOLD</p>;
              case 1:
              return <p>CANCELLED</p>;
              case 2:
              return (
              props?.ItemsData.seller!==address ?
             (isAproveERC20?
               (<button onClick={buyNft}> Buy </button>):
               (<button  onClick={approveERC20}> Approve </button>)):(
               <button  onClick={handleOpen}> Edit</button>)
              )
            }
          
          })
          ()}
           </div> */}
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
            <img src={props?.ItemsData.image} />
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
              }} disabled={isLoadingUpdateListing} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>Update</Button>
              <Button onClick={async()=>{
                try{
                  await writeAsyncCancelListing?.()
                }catch(err){
                  console.log(err)
                }
              }} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>Cancel</Button>
            </Stack>
            <Box sx={{textAlign: "center", marginTop:"20px"}}>
               <Button  onClick={handleClose} variant="contained" sx={{ fontSize: "18px", width: "150px", justifyContent:"center" }}>Close</Button>
          </Box>
          </Box>
        </Box>
      </Modal>



    </>
  );
};

export default Items;

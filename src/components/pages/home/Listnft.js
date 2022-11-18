
import React, { useEffect, useState } from "react";
import { Box, TextField, Modal, Grid, MenuItem, Container, Stack, Button, Avatar } from '@mui/material';
import styled from "@emotion/styled";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { getUserNFTByTokenURI } from "../../../api/ApiCall/GetUseNFTById";


import star from '../../images/star.svg'
import itemline from '../../images/itemline.svg'
import binance from '../../images/binance.svg'
import filtericonl from '../../images/filtericonl.svg'
import filtericonr from '../../images/filtericonr.svg'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { color, display } from "@mui/system";
// import {makeStyles} from "@mui/styles";
// import cross from "../../images/crosss.png"
// import bodybg from "../../images/bodybg.jpg"
import { erc20ABI, useSigner, useContractReads, useWaitForTransaction } from "wagmi";



import { useAccount, useContract, useContractRead, useProvider, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { OPEN_MARKETPLACE_ADDRESS, NFT_ADDRESS } from "../../../Config";
import OPENMARKETPLACE_ABI from "../../../Config/OPENMARKETPLACE_ABI.json";
import NFT_ABI from "../../../Config/NFT_ABI.json";
import item1 from '../../images/item1.svg'
import { log } from "util";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IndexKind } from "typescript";
import { ethers } from "ethers";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: "auto",
  bgcolor: '#060f2c',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
  borderRadius: '15px',
}



const Listednft = ({ tokenindex }) => {
  const { data: signer } = useSigner()
  const provider = useProvider();
  const { address, isConnected } = useAccount();
  const [price, setprice] = useState("");
  console.log("price", price)
  const [SelectValue, setSelectValue] = useState(0)
  const [Payment, setPayment] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [approved, setApproved] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Option, setOptionArray] = useState();
  const [tokenSymbol,setTokenSymbol]=useState();
  const [symbolAddress,setSymbolAddress]=useState();



  const [getMetadata, setMetadata] = useState([])
  // console.log("setMetadata", getMetadata)



  const contract = useContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    signerOrProvider: provider,
  })

  const MetaData = async () => {
    const tokenid = await contract.tokenOfOwnerByIndex(address, tokenindex)
    // console.log("tokenid", parseFloat(tokenid))
    const tokenUri = await contract.tokenURI(tokenid);
    const metaData = await getUserNFTByTokenURI(tokenUri)
    // console.log("metaData", metaData)
    setMetadata(metaData)
  }

  //IsApproval for all read function
  const IsApprovalForAll = useContractRead({
      address: NFT_ADDRESS,
      abi: NFT_ABI,
      functionName: 'isApprovedForAll',
      args: [address, OPEN_MARKETPLACE_ADDRESS]
  })

  useEffect(() => {
    if (address) {
      MetaData?.()
      setApproved(IsApprovalForAll?.data)
      // checkApprove()
    }
  }, [tokenindex])



  const PaymentOptionContract = useContractRead({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    functionName: 'getERCTokenList',
  })

  useEffect(()=>{
    if(PaymentOptionContract?.data){
      setOptionArray([...PaymentOptionContract?.data])
    }
  },[])

  const symbol = useContractReads({
    contracts: Option?.map((singleAddress)=>{
    return{
        address: singleAddress,
        abi: erc20ABI,
        functionName: 'symbol',
    }
  }
  ),
}
)
  useEffect(()=>{
    if(symbol?.data?.length>0){
      const arraySymbol=[]
      setTokenSymbol(symbol?.data)
      for(let i=0;i<symbol?.data?.length;i++){
        arraySymbol.push({symbol:symbol?.data?.[i],address:Option?.[i]})
      }
      setSymbolAddress(arraySymbol);
    }

  },[symbol?.data,Option])


  //Write function call  setApprovalForAll
  const { config } = usePrepareContractWrite({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'setApprovalForAll',
    args: [OPEN_MARKETPLACE_ADDRESS, false]
  })
  const { writeAsync, isSuccess, data } = useContractWrite(config)
  // console.log("data", data)



  const { isLoading, isError } = useWaitForTransaction({
    hash: data?.hash
  })





  const handlesaprove = (event) => {
    let _price = event.target.value;
    _price=ethers.utils.parseEther(_price.toString())
    setprice(_price);


  };

  //set payment
  const onChangeHandler = (e,val) => {
    setPayment(val.props.value)
  }

  const Aproved = async () => {
    if (address && isConnected) {
      await writeAsync()
      checkApprove();
    }

  }


  //Write function call  listing
  // OpenMarketplaceWriteContract
  console.log(price);
  const {config:listNftConfig} = usePrepareContractWrite({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    functionName:"listNft",
    args:[NFT_ADDRESS,getMetadata?.edition,Payment??"0x596ef770d6bc5944f099ec5200f43f079241b2b0",price],
    chainId:97

  })



  const {writeAsync:writeAsyncListNft,data:ListNftData}=useContractWrite(listNftConfig)




  return (
    <>
      <div className="itembx"
      >
        <Link to={`/Nftdetails/${getMetadata?.edition}`}>
          <div className="itemimg">
            <img src={item1} />
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
            <p>{getMetadata?.edition}</p>
            <h3>{getMetadata?.name}</h3>
          </div>
          <div className="box-btm-r" >
            <h3>
              <button className="buttonstyle" onClick={handleOpen} >
                List
              </button>

            </h3>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {/* <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "#fff", fontSize: "15px" }}>
              NFT NAME
            </Typography> */}
          <Box sx={{ textAlign: "center", marginTop: "10px" }}>
            <img src={item1} style={{ width: "200px", height: "200px" }} />
          </Box>
          <Container sx={{ marginTop: "10px" }}>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <Typography variant="body2" sx={{ color: '#fff', fontSize: '15px', textAlign: "center", marginTop: "5px" }}>
                  set Price
                </Typography>
                <TextField
                  id="price"
                  onChange={handlesaprove}
                  value={price}
                  type="number"
                  placeholder="0"
                  fontColor="#fff" label="" variant="outlined" sx={{ width: '100%', border: "1px solid #fff", marginTop: "5px", borderRadius: "5px", input: { color: "#fff", fontSize: "18px", padding: "14px !important" } }} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography variant="body2" sx={{ color: '#fff', fontSize: '15px', textAlign: "center", marginTop: "5px" }}>
                  Payment option
                </Typography>
                <Box sx={{ marginTop: "5px" }}>
                  <FormControl fullWidth sx={{ width: '100%', border: "1px solid #fff", borderRadius: "5px", input: { color: "#fff", } }}>

                    <Select

                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Payment}
                      onChange={onChangeHandler}
                      sx={{ color: '#fff', fontSize: "15px", }}

                    >
                      {symbolAddress && symbolAddress?.map(({symbol,address},index) => {
                        return (
                          <MenuItem key={index} value={address}>{symbol}</MenuItem>
                        )
                      })}

                    </Select>
                  </FormControl>

                </Box>
              </Grid>

            </Grid>
          </Container>
          {/* <Container>
            <Stack spacing={2} direction="row" sx={{ pt: '15px' }} justifyContent={"space-between"}>
              {IsApprovalForAll?
                (<Button onClick={Aproved} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>Approve</Button>)
                :
                (<Button variant="contained" sx={{ fontSize: "18px", width: "150px" }}>List</Button>)

              }
              <Button onClick={handleClose} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>cancel</Button>
            </Stack>

          </Container> */}
          <Container>
            <Stack spacing={2} direction="row" sx={{ pt: '15px' }} justifyContent={"space-between"}>
              {!approved ?
                (<Button onClick={Aproved} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>Approve</Button>)
                :
                (<Button onClick={writeAsyncListNft} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>List</Button>)
    

              }
              <Button onClick={handleClose} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>cancel</Button>
            </Stack>
          </Container>
        </Box>
      </Modal>


    </>
  );
};

export default Listednft;

import React, { useState, useEffect, useContext } from "react";
import Header from "../header.js";
import Footer from "../Footer";
import hdingarrowleft from "../../images/hdingarrowleft.svg";
import hdingarrowright from "../../images/hdingarrowright.svg";
import itemimg from "../../images/itemimg.svg";
import binance from "../../images/binance.svg";
import orderl from "../../images/orderl.svg";
import orderr from "../../images/orderr.svg";
import skillimg from "../../images/skillimg.svg";
import Accordian from "./Accordian";
import img1 from "../../images/img1.png";
import { useParams, useNavigate } from 'react-router-dom'
import ItemsData from "../home/ItemsData.js";
import { useAccount, useContractRead, useProvider, useContract, erc20ABI, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { NFT_ADDRESS, OPEN_MARKETPLACE_ADDRESS } from "../../../Config";
import NFT_ABI from "../../../Config/NFT_ABI.json";
import OPENMARKETPLACE_ABI from "../../../Config/OPENMARKETPLACE_ABI.json"
import item1 from "../../images/item1.svg"
import { OpenMarketplaceContext } from "../../../context/OpenMarketplaceContext.js";
import { Box, TextField, Modal, Grid, MenuItem, Container, Stack, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { ethers } from "ethers";
import { useStyles } from "../home/ItemStyle.js";
import star from '../../images/star.svg'
import itemline from '../../images/itemline.svg'
import filtericonl from '../../images/filtericonl.svg'
import filtericonr from '../../images/filtericonr.svg'
import { useQuery } from "react-query";
import { getUserNFTByTokenURI } from "../../../api/ApiCall/GetUseNFTById.js";
import { ErrorModal } from "../home/ErrorModal.js";
import { isNull } from "util";
import Loader from "../home/Loader"

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

function Listitems() {
  const provider = useProvider()
  const classes = useStyles();
  const { id: listingId } = useParams();
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { symbolAddress } = useContext(OpenMarketplaceContext)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Payment, setPayment] = React.useState('');
  const [price, setprice] = useState(0);
  const [priceInWei, setPriceInWei] = useState();
  const [listingData, setListingData] = useState();
  const [isAproveERC20, setIsApprovedERC20] = useState(false);
  const [tokenUri, setTokenUri] = useState("");
  const [formatPrice, setFormatPrice] = useState()
  const [erc20Blanace, setErc20Blanace] = useState();
  const [openError, setOpenError] = React.useState(false);
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);
  const [error,setError]=useState("")

  // set Price
  const handlePrice = (event) => {
    const _price = event.target.value;
    setprice(_price);
    const priceInWei = ethers.utils.parseEther(_price.toString())
    setPriceInWei(priceInWei);

  };

  //set payment
  const onChangeHandler = (e, val) => {
    setPayment(val.props.value)
  }
  // console.log("address24234", address)


  //  getListingDetailByIdContract listingId
  const getListingDetailByIdContract = useContractRead({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    functionName: 'getListedNftById',
    args: [listingId]
  })



  const contract = useContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    signerOrProvider: provider,
  })
  const tokenUriFunc = async (tokenId) => {
    const token = await contract.tokenURI?.(tokenId);
    setTokenUri(token);
  }
  useEffect(() => {
    tokenUriFunc?.(Number(listingData?.tokenId))
  }, [listingData?.tokenId])

  const { data } = useQuery(["getUserNFTByTokenURI", tokenUri], () => getUserNFTByTokenURI(tokenUri), {
    onError: (data) => {
      
      setError(error)
  
    }
  })



  const checkBalanceOf = useContractRead({
    address: listingData?.acceptedToken,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address],
    formatUnits: "ether"
  })

  useEffect(() => {
    if (checkBalanceOf?.data) {
      const format = ethers.utils.formatUnits(checkBalanceOf?.data.toString(), "ether")
      setErc20Blanace(format)
    }

  }, [address, listingData?.acceptedToken, isConnected, listingId])


  const checkAllowanceContract = useContractRead({
    address: listingData?.acceptedToken,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address, OPEN_MARKETPLACE_ADDRESS],
  })

  useEffect(() => {
    if (address && isConnected && checkAllowanceContract?.data) {
      const price = Number(listingData?.priceInWei.toString())
      const allowance = Number(checkAllowanceContract?.data.toString())
      if (allowance > price) {
        setIsApprovedERC20(true);
      }

    }
  }, [checkAllowanceContract?.data, address, isConnected, listingData?.priceInWei])


  const { config: configApprove } = usePrepareContractWrite({
    address: listingData?.acceptedToken,
    abi: erc20ABI,
    functionName: 'approve',
    args: [OPEN_MARKETPLACE_ADDRESS, ethers.utils.parseEther("1000000")]
  })
  const { writeAsync: writeAsyncApprove, data: approveData } = useContractWrite(configApprove)
  const { isLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess(data) {
      window.location.reload();
      setIsApprovedERC20(true)
    },
    onError(error){
      setError(error)
    }
  })

  const approveERC20 = async () => {
    try {
      await writeAsyncApprove?.();

      const price = Number(listingData?.priceInWei.toString())
      const allowance = Number(checkAllowanceContract?.data.toString())
      if (allowance > price) {
        setIsApprovedERC20(true);
      }


    } catch (err) {
      setError(err)
    }
  }

  const buyNft = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then(async (accounts) => {
          const signer = provider.getSigner(accounts[0]);
          //Pull the deployed contract instance
          const contract = new ethers.Contract(OPEN_MARKETPLACE_ADDRESS, OPENMARKETPLACE_ABI, signer);

          const priceInWei = listingData?.priceInWei;
          const platformFee = await contract.getPlatformFee();
          const buy = await contract.buyNft(listingId, priceInWei, { value: platformFee })
          await buy.wait();

        }).catch((error)=>{ console.log(new Error(error?.message)); setError(JSON.stringify(error?.message))})
      }).catch((error)=>{setError(JSON.stringify(error?.message))})
    } catch (err) {
      
      
    }
  }

  // const platformFee = useContractRead({
  //   address: OPEN_MARKETPLACE_ADDRESS,
  //   abi: OPENMARKETPLACE_ABI,
  //   functionName: 'getPlatformFee'
  // })

  //   // Buy Nft function call
  //   const { config } = usePrepareContractWrite({
  //     address: OPEN_MARKETPLACE_ADDRESS,
  //     abi: OPENMARKETPLACE_ABI,
  //     functionName: 'buyNFT',
  //     args: [props?.itemData.listingId,props?.ItemsData.price],
  //     overrides:{
  //       value:ethers.utils.parseEther("0.0001")
  //     }
  //   })
  
    // const { writeAsync :writeAsyncBuyNft} = useContractWrite(config);




  //Update function call
  const { config: configUpdateListing } = usePrepareContractWrite({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    functionName: 'updateListing',
    args: [listingId, priceInWei, Payment]
  })

  const { writeAsync: writeAsyncUpdateListing, data: updateListingData } = useContractWrite(configUpdateListing)
  const { isLoading: isLoadingUpdateListing } = useWaitForTransaction({
    hash: updateListingData?.hash,
    onSuccess(data) {
      window.location.reload();
    },
    onError(error){
      setError(error)
    }
  })

  // Cancelled function call
  const { config: configCancelListing } = usePrepareContractWrite({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    functionName: 'cancelListing',
    args: [listingId]
  })

  const { writeAsync: writeAsyncCancelListing, data: cancelListingData } = useContractWrite(configCancelListing)
  const { isLoading: isLoadingCancelListing } = useWaitForTransaction({
    hash: cancelListingData?.hash,
    onSuccess(data) {
      window.location.reload();
    }
    ,
    onError(error){
      setError(error)
    }
  })

  useEffect(() => {
    if (listingId && getListingDetailByIdContract?.data) {
      setListingData(getListingDetailByIdContract?.data)
      const price = getListingDetailByIdContract?.data.priceInWei;
      const formatPrice = ethers.utils.formatUnits(price?.toString(), "ether")
      setFormatPrice(formatPrice)
      setprice(parseInt(formatPrice))
      // console.log(getListingDetailByIdContract?.data);
      setPayment(getListingDetailByIdContract?.data.acceptedToken)
      // setAllowance(checkAllowanceContract?.data)
    }
  }, [listingId, address, getListingDetailByIdContract?.data, isConnected, checkAllowanceContract?.data, isLoadingCancelListing, isLoadingUpdateListing])



  return (
    <div>
      <div className="topbg">
        <Header />

        <div className="item-main-wrp" >
          <div className="container">
            <div className="item-wrp">
              <div className="item-hding">
                <img src={hdingarrowleft} />
                <h1>{data?.name}</h1>
                <img src={hdingarrowright} />
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="item-left-cont">
                      <div className="item-img">
                        <img src={item1} alt="" />
                      </div>
                      <ul className="item-left-list">
                        <li>
                          <h3>
                            Level: <strong>NA</strong>
                          </h3>
                          <div className="itemlist-line"></div>
                        </li>
                        <li>
                          <h3>
                            Faction: <strong>NA</strong>
                          </h3>
                          <div className="itemlist-line"></div>
                        </li>
                        <li>
                          <h3>
                            Class: <strong>NA</strong>
                          </h3>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="item-right-cont">
                      <div className="character-box">
                        <div className="character-b-cont">
                          <p>{data?.name}</p>
                          <h3>#{listingData?.tokenId.toString()}</h3>
                        </div>
                        <div className="character-b-cont-c">
                          <p>Price</p>
                          <h3>
                            <span>
                              <img src={binance} />
                            </span>
                            {formatPrice ? formatPrice : <p>{" "}</p>}
                          </h3>
                        </div>
                        <>
                          {
                            address && isConnected ?
                              listingData?.status == 0 ?
                                <div className="ordernow-butn" >
                                  <a href="#">
                                    <img src={orderl} />
                                    <p>SOLD</p>
                                    <img src={orderr} />
                                  </a>
                                </div>
                                :
                                listingData?.status == 1 ?
                                  <div className="ordernow-butn" >
                                    <a href="#">
                                      <img src={orderl} />
                                      <p>CANCELLED</p>
                                      <img src={orderr} />
                                    </a>
                                  </div>
                                  :
                                  listingData?.status == 2 ?

                                    listingData?.seller !== address ?
                                      isAproveERC20 ? (
                                        !error ? (<div className="ordernow-butn" onClick={buyNft}>
                                          <a href="#">
                                            <img src={orderl} />
                                            <p > Buy </p>

                                            <img src={orderr} />
                                          </a>
                                        </div>) : (
                                          <div className="ordernow-butn" onClick={handleOpenError}>
                                            <a href="#">
                                              <img src={orderl} />
                                              <p > Buy </p>

                                              <img src={orderr} />
                                            </a>

                                          </div>
                                        )
                                      )
                                        :
                                        <div className="ordernow-butn" onClick={async () => {
                                          try {
                                            await approveERC20();
                                          } catch (err) {
                                            console.log(err);
                                          }
                                        }}>
                                          <a href="#">
                                            <img src={orderl} />
                                            <p > Approve </p>      <img src={orderr} />
                                          </a>
                                        </div> : (
                                        <div className="ordernow-butn" onClick={handleOpen}>
                                          <a href="#">
                                            <img src={orderl} />
                                            <p > Edit</p>     <img src={orderr} />
                                          </a>
                                        </div>)

                                    :
                                    <></>
                              : <div className="ordernow-butn" onClick={openConnectModal}>
                                <a href="#">
                                  <img src={orderl} /><p>Connect</p><img src={orderr} />
                                </a>
                              </div>
                          }
                        </>
                      </div>
                      <div className="skill-hding">
                        <h3>SKILLS</h3>
                        <img src={skillimg} />
                      </div>
                      <div className="wrp-faq">
                        <div className="row">
                          <div className="col-lg-12">
                            <div class="wrapper">
                              <div class="block one">
                                <div class="block__item block__items2">
                                  <div class="block__title1">
                                    {/* Active skill: <span>Mana regeneration</span> */}
                                  </div>
                                  <div class="block__title1">
                                    NA
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="skill-hding">
                        <h3>STATS</h3>
                        <img src={skillimg} />
                      </div>
                      <div className="stats-main-wrp">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>Character</h3>
                              <p>{data?.attributes?.[0]?.Character}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>Category</h3>
                              <p>{data?.attributes?.[1]?.Category}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>Rank</h3>
                              <p>{data?.attributes?.[2]?.Rank}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>Hp</h3>
                              <p>{data?.attributes?.[3]?.Hp}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>Atk</h3>
                              <p>{data?.attributes?.[4]?.Atk}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>Speed</h3>
                              <p>{data?.attributes?.[5]?.Speed}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>Block</h3>
                              <p>{data?.attributes?.[6]?.Block}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>Crit</h3>
                              <p>{data?.attributes?.[7]?.Crit}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>Dodge</h3>
                              <p>{data?.attributes?.[8]?.Dodge}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box className={classes.editmodal}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2" className={classes.textmodal}>
              Edit Trade
            </Typography> */}
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }} className={classes.desc}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            {/* <Box className={classes.image} >
              <img src={itemimg} />
            </Box> */}
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
                    <FormControl fullWidth sx={{ width: '100%', border: "1px solid #fff", borderRadius: "5px", marginTop: "5px", input: { color: "#fff", } }}>

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
               { !error ? (<Button onClick={async () => {
                  try {
                    await writeAsyncUpdateListing?.()
                  } catch (err) {
                    setError(err)
                  }
                }} disabled={isLoadingUpdateListing} variant="contained" sx={{ fontSize: "18px", width: "150px",bgcolor: "#32e0b4",fontWeight:"600","&:hover":{bgcolor:"#32e0b4 !important",opacity:"0.8"} }}>
                {isLoadingUpdateListing ? (<Loader/>): "Update"}
                </Button>):(
                  <Button onClick={handleOpenError} variant="contained" sx={{ fontSize: "18px", width: "150px",bgcolor: "#32e0b4",fontWeight:"600","&:hover":{bgcolor:"#32e0b4 !important",opacity:"0.8"} }}>
                {isLoadingUpdateListing ? (<Loader/>): "Update"}
                </Button>
                )
               }
                {!error ? (<Button onClick={async () => {
                  try {
                    await writeAsyncCancelListing?.()
                  } catch (err) {
                    // setError(err)
                  }
                }} disabled={isLoadingCancelListing} variant="contained" sx={{ fontSize: "18px", width: "150px",bgcolor: "#32e0b4",fontWeight:"600","&:hover":{bgcolor:"#32e0b4 !important",opacity:"0.8"}}}>
                {isLoadingCancelListing?(<Loader/>):"Cancel"}
                </Button>):(
                  <Button onClick={handleOpenError} variant="contained" sx={{ fontSize: "18px", width: "150px",bgcolor: "#32e0b4",fontWeight:"600","&:hover":{bgcolor:"#32e0b4 !important",opacity:"0.8"}}}>
                {isLoadingCancelListing?(<Loader/>):"Cancel"}
                </Button>
                )}
              </Stack>
              <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                <Button onClick={handleClose} variant="contained" sx={{ fontSize: "18px", width: "150px", justifyContent: "center" ,bgcolor: "#32e0b4",fontWeight:"600","&:hover":{bgcolor:"#32e0b4 !important",opacity:"0.8"}}}>Close</Button>
              </Box>
            </Box>
          </Box>
        </Modal>


        <Modal
          open={openError}
          onClose={handleCloseError}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>

            <Container sx={{ marginTop: "10px" }}>
              <Grid container spacing={2} sx={{textAlign:"center"}}>
                <Grid item lg={12} xs={12} >
                  <Typography variant="body2" sx={{ color: '#fff', fontSize: '15px', textAlign: "center !important", marginTop: "5px" }}>
                    {"Some Error Occurred"}
                  </Typography>
                </Grid>

              </Grid>
            </Container>
            <Container>
              <Stack spacing={2} direction="row" sx={{ pt: '15px' }} justifyContent={"center"}>
                <Button onClick={handleCloseError} variant="contained" sx={{ fontSize: "18px", width: "150px",bgcolor: "#32e0b4",fontWeight:"600","&:hover":{bgcolor:"#32e0b4 !important",opacity:"0.8"}}}>cancel</Button>
              </Stack>
            </Container>
          </Box>
        </Modal>


        <Footer />
      </div>
    </div>
  );
}

export default Listitems;
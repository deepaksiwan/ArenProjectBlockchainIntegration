import React, { useState, useEffect,useContext } from "react";
import Header from "../header.js";
import Footer from "../Footer";
import hdingarrowleft from "../../images/hdingarrowleft.svg";
import hdingarrowright from "../../images/hdingarrowright.svg";
import orderl from "../../images/orderl.svg";
import orderr from "../../images/orderr.svg";
import skillimg from "../../images/skillimg.svg";
import { useQuery } from "react-query";
import { useParams,useNavigate } from 'react-router-dom'
import { useAccount, useContractRead, useProvider, useContract, usePrepareContractWrite, useContractWrite ,useWaitForTransaction} from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { getUserNFTByTokenURI } from "../../../api/ApiCall/GetUseNFTById";
import { NFT_ADDRESS, OPEN_MARKETPLACE_ADDRESS } from "../../../Config";
import NFT_ABI from "../../../Config/NFT_ABI.json";
import OPENMARKETPLACE_ABI  from "../../../Config/OPENMARKETPLACE_ABI.json"
import item1 from "../../images/item1.svg"
import { OpenMarketplaceContext } from "../../../context/OpenMarketplaceContext.js";
import { Box, TextField, Modal, Grid, MenuItem, Container, Stack, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
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

function Listitems() {
  const provider = useProvider()
  const navigate=useNavigate()
  const { id: tokenId } = useParams();
  const [tokenUri, setTokenUri] = useState("")
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { symbolAddress } = useContext(OpenMarketplaceContext)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>  setOpen(false);
  // const {data:signer}=useSigner()
  const [Payment, setPayment] = React.useState('');
  const [price, setprice] = useState(0);
  const [priceInWei,setPriceInWei]=useState();
  const [approved, setApproved] = React.useState(false);

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
  // console.log("address24234", address)



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
    tokenUriFunc?.(tokenId)
  }, [tokenId])

  const { data } = useQuery(["getUserNFTByTokenURI", tokenUri], () => getUserNFTByTokenURI(tokenUri), {
    onError: (data) => {
      console.log({ data });
    }
  })
  


   //IsApproval for all read function
   const IsApprovalForAll = useContractRead({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'isApprovedForAll',
    args: [address, OPEN_MARKETPLACE_ADDRESS]
})

useEffect(()=>{
  if(address && isConnected && IsApprovalForAll?.data){
    setApproved(IsApprovalForAll?.data)
  }
},[IsApprovalForAll?.data,approved,address])



  //Write function call  setApprovalForAll
  const { config:configSetApprovalForAll } = usePrepareContractWrite({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'setApprovalForAll',
    args: [OPEN_MARKETPLACE_ADDRESS, true]
  })
  const { writeAsync:writeAsyncSetApprovalForAll, data :setApprovalForAllData} = useContractWrite(configSetApprovalForAll)

  const { isLoading:isLoadingSetApprovalForAll,isSuccess:isSuccessSetApprovalForAll} = useWaitForTransaction({
    hash: setApprovalForAllData?.hash
  })

  const Aproved = async () => {
    if (address && isConnected) {
      await writeAsyncSetApprovalForAll()
    }

  }


  // Write function call  listing
  // OpenMarketplaceWriteContract
  const {config:configListNft} = usePrepareContractWrite({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    functionName:"listNft",
    args:[NFT_ADDRESS,tokenId,Payment,priceInWei],
    chainId:97

  })



  const {writeAsync:writeAsyncListNft,data:ListNftData}=useContractWrite(configListNft);
  const { isLoading:isLoadingListNftData,isSuccess:isSuccessListNft} = useWaitForTransaction({
    hash: ListNftData?.hash,
    onSuccess(data){
      navigate("/Mynft");
    }
  })

 


  return (
    <div>
      <div className="topbg">
        <Header />

        <div className="item-main-wrp" >
          <div className="container">
            <div className="item-wrp">
              <div className="item-hding">
                <img src={hdingarrowleft} />
                <h1>WEAPON NAME</h1>
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
                            Level: <strong>5</strong>
                          </h3>
                          <div className="itemlist-line"></div>
                        </li>
                        <li>
                          <h3>
                            Faction: <strong>ETHERIA</strong>
                          </h3>
                          <div className="itemlist-line"></div>
                        </li>
                        <li>
                          <h3>
                            Class: <strong>MAGE</strong>
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
                          <h3>#{tokenId}</h3>
                        </div>
                        <div className="character-b-cont-c">
                          {/* <p>Price</p> */}
                          <h3>
                            {/* <span>
                              <img src={binance} />
                            </span> */}
                          </h3>
                        </div>
                        <div className="ordernow-butn" onClick={openConnectModal}>
                          <a href="#">
                            <img src={orderl} />
                            {address && isConnected ? <p onClick={handleOpen}>List</p> : <p>Connect</p>}
                            <img src={orderr} />
                          </a>
                        </div>
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
                                    Active skill: <span>Mana regeneration</span>
                                  </div>
                                  <div class="block__title1">
                                    Donec urna leo, efficitur et nisi et,
                                    facilisis sollicitudin nisl. Nunc id quam
                                    lorem. Duis congue in sem quis lacinia.
                                    Mauris leo orci, congue ultricies justo id,
                                    pretium sollicitudin ipsum. Curabitur
                                    fringilla tortor sed dui tincidunt viverra.
                                    <br />
                                    <br />
                                    Nunc id quam lorem. Duis congue in sem quis
                                    lacinia. Mauris leo orci, congue ultricies
                                    justo id, pretium sollicitudin ipsum.
                                    Curabitur fringilla tortor sed dui tincidunt
                                    viverra.
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
        <Box sx={style}>

          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "#fff", fontSize: "15px" }}>
             {data?.name}
            </Typography>
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
                  onChange={handlePrice}
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
          <Container>
            <Stack spacing={2} direction="row" sx={{ pt: '15px' }} justifyContent={"space-between"}>
              {!approved ?
                (<Button onClick={Aproved} disabled={isLoadingSetApprovalForAll} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>Approve</Button>)
                :
                (<Button onClick={async()=>{
                  try{
                    await writeAsyncListNft();
                  }catch(err){
                    console.log(err)
                  }
                 
                  }
                  } disabled={isLoadingListNftData} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>List</Button>)
              }
              <Button onClick={handleClose} variant="contained" sx={{ fontSize: "18px", width: "150px" }}>cancel</Button>
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
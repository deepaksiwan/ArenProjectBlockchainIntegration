import React, { useState, useEffect } from "react";
import Header from "../header.js";
import Footer from "../Footer";
import { getListNFT } from "../../../api/ApiCall/Moralis/getAllNFT.js";
import { getUserNFTByTokenURI } from "../../../api/ApiCall/GetUseNFTById";
import { useQuery } from "react-query";
import ItemsData from "./ItemsData.js";
import Listnft from "./Listnft.js";
import Items from "./Items.js"
import { useAccount, useContract, useContractRead, useProvider,usePrepareContractWrite, useContractWrite,useSigner} from 'wagmi'
import { NFT_ADDRESS, OPEN_MARKETPLACE_ADDRESS } from "../../../Config";
import NFT_ABI from "../../../Config/NFT_ABI.json";
import OPENMARKETPLACE_ABI from "../../../Config/OPENMARKETPLACE_ABI.json"
import item1 from '../../images/item1.svg';
import Loader from "../home/Loader.js"
import { ethers } from "ethers";
import { Typography } from "@mui/material";
//import { Balance, PanoramaFishEyeSharp } from "@mui/icons-material";

const allCategory = [... new Set(ItemsData.map((e) => e.category))]
console.log(allCategory)

function Mynft() {
  const {data:signer}=useSigner({chainId:97});
  const provider = useProvider();
  const [ListNft, setListNft] = useState([])
  const { address, isConnected } = useAccount();
  const [balance, setbalance] = useState(null)
  const [NFTBalance, setNFTBalance] = useState(0)
  const [getMetadata, setgetMetadata] = useState([])
  const [tokenIdList, settokenIdList] = useState([]) 
  const [ListedallNftData,setListedAllNftData]=useState([])
  const [ListedallNftDataFetched, setListedAllNftDataFetched] = useState(false);




  const [age1, setAge1] = useState("");
  const handleChange1 = (event) => {
    setAge1(event.target.value);
  };
  const [age2, setAge2] = useState("");
  const handleChange2 = (event) => {
    setAge2(event.target.value);
  };
  const [age3, setAge3] = useState("");
  const handleChange3 = (event) => {
    setAge3(event.target.value);
  };


  //  filter//
  const [data, setData] = useState(ItemsData)
  const filterItem = (categoryItem) => {
    const updatedItem = ItemsData.filter((e) => {
      return e.category === categoryItem
    })

    setData(updatedItem)
    // console.log("s", updatedItem)
  }

  //function call with wagmi
  const contract = useContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    signerOrProvider: provider
  })

  const Balance = async () => {
    const balanceOf = await contract.balanceOf(address)
    return balanceOf

  }

 

  const metadatafunc = async () => {
    const balance = await Balance();
    let _temp = [] ;
        for (let i = 0; i < Number(balance); i++) {
          _temp.push({count: i})
          
    }

    setNFTBalance(_temp);

  }



  useEffect(() => {
    if(address && isConnected){
      metadatafunc();
    }
  }, [address,isConnected]);

  const geAllMyListedNftContract=useContract({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    signerOrProvider:signer
})
  //geAllListedNftByOwner
const geAllListedNftByOwner = async()=>{
  const transaction = await geAllMyListedNftContract.geMyListedNft();
   //console.log("transaction", transaction);
  const items = await Promise.all(transaction.map(async(item)=>{
  //  console.log("item",item);
    const tokenURI = await contract.tokenURI(item.tokenId);
     //console.log("tokenURI", tokenURI);
    const meta = await getUserNFTByTokenURI(tokenURI);
    //console.log(item.listingId,"meta");
    let price = ethers.utils.formatUnits(item?.priceInWei.toString(), 'ether');
    console.log("price", price)
    let itemList={
      listingId:item?.listingId.toString(),
      nftAddress:item?.nftAddress,
      tokenId:item?.tokenId.toString(),
      price:price,
      seller:item?.seller,
      acceptedToken:item?.acceptedToken,
      status:item?.status,
      name:meta.name,
      edition:meta.edition,
       image:item1
    }
    // console.log("listitem", itemList)
    return itemList;
  }))
  // console.log("items", items)
  setListedAllNftDataFetched(true)
  setListedAllNftData(items)
}
useEffect(()=>{

  if(address && isConnected){
    geAllListedNftByOwner?.();
  }
},[signer])

  //Write function edit
  




  return (
    <div>
      <div className="topbg">

        <Header />
        <div className="home-main-wrp">
          <div className="container">
            <div className=" row mb-5" >
              <div className="header col-md-3">
                <h6>Listed nft</h6>
              </div>
            </div>

            <div className="home-wrp row">
              <div className="filter-item col-md-12 col-sm-12">
                <div className="row">
                  { ListedallNftData.length>0 ? (ListedallNftData.map((e, index) => {
                    return (
                      <div className="col-lg-3 pb-4 col-md-6">
                        <Items ItemsData={e} key={index} />
                      </div>
                    );
                  })):
                ListedallNftDataFetched ? 
                    <Typography>No NFT Listed</Typography>
                  : 
                  (
                    <Loader/>
                  )
                  }
                </div>
              </div>
            </div>
            <div className=" row mb-5" >
              <div className="header col-md-3">
                <h6>List your Nft</h6>
              </div>
            </div>

            {/* List Nft */}
            <div className="home-wrp row">
              <div className="filter-item col-md-12 col-sm-12 mt-10px">
                <div className="row justify-content-center">
                  {/* {NFTBalance.length}sss */}
                  {NFTBalance?.length >0 ?  (NFTBalance?.map((v, index) => {
                    return (
                      <div className="col-lg-3 pb-4 col-md-6">
                       <Listnft tokenindex={v.count} key={index} /> 
                      </div>
                    );
                  })
                  ):(
                    <Loader />
                  )}
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Mynft;

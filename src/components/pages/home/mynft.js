import React, { useState, useEffect } from "react";
import Header from "../header.js";
import Footer from "../Footer";
import { getListNFT } from "../../../api/ApiCall/Moralis/getAllNFT.js";
import { getUserNFTByTokenURI } from "../../../api/ApiCall/GetUseNFTById";
import { useQuery } from "react-query";
import ItemsData from "./ItemsData.js";
import Listnft from "./Listnft.js";
import Items from "./Items.js"
import { useAccount, useContract, useContractRead, useProvider,usePrepareContractWrite, useContractWrite} from 'wagmi'
import { NFT_ADDRESS, OPEN_MARKETPLACE_ADDRESS } from "../../../Config";
import NFT_ABI from "../../../Config/NFT_ABI.json";
import OPENMARKETPLACE_ABI from "../../../Config/OPENMARKETPLACE_ABI.json"
import Loader from "../home/Loader.js"
//import { Balance, PanoramaFishEyeSharp } from "@mui/icons-material";

const allCategory = [... new Set(ItemsData.map((e) => e.category))]
console.log(allCategory)

function Mynft() {

  const provider = useProvider();
  const [ListNft, setListNft] = useState([])
  const { address, isConnected } = useAccount();
  const [balance, setbalance] = useState(null)
  const [NFTBalance, setNFTBalance] = useState(0)
  const [getMetadata, setgetMetadata] = useState([])
  console.log("NFTBalance", NFTBalance)
  const [tokenIdList, settokenIdList] = useState([]) 




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
    console.log("s", updatedItem)
  }

  //function call with wagmi
  const contract = useContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    signerOrProvider: provider,


  })

  const Balance = async () => {
    const balanceOf = await contract.balanceOf(address)
    console.log("balance", parseFloat(balanceOf),address)
    return balanceOf

  }

  // const ArraysOfTokenId = async (balance) => {
  //   let tokenIdList = []
  //   for (let i = 0; i < Number(balance) - 7; i++) {
  //     const tokenid = await contract.tokenOfOwnerByIndex(address, i)
  //     tokenIdList.push(tokenid?.toString());
      
  //   }
  //   console.log("tokenIdList", tokenIdList)
  //   return tokenIdList;


  // }

  const MetaData = async (tokenIdList) => {
    const data = await Promise.all(tokenIdList.map(async (tokenid) => {
      const tokenUri = await contract.tokenURI(tokenid);
      const metaData = await getUserNFTByTokenURI(tokenUri)

       console.log("metadata", metaData)
      return metaData

    }))
    return data;
  }

  const metadatafunc = async () => {
    const balance = await Balance();
    // alert(balance)
    // var arr = await  Promise.all(ArraysOfTokenId(balance));
    let _temp = [] ;
        for (let i = 0; i < Number(balance); i++) {
          _temp.push({count: i})
          
    }

    setNFTBalance(_temp);
    console.log("temp", _temp)
    // const meta = await MetaData([...arr]);
    // console.log("meta", meta)
    // setgetMetadata(meta)


   
  }



  useEffect(() => {
    if(address && isConnected){
      metadatafunc();
    }
  }, []);


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
                  {data.map((e, index) => {
                    return (
                      <div className="col-lg-3 pb-4 col-md-6">
                        <Items ItemsData={e} key={index} />
                      </div>
                    );
                  })}
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
                  {NFTBalance?.length == 0 ? <Loader /> :  NFTBalance && NFTBalance?.map((v, index) => {
                    return (
                      <div className="col-lg-3 pb-4 col-md-6">
                       <Listnft tokenindex={v.count} key={index} /> 
                      </div>
                    );
                  })}
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

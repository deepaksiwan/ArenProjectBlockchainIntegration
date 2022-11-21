import React,{useState,useEffect} from "react";
import Header from "../header.js";
import Footer from "../Footer";
import filtericonl from "../../images/filtericonl.svg";
import filtericonr from "../../images/filtericonr.svg";
import ItemsData from "./ItemsData.js";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Marketplaceitem from "./Marketplaceitem.js"
import { useAccount, useContract, useContractRead,useProvider } from 'wagmi'
import { OPEN_MARKETPLACE_ADDRESS ,NFT_ADDRESS} from "../../../Config";
import OPENMARKETPLACE_ABI from "../../../Config/OPENMARKETPLACE_ABI.json";
import NFT_ABI from "../../../Config/NFT_ABI.json";
import item1 from '../../images/item1.svg'
import { getUserNFTByTokenURI } from "../../../api/ApiCall/GetUseNFTById";
import { log } from "util";
import { ethers } from "ethers";
import Loader from "./Loader.js";


const allCategory = [... new Set(ItemsData.map((e)=> e.category))]
// console.log(allCategory)

function Marketplace() {
  const provider=useProvider()
  const { address, isConnected } = useAccount();
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


// filter
  const [data, setData] =useState(ItemsData);
  const filterItem=(categoryItem) => {
    const updatedItem = ItemsData.filter((e)=>{
      return e.category === categoryItem
    })

    setData(updatedItem)
  }

  const [allNftData,setAllNftData]=useState([])
  const [allNftDataFetched, setAllNftDataFetched] = useState(false);
//getAllNFTs marketplace read
  // const _getAllNFTs = useContractRead({
  //   address: OPEN_MARKETPLACE_ADDRES,
  //   abi: OPENMARKETPLACE_ABI,
  //   functionName: 'getAllNFTs'
  // })

const getAllNFTContract=useContract({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    signerOrProvider:provider
})

const ERC721Contract=useContract({
  address: NFT_ADDRESS,
  abi: NFT_ABI,
  signerOrProvider:provider
})

const getAllNFTs=async()=>{
  const transaction = await getAllNFTContract.getAllNFTs();
  // console.log({transaction});
  const items=await Promise.all(transaction.map(async(item)=>{
  // console.log({item});
    const tokenURI = await ERC721Contract.tokenURI(item.tokenId);
    // console.log({tokenURI});
    const meta = await getUserNFTByTokenURI(tokenURI);
    // console.log(item.listingId,"meta");
    let price = ethers.utils.formatUnits(item?.priceInWei.toString(), 'ether');
    let itemList={
      listingId:item?.listingId.toString(),
      nftAddress:item?.nftAddress,
      tokenId:item?.tokenId.toString(),
      price:price,
      seller:item?.seller,
      acceptedToken:item?.acceptedToken,
      status:item.status,
      name:meta.name,
      edition:meta.edition,
      image:item1
    }
    return itemList;
  }))
  setAllNftDataFetched(true)
  setAllNftData(items)

}

useEffect(()=>{
  if(!allNftDataFetched){
    getAllNFTs?.();
  }
},[address,isConnected,!allNftDataFetched,allNftData])

// console.log(allNftData);

const [minPrice,setMinPrice]=useState(1);
const [maxPrice,setMaxPrice]=useState(11);
const [filterData,setFilterData]=useState([])
const [status,setStatus]=useState({"LISTED":2,"CANCELLED":1,"SOLD":0});

// const filterByStatus=async()=>{
//   switch(status){
//     case status.LISTED:{
//       const filterData=await allNftData?.filter((data)=>{
//         return  data?.status===status.LISTED
//       }).map((data)=>{
//         return data;
//       })
//     }
//   }
// }
const filterNft=async()=>{
  const filterData=await allNftData?.filter((data)=>{
    // return data?.price<=parseInt(maxPrice,10) && data?.price>=parseInt(minPrice,10) && data?.status===status.LISTED
    return data?.price<=parseInt(maxPrice,10) && data?.price>=parseInt(minPrice,10) 
  }).map((data)=>{
    return data;
  })
  setFilterData(filterData)
}


 
  return (
    <div>
      <div className="topbg">
        <Header />
        <div className="home-main-wrp">
          <div className="container">
            <div className="home-wrp row">
              <div className="col-md-3 col-sm-12 ">
                <div className="filter">
                  <div className="filter-hding">
                    <img src={filtericonl} />
                    <h1>FILTER</h1>
                    <img src={filtericonr} />
                  </div>
                  <ul className="filter-list">
                    <li>
                      <h3>Rarity</h3>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          value={age1}
                          onChange={handleChange1}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="" onClick={()=> setData(ItemsData)}>
                            All
                          </MenuItem>
                          {
                            allCategory.map((e)=>{
                              return <MenuItem value={' '} onClick={()=> filterItem(e)}>{e}</MenuItem>
                            })
                          }
                        </Select>
                      </FormControl>
                    </li>
                    <li>
                      <h3>Classes</h3>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          value={age2}
                          onChange={handleChange2}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                         <MenuItem value="" onClick={()=> setData(ItemsData)}>
                            All
                          </MenuItem>
                          {
                            allCategory.map((e)=>{
                              return <MenuItem value={' '} onClick={()=> filterItem(e)}>{e}</MenuItem>
                            })
                          }
                        </Select>
                      </FormControl>
                    </li>
                    <li>
                      <h3>Faction</h3>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          value={age3}
                          onChange={handleChange3}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="" onClick={()=> setData(ItemsData)}>
                            All
                          </MenuItem>
                          {/* <MenuItem value={10} onClick={()=> filterItem('Ten')}>Ten</MenuItem>
                          <MenuItem value={20} onClick={()=> filterItem('Twenty')}>Twenty</MenuItem>
                          <MenuItem value={30} onClick={()=> filterItem('Thirty')}>Thirty</MenuItem> */}
                          {
                            allCategory.map((e)=>{
                              return <MenuItem value={' '} onClick={()=> filterItem(e)}>{e}</MenuItem>
                            })
                          }
                        </Select>
                      </FormControl>
                    </li>
                    <li>
                      <h3>PRICE RANGE</h3>
                      <div className="p-range">
                        <input type="text" placeholder="Min" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} />
                        <input type="text" placeholder="Max" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} />
                      </div>
                    </li>
                    <li>
                      <div className="apply">
                        <a href="#" onClick={filterNft}>APPLY</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="filter-item col-md-9 col-sm-12">
                <div className="row">
                  { !!filterData.length<=0?(allNftData.length>0 ? (allNftData.map((e,index) => {
                    return (
                      <div className="col-lg-4 pb-4 col-md-6">
    
                        <Marketplaceitem ItemsData={e} key={index} />
                        
    
                      </div>
                    );
                  })
                  ):(
                    <Loader/>
                  )
                  ):(
                    filterData.length>0 ? (filterData.map((e,index) => {
                    return (
                      <div className="col-lg-4 pb-4 col-md-6">
    
                        <Marketplaceitem ItemsData={e} key={index} />
                        
    
                      </div>
                    );
                  })
                  ):(
                    <Loader/>
                  )
                  )
                  }
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

export default Marketplace;

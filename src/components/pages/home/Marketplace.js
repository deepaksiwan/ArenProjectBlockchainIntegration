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
import { useAccount, useContractRead } from 'wagmi'
import { OPEN_MARKETPLACE_ADDRES } from "../../../Config";
import OPENMARKETPLACE_ABI from "../../../Config/OPENMARKETPLACE_ABI.json";


const allCategory = [... new Set(ItemsData.map((e)=> e.category))]
// console.log(allCategory)

function Marketplace() {
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
  const [data, setData] =useState(ItemsData)
  const filterItem=(categoryItem) => {
    const updatedItem = ItemsData.filter((e)=>{
      return e.category === categoryItem
    })

    setData(updatedItem)
  }

//getAllNFTs marketplace read
  const _getAllNFTs = useContractRead({
    address: OPEN_MARKETPLACE_ADDRES,
    abi: OPENMARKETPLACE_ABI,
    functionName: 'getAllNFTs' ,
    chainId:97,
    onSuccess:(data)=>{
      console.log(data);
    }
  })
  // console.log("getallnftmargetplace", _getAllNFTs)
  useEffect(()=>{
   if( address && _getAllNFTs?.data){
    console.log(_getAllNFTs?.data);
   }
  },[])

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
                      <h3>PRICe RANGE</h3>
                      <div className="p-range">
                        <input type="text" placeholder="Min" />
                        <input type="text" placeholder="Max" />
                      </div>
                    </li>
                    <li>
                      <div className="apply">
                        <a href="#">APPLY</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="filter-item col-md-9 col-sm-12">
                <div className="row">
                  {data.map((e,index) => {
                    return (
                      <div className="col-lg-4 pb-4 col-md-6">
                        <Marketplaceitem ItemsData={e} key={index} />
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

export default Marketplace;

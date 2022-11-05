import React,{useState,useEffect} from "react";
import Header from "../header.js";
import Footer from "../Footer";
import filtericonl from "../../images/filtericonl.svg";
import filtericonr from "../../images/filtericonr.svg";
import Dropdown from "react-bootstrap/Dropdown";
import ItemsData from "./ItemsData.js";
import Items from "./Items.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const allCategory = [... new Set(ItemsData.map((e)=> e.category))]
console.log(allCategory)

function Home() {
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
  const [data, setData] =useState(ItemsData)
  const filterItem=(categoryItem) => {
    const updatedItem = ItemsData.filter((e)=>{
      return e.category === categoryItem
    })

    setData(updatedItem)
    console.log("s",updatedItem)
  }
  return (
    <div>
      <div className="topbg">
        <Header />
        <div className="home-main-wrp">
          <div className="container">
            <div className="home-wrp row">
              <div className="col-md-3 col-sm-12 p-0">
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
                      <div className="col-lg-3 pb-4 col-md-6">
                        <Items ItemsData={e} key={index} />
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

export default Home;

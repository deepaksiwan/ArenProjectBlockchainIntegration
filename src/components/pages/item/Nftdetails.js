import React, { useState, useEffect } from "react";
import Header from "../header.js";
import Footer from "../Footer";
import hdingarrowleft from "../../images/hdingarrowleft.svg";
import hdingarrowright from "../../images/hdingarrowright.svg";
import itemimg from "../../images/itemimg.svg";
import binance from "../../images/binance.svg";
import orderl from "../../images/orderl.svg";
import orderr from "../../images/orderr.svg";
import skillimg from "../../images/skillimg.svg";
import { useQuery } from "react-query";
import Accordian from "./Accordian";
import img1 from "../../images/img1.png";
import { useParams } from 'react-router-dom'
import ItemsData from "../home/ItemsData.js";
import { useAccount, useContractRead, useProvider, useContract, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { getUserNFTByTokenURI } from "../../../api/ApiCall/GetUseNFTById";
import { NFT_ADDRESS, OPEN_MARKETPLACE_ADDRESS } from "../../../Config";
import NFT_ABI from "../../../Config/NFT_ABI.json";
import OPENMARKETPLACE_ABI  from "../../../Config/OPENMARKETPLACE_ABI.json"
import { map } from "jquery";
import item1 from "../../images/item1.svg"

function Listitems() {
  const provider = useProvider()
  const [tokenUri, setTokenUri] = useState("")
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  console.log("address24234", address)

  // const { editionb } = useParams();
  // console.log("ghh", id)
  // const details = ItemsData.filter((details) => details.id == id);
  // console.log("ghj", details)


  const { id: tokenId } = useParams();
  // const details = ItemsData.filter((details) => details.id == id);
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
  

  //Buy Nft function call
  const { config } = usePrepareContractWrite({
    address: OPEN_MARKETPLACE_ADDRESS,
    abi: OPENMARKETPLACE_ABI,
    functionName: 'buyNFT',
    args: [4, 7, 3]
  })

  const {isLoading, write } = useContractWrite(config)
  console.log("isLoading", isLoading)

  const Buy = ()=>{
    
    write();
  }

 


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
                          <h3>{data?.name}</h3>
                        </div>
                        <div className="character-b-cont-c">
                          <p>Price</p>
                          <h3>
                            {/* <span>
                              <img src={binance} />
                            </span> */}
                            {address && isConnected ? data?.edition : <p>empty</p>}
                          </h3>
                        </div>
                        <div className="ordernow-butn" onClick={openConnectModal}>
                          <a href="#">
                            <img src={orderl} />
                            {address && isConnected ? <p onClick={Buy}>Buy</p> : <p>Connect</p>}
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
                              <h3>common</h3>
                              <p>{data?.attributes?.[0]?.Character}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>common</h3>
                              <p>{data?.attributes?.[1]?.Category}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>common</h3>
                              <p>{data?.attributes?.[2]?.Rank}</p>
                            </div>
                          </div>
                         

                          {/* <div className="col-lg-4">
                            <div className="stats">
                              <h3>{data?.attributes?.[1]?.trait_type}</h3>
                              <p>{data?.attributes?.[1]?.value}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>{data?.attributes?.[2]?.trait_type}</h3>
                              <p>{data?.attributes?.[2]?.value}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>{data?.attributes?.[3]?.trait_type}</h3>
                              <p>{data?.attributes?.[3]?.value}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>{data?.attributes?.[4]?.trait_type}</h3>
                              <p>{data?.attributes?.[4]?.value}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>{data?.attributes?.[5]?.trait_type}</h3>
                              <p>{data?.attributes?.[5]?.value}</p>
                            </div>
                          </div> */}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <Footer />
      </div>
    </div>
  );
}

export default Listitems;
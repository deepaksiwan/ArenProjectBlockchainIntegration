import React from "react";
import Header from "../header.js";
import Footer from "../Footer";
import hdingarrowleft from "../../images/hdingarrowleft.svg";
import hdingarrowright from "../../images/hdingarrowright.svg";
import itemimg from "../../images/itemimg.svg";
import binance from "../../images/binance.svg";
import orderl from "../../images/orderl.svg";
import orderr from "../../images/orderr.svg";
import skillimg from "../../images/skillimg.svg";
import Accordian from "../item/Accordian";
import img1 from "../../images/img1.png";

function Item() {
  return (
    <div>
      <div className="topbg">
        <Header />
        <div className="item-main-wrp">
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
                        <img src={img1} />
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
                          <p>#325</p>
                          <h3>CHARACTER NAME</h3>
                        </div>
                        <div className="character-b-cont-c">
                          <p>Price</p>
                          <h3>
                            <span>
                              <img src={binance} />
                            </span>
                            3.1
                          </h3>
                        </div>
                        <div className="ordernow-butn">
                          <a href="#">
                            <img src={orderl} />
                            <p>BUY NOW</p>
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
                              <h3>COMMON</h3>
                              <p>rarity</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>COMMON</h3>
                              <p>rarity</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>COMMON</h3>
                              <p>rarity</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>COMMON</h3>
                              <p>rarity</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>COMMON</h3>
                              <p>rarity</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="stats">
                              <h3>COMMON</h3>
                              <p>rarity</p>
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
        <Footer />
      </div>
    </div>
  );
}

export default Item;
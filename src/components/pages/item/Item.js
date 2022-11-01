import React from 'react';
import Header from '../header.js';
import Footer from '../Footer'
import hdingarrowleft from '../../images/hdingarrowleft.svg'
import hdingarrowright from '../../images/hdingarrowright.svg'
import itemimg from '../../images/itemimg.svg'
import binance from '../../images/binance.svg'
import orderl from '../../images/orderl.svg'
import orderr from '../../images/orderr.svg'
import skillimg from '../../images/skillimg.svg'
import Accordian from '../item/Accordian'







function Item() {

    return (
        <div>
            <div className='topbg'>
                <Header />
                <div className='item-main-wrp'>
                    <div className='container'>
                        <div className='item-wrp'>
                            <div className='item-hding'>
                                <img src={hdingarrowleft} />
                                <h1>CHARACTER NAME</h1>
                                <img src={hdingarrowright} />
                            </div>
                            <div className='item'>
                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <div className='item-left-cont'>
                                            <div className='item-img'>
                                                <img src={itemimg} />
                                            </div>
                                            <ul className='item-left-list'>
                                                <li>
                                                    <h3>Level: <strong>5</strong></h3>
                                                    <div className="itemlist-line"></div>
                                                </li>
                                                <li>
                                                    <h3>Faction: <strong>ETHERIA</strong></h3>
                                                    <div className="itemlist-line"></div>
                                                </li>
                                                <li>
                                                    <h3>Class: <strong>MAGE</strong></h3>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='col-lg-8'>
                                        <div className='item-right-cont'>
                                            <div className='character-box'>
                                                <div className='character-b-cont'>
                                                    <p>#325</p>
                                                    <h3>CHARACTER NAME</h3>
                                                </div>
                                                <div className='character-b-cont-c'>
                                                    <p>Price</p>
                                                    <h3><span><img src={binance} /></span>3.1</h3>
                                                </div>
                                                <div className='ordernow-butn'>
                                                    <a href='#'>
                                                        <img src={orderl} />
                                                        <p>BUY NOW</p>
                                                        <img src={orderr} />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className='skill-hding'>
                                                <h3>SKILLS</h3>
                                                <img src={skillimg} />
                                            </div>
                                            <Accordian />
                                            <div className='skill-hding'>
                                                <h3>STATS</h3>
                                                <img src={skillimg} />
                                            </div>
                                            <div className='stats-main-wrp'>
                                                <div className='row'>
                                                    <div className='col-lg-4'>
                                                        <div className='stats'>
                                                            <h3>COMMON</h3>
                                                            <p>rarity</p>
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-4'></div>
                                                    <div className='col-lg-4'></div>
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
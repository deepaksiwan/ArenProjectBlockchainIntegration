import React from 'react';
import Header from '../header.js';
import Footer from '../Footer'
import filtericonl from '../../images/filtericonl.svg'
import filtericonr from '../../images/filtericonr.svg'
import Dropdown from 'react-bootstrap/Dropdown';
import item1 from '../../images/item1.svg'
import item2 from '../../images/item2.svg'
import item3 from '../../images/item3.svg'
import item4 from '../../images/item4.svg'
import item5 from '../../images/item5.svg'
import item6 from '../../images/item6.svg'
import item7 from '../../images/item7.svg'
import item8 from '../../images/item8.svg'
import star from '../../images/star.svg'
import itemline from '../../images/itemline.svg'
import binance from '../../images/binance.svg'



function Home() {

	return (
		<div>
			<div className='topbg'>
				<Header />
				<div className='home-main-wrp'>
					<div className='container'>
						<div className='home-wrp row'>
								<div className="col-md-3 col-sm-12">
								<div className='filter'>
								<div className='filter-hding'>
									<img src={filtericonl} />
									<h1>FILTER</h1>
									<img src={filtericonr} />
								</div>
								<ul className='filter-list'>
									<li>
										<h3>Rarity</h3>
										<Dropdown>
											<Dropdown.Toggle variant="transparent" id="dropdown-tab">
												All
											</Dropdown.Toggle>

											<Dropdown.Menu>
												<Dropdown.Item href="#/action-1">12h</Dropdown.Item>
												<Dropdown.Item href="#/action-2">06h</Dropdown.Item>
												<Dropdown.Item href="#/action-3">01h</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</li>
									<li>
										<h3>Classes</h3>
										<Dropdown>
											<Dropdown.Toggle variant="transparent" id="dropdown-tab">
												All
											</Dropdown.Toggle>

											<Dropdown.Menu>
												<Dropdown.Item href="#/action-1">12h</Dropdown.Item>
												<Dropdown.Item href="#/action-2">06h</Dropdown.Item>
												<Dropdown.Item href="#/action-3">01h</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</li>
									<li>
										<h3>Faction</h3>
										<Dropdown>
											<Dropdown.Toggle variant="transparent" id="dropdown-tab">
												All
											</Dropdown.Toggle>

											<Dropdown.Menu>
												<Dropdown.Item href="#/action-1">12h</Dropdown.Item>
												<Dropdown.Item href="#/action-2">06h</Dropdown.Item>
												<Dropdown.Item href="#/action-3">01h</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</li>
									<li>
										<h3>PRICe RANGE</h3>
										<div className='p-range'>
											<input type="text" placeholder="Min" />
											<input type="text" placeholder="Max" />
										</div>
									</li>
									<li>
										<div className='apply'>
											<a href='#'>APPLY</a>
										</div>
									</li>
								</ul>
							</div>
								</div>
							<div className='filter-item col-md-9 col-sm-12'>
								<div className='itemmain-bx'>
									<a href='#'>
									<div className='itembx'>
										<div className='itemimg'>
											<img src={item1} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
									</a>
									<a href='#'>
									<div className='itembx'>
										<div className='itemimg'>
											<img src={item2} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
									</a>
									<a href='#'>
									<div className='itembx itembx-mr'>
										<div className='itemimg'>
											<img src={item3} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
									</a>
									<a href='#'>
									<div className='itembx itembx-mr'>
										<div className='itemimg'>
											<img src={item4} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
									</a>
								</div>
								<div className='itemmain-bx item-mr'>
									<a href='#'>
									<div className='itembx'>
										<div className='itemimg'>
											<img src={item5} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
									</a>
									<a href='#'>
									<div className='itembx'>
										<div className='itemimg'>
											<img src={item6} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
									</a>
									<a href='#'>
									<div className='itembx itembx-mr'>
										<div className='itemimg'>
											<img src={item7} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
									</a>
									<a href='#'>
									<div className='itembx itembx-mr'>
										<div className='itemimg'>
											<img src={item8} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
									</a>
								</div>
								<div className='itemmain-bx item-mr'>
								<a href='#'>
								<div className='itembx'>
										<div className='itemimg'>
											<img src={item1} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
								</a>
									<a href='#'>
									<div className='itembx'>
										<div className='itemimg'>
											<img src={item2} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
									</a>
									<a href='#'>
									<div className='itembx itembx-mr'>
										<div className='itemimg'>
											<img src={item3} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
									</a>
									<a href='#'>
									<div className='itembx itembx-mr'>
										<div className='itemimg'>
											<img src={item4} />
										</div>
										<div className='itembox-hding'>
											<img src={filtericonl} />
											<div className='star'>
												<img src={star} />
											</div>
											<img src={filtericonr} />
										</div>
										<div className='itemline'>
											<img src={itemline} />
										</div>
										<div className='box-btm'>
											<div className='box-btm-l'>
												<p>#325</p>
												<h3>NFT NAME</h3>
											</div>
											<div className='box-btm-r'>
												<p>Price</p>
												<h3><span><img src={binance} /></span>3.1</h3>
											</div>
										</div>
									</div>
									</a>
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
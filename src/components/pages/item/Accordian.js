import React, { Component } from 'react';
import $ from "jquery";
 
class Accordian extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};

	}
	componentDidMount = () => {
		// faq open js

		$(document).ready(function () {
			$('.block__title').click(function (event) {
				if ($('.block').hasClass('one')) {
					$('.block__title').not($(this)).removeClass('active');
					$('.block__text').not($(this).next()).slideUp(300);
				}
				$(this).toggleClass('active').next().slideToggle(300);
			});

		});

		// closed faq js
	}

	render() {
		return (
			<div>
				 
				 
					 
						<div className="container-border">
							 
							<div className="wrp-faq">
								<div className="row">
									<div className="col-lg-12">
										<div class="wrapper">
											<div class="block one">
												<div class="block__item block__items2">
													<div class="block__title">Active skill: <span>Mana regeneration</span></div>
													<div class="block__text">
													Donec urna leo, efficitur et nisi et, facilisis sollicitudin nisl. Nunc id quam lorem. Duis congue in sem quis lacinia. Mauris leo orci, congue ultricies justo id, pretium sollicitudin ipsum. Curabitur fringilla tortor sed dui tincidunt viverra.
													 <br/>
                                                     <br/>
                                                     Nunc id quam lorem. Duis congue in sem quis lacinia. Mauris leo orci, congue ultricies justo id, pretium sollicitudin ipsum. Curabitur fringilla tortor sed dui tincidunt viverra.
													</div>
												</div>
                                                <div class="block__item block__items2">
													<div class="block__title">Passive Skill: <span>Rage bonus</span></div>
													<div class="block__text">
													Donec urna leo, efficitur et nisi et, facilisis sollicitudin nisl. Nunc id quam lorem. Duis congue in sem quis lacinia. Mauris leo orci, congue ultricies justo id, pretium sollicitudin ipsum. Curabitur fringilla tortor sed dui tincidunt viverra.
													 <br/>
                                                     <br/>
                                                     Nunc id quam lorem. Duis congue in sem quis lacinia. Mauris leo orci, congue ultricies justo id, pretium sollicitudin ipsum. Curabitur fringilla tortor sed dui tincidunt viverra.
													</div>
												</div>
                                                <div class="block__item block__items2">
													<div class="block__title">Active skill: <span>Mana regeneration</span></div>
													<div class="block__text">
													Donec urna leo, efficitur et nisi et, facilisis sollicitudin nisl. Nunc id quam lorem. Duis congue in sem quis lacinia. Mauris leo orci, congue ultricies justo id, pretium sollicitudin ipsum. Curabitur fringilla tortor sed dui tincidunt viverra.
													 <br/>
                                                     <br/>
                                                     Nunc id quam lorem. Duis congue in sem quis lacinia. Mauris leo orci, congue ultricies justo id, pretium sollicitudin ipsum. Curabitur fringilla tortor sed dui tincidunt viverra.
													</div>
												</div>
                                                <div class="block__item block__items2">
													<div class="block__title">Active skill: <span>Mana regeneration</span></div>
													<div class="block__text">
													Donec urna leo, efficitur et nisi et, facilisis sollicitudin nisl. Nunc id quam lorem. Duis congue in sem quis lacinia. Mauris leo orci, congue ultricies justo id, pretium sollicitudin ipsum. Curabitur fringilla tortor sed dui tincidunt viverra.
													 <br/>
                                                     <br/>
                                                     Nunc id quam lorem. Duis congue in sem quis lacinia. Mauris leo orci, congue ultricies justo id, pretium sollicitudin ipsum. Curabitur fringilla tortor sed dui tincidunt viverra.
													</div>
												</div>
                                                <div class="block__item block__items2">
													<div class="block__title">Active skill: <span>Mana regeneration</span></div>
													<div class="block__text">
													Donec urna leo, efficitur et nisi et, facilisis sollicitudin nisl. Nunc id quam lorem. Duis congue in sem quis lacinia. Mauris leo orci, congue ultricies justo id, pretium sollicitudin ipsum. Curabitur fringilla tortor sed dui tincidunt viverra.
													 <br/>
                                                     <br/>
                                                     Nunc id quam lorem. Duis congue in sem quis lacinia. Mauris leo orci, congue ultricies justo id, pretium sollicitudin ipsum. Curabitur fringilla tortor sed dui tincidunt viverra.
													</div>
												</div>

											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
		 
			 

				 

			</div>

		);
	}
}

export default Accordian;
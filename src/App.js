import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';

import Home from './components/pages/home/Home'
import Item from './components/pages/item/Item'
 






function App() {


	return (
		<Router>
			<div>
				<Route exact path="/" name="Home Page" component={Home} />
				<Route exact path="/item" name="Item Page" component={Item} />
			</div>
		</Router>
	);

}

export default App;

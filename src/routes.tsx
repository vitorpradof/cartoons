import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Inicio from './pages/Inicio';

function Routes () {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Inicio} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;

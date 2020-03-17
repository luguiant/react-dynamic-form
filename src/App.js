import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import HomeComponent from './pages/Home';

const App = ({ store }) => (
	<Provider store={store}>
		<CssBaseline />
		     <Container fixed>
				 <Router>
					 <div>
						 <Route exact path="/" component={HomeComponent} />
					 </div>
				 </Router>
			 </Container>
	</Provider>
);

App.propTypes = {
	store: PropTypes.object.isRequired
};

export default App;

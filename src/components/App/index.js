import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import InitialPage from '../InitialPage/InitialPage';
import DataPage from '../../containers/DataPage';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={InitialPage} />
					<Route path='/countries/:slug' children={<DataPage />} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;

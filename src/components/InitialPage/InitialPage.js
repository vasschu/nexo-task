import { useHistory } from 'react-router-dom';
import './initialPage.css';

function InitialPage() {
	const history = useHistory();

	return (
		<div class='start-page'>
			<h1>Latest covid info</h1>
			<div class='round-button'>
				<button
					className={'round-button-circle'}
					onClick={() => history.push('/countries/list')}
				>
					<span>Show Data</span>
				</button>
			</div>
		</div>
	);
}

export default InitialPage;

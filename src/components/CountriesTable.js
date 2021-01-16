import ReactCountryFlag from 'react-country-flag';

import { useHistory } from 'react-router-dom';

function Table(props) {
	const items = props.items;
	const sortByTotalCases = props.sort;
	const history = useHistory();

	const loadCountryData = (event) => {
		history.push('/countries/' + event.target.parentNode.id);
	};

	const table = items.map((el) => {
		return (
			<tr
				key={el.CountryCode}
				onClick={(event) => loadCountryData(event)}
				id={el.Slug}
			>
				<td>
					<ReactCountryFlag countryCode={`${el.CountryCode}`} svg />
				</td>
				<td>{el.Country}</td>
				<td>{el.TotalConfirmed}</td>
				<td>{el.TotalDeaths}</td>
				<td>{el.TotalRecovered}</td>
			</tr>
		);
	});

	return (
		<>
			<table className={'table'} id='countries'>
				<tbody>
					<th></th>
					<th>Country</th>
					<th
						style={{ cursor: 'pointer' }}
						onClick={() => sortByTotalCases(items)}
					>
						Total Cases
					</th>
					<th>Total Deaths</th>
					<th>Total Recovered</th>
					{table}
				</tbody>
			</table>
		</>
	);
}

export default Table;

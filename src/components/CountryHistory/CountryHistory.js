import './CountryHistory.css';

function CountryHistory({ countryHistory }) {
	const formatedData = countryHistory
		? countryHistory.reduce((acc, element) => {
				const month = element.Date.slice(0, 7);
				if (acc[month]) {
					acc[month].Active += element.Active;
					acc[month].Deaths += element.Deaths;
					acc[month].Recovered += element.Recovered;
				} else {
					acc = {
						...acc,
						[month]: {
							Deaths: element.Deaths,
							Active: element.Active,
							Recovered: element.Recovered,
						},
					};
				}
				return acc;
		  }, {})
		: null;
	const months = Object.keys(formatedData);

	const dataToDispaly = months
		? months.map((el) => {
				return (
					<tr key={el}>
						<td>{el}</td>
						<td>{formatedData[el].Active}</td>
						<td>{formatedData[el].Recovered}</td>
						<td>{formatedData[el].Deaths}</td>
					</tr>
				);
		  })
		: null;

	return (
		<>
			<h2>{countryHistory[0].Country}'s Covid history by month</h2>
			<table className={'table'}>
				<tbody>
					<th>Month</th>
					<th>Active cases</th>
					<th>Recovered</th>
					<th>Deaths</th>
					{dataToDispaly}
				</tbody>
			</table>
		</>
	);
}

export default CountryHistory;

import { useState, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import CountryHistory from './CountryHistory/CountryHistory';
import HistoryModal from './Modal/HistoryModal';

function CountryDetails(props) {
	const data = props.data;
	const countryHistory = props.countryHistory;
	const [countryInfo, setCountryInfo] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setCountryInfo(data[0]);
	}, [data]);

	const render = countryInfo ? (
		<>
			<span>
				<ReactCountryFlag countryCode={`${countryInfo.CountryCode}`} svg />{' '}
			</span>{' '}
			<span>{countryInfo.Country}</span>
			<p>New cases: {countryInfo.NewConfirmed}</p>
			<p>New Deaths: {countryInfo.NewDeaths}</p>
			<p>New Recovered: {countryInfo.NewRecovered}</p>
			<p>Total Confirmed: {countryInfo.TotalConfirmed}</p>
			<p>Total Deaths: {countryInfo.TotalDeaths}</p>
			<p>Total Recovered: {countryInfo.TotalRecovered}</p>
			<button onClick={() => setIsOpen(!isOpen)}>History</button>
			<HistoryModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				countryHistory={countryHistory}
			>
				<CountryHistory countryHistory={countryHistory} />
			</HistoryModal>
		</>
	) : null;

	return render;
}

export default CountryDetails;

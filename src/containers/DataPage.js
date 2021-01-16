import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isoCodeEu, url } from '../commonStrings';
import './DataPage.css';

import Loader from 'react-loader-spinner';

import Table from '../components/CountriesTable';
import CountryDetails from '../components/CountryDetails';

function CountriesList() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [countryHistory, setCountryHistory] = useState([]);
	const [sorted, setSorted] = useState(false);

	let { slug } = useParams();

	//fetch data and filter EU countries
	useEffect(() => {
		fetch(url + '/summary')
			.then((res) => res.json())
			.then(
				(result) => {
					const countryData = result.Countries;
					const euData = countryData.filter((el) =>
						isoCodeEu.includes(el.CountryCode),
					);
					setItems(euData);
					setIsLoaded(true);
				},
				(error) => {
					setIsLoaded(true);
					alert(error);
				},
			);
	}, []);

	useEffect(() => {
		if (items.some((el) => el.Slug === slug)) {
			fetch(url + '/total/country/' + slug)
				.then((res) => res.json())
				.then(
					(result) => {
						setCountryHistory(result);
					},
					(error) => {
						alert(error);
					},
				);
		}
	}, [items, slug]);

	// sorting by total cases function
	const sortByTotalCases = (data) => {
		const sortedData = data.sort((a, b) =>
			a.TotalConfirmed > b.TotalConfirmed
				? 1
				: b.TotalConfirmed > a.TotalConfirmed
				? -1
				: 0,
		);

		if (sorted) {
			setItems(sortedData);
			setSorted(!sorted);
		} else {
			setItems(sortedData.reverse());
			setSorted(!sorted);
		}
	};

	return (
		<div className='dataContainer'>
			<div className='countriesList'>
				{isLoaded ? (
					<Table items={items} sort={sortByTotalCases} />
				) : (
					<Loader type='TailSpin' color='#00BFFF' height={100} width={100} />
				)}
			</div>

			{slug !== 'list' && items ? (
				<div className='countryDetails'>
					<CountryDetails
						countryHistory={countryHistory}
						data={items.filter((el) => el.Slug === slug)}
					/>
				</div>
			) : null}
		</div>
	);
}

export default CountriesList;

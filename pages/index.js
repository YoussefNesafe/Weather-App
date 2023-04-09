import useDebounce from "@/utils/useDebounce";
import { getWeatherData } from "@/utils/weather-api";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

const Home = () => {
	const [citySearchText, setCitySearchText] = useState("");
	const [weather, setWeather] = useState({});
	const debouncedValue = useDebounce(citySearchText, 1000);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (debouncedValue) {
			setLoading(true);
			getWeatherData({ city: debouncedValue }).then((res) => {
				setWeather(res);
				setLoading(false);
			});
		}
	}, [debouncedValue]);
	console.log({
		debouncedValue,
		loading,
		weather,
	});
	return (
		<div>
			<Head>
				<title>Weather App API | Next JS</title>
				<meta name="description" content="Weather app api by nextjs" />
				<link rel="icon" href="/logo.png" />
			</Head>
			<main>
				<div>
					<input
						type="text"
						value={citySearchText}
						onChange={(e) => setCitySearchText(e.target.value)}
					/>
					{loading ? <FaSpinner className="spinner" /> : <BsSearch />}
					{JSON.stringify(weather)}
				</div>
			</main>
		</div>
	);
};
export default Home;

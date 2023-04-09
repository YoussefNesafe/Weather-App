import useDebounce from "@/utils/useDebounce";
import { getWeatherData } from "@/utils/weather-api";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import Weather3 from "/public/assets/weather-3-min.jpg";

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
	return (
		<div>
			<Head>
				<title>Weather App API | Next JS</title>
				<meta name="description" content="Weather app api by nextjs" />
				<link rel="icon" href="/logo.png" />
			</Head>
			<main>
				<div className="mainPage">
					<div className="overlay"></div>
					<Image
						src={Weather3?.src}
						width={Weather3?.width}
						height={Weather3?.height}
						alt="Background image"
						className="backgroundImage"
					/>
					<div className="container">
						<div className="searchContainer">
							{loading ? (
								<FaSpinner className="spinner icon" />
							) : (
								<BsSearch className="icon" />
							)}
							<input
								type="text"
								value={citySearchText}
								placeholder="Search by city name ..."
								onChange={(e) => setCitySearchText(e.target.value)}
								className="searchInput"
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};
export default Home;

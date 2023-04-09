import axios from "axios";

const Axios = axios.create({
	baseURL: process.env.NEXT_PUBLIC_WEATHER_URL,
});

export const getWeatherData = async ({ city = "dubai" }) => {
	let error = undefined;
	const res = await Axios.get("/weather", {
		params: { q: city, appid: process.env.NEXT_PUBLIC_WEATHER_KEY },
	}).catch((err) => (error = err));
	return {
		data: res?.data,
		error: error?.response?.data?.message,
	};
};

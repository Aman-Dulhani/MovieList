import axios from "axios";
import { getAxiosParams } from "../Hooks/useGet";

export const baseURL = "https://api.themoviedb.org/3/discover/movie";
export const imgURL = "https://image.tmdb.org/t/p/w300/";
export const genreURL = "https://api.themoviedb.org/3/genre/movie/list";
export const detailsURL = "https://api.themoviedb.org/3/movie/";

export const doGetCall = async (method, key, options) => {
	const { debounce = 0, extraParams = {} } = options;
	const axiosParams = getAxiosParams(method, key, extraParams);
	let promise;
	if (debounce > 0) {
		promise = new Promise((resolve, reject) => {
			setTimeout(async () => {
				try {
					const data = await axios(axiosParams);
					resolve(data);
				} catch (e) {
					reject(e);
				}
			}, debounce);
		});
	} else {
		promise = axios(axiosParams);
	}
	return promise;
};

export const getData = async (key, options = {}) => {
	const response = await doGetCall("get", key, options);
	const { transform } = options;
	// console.log(response);
	return transform ? transform(response.data, options) : response.data;
};

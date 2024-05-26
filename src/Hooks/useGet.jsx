/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";
import { useReducer } from "react";

export const baseURL = "https://api.themoviedb.org/3/discover/movie";
export const imgURL = "https://image.tmdb.org/t/p/w300";
export const genreURL = "https://api.themoviedb.org/3/genre/movie/list";

export const getAxiosParams = (method, key, extraParams) => {
	return {
		method,
		url: key,
		headers: { "Content-Type": "application/json" },
		params: {
			api_key: "2dca580c2a14b55200e784d157207b4d",
			...extraParams,
		},
	};
};

const setLoadInfo = (state, action) => {
	switch (action.state) {
		case "loading":
			return { data: state.data, error: undefined, loading: true };
		case "loadingDebounce":
			return { data: undefined, error: undefined, loading: action.loading };
		case "loaded":
			return {
				data: action.data || state.data || undefined,
				error: action.error || undefined,
				loading: false,
			};
		default:
			throw new Error();
	}
};

export const useGet = (key = URL, options = {}) => {
	const { ready = true, params = {}, debounce, transform } = options;

	const [loadState, dispatchLoadState] = useReducer(setLoadInfo, {
		data: undefined,
		loading: !!ready,
	});
	let stringified_options = JSON.stringify(params);

	let doAbort;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const clearCall = () => {
		doAbort = null;
	};
	const abort = useCallback(() => {
		if (!doAbort) {
			return false;
		}
		doAbort();
		clearCall();
	}, [key, stringified_options]);

	const refreshData = useCallback(async () => {
		try {
			if (debounce) {
				dispatchLoadState({ state: "loadingDebounce", loading: ready });
			} else {
				abort();
				dispatchLoadState({ state: "loading" });
			}

			if (ready === false) {
				return;
			}
			const axiosParams = getAxiosParams("get", key, params);
			const response = await axios(axiosParams);
			if (transform) {
				response.data = transform(response.data);
			}
			dispatchLoadState({ state: "loaded", data: response.data });
			clearCall();
		} catch (err) {
			dispatchLoadState({ state: "loaded", error: err });
			clearCall();
			throw err;
		}
	}, [key, stringified_options, ready, debounce]);

	useEffect(() => {
		refreshData(false);
		return () => {
			abort();
		};
	}, [refreshData]);

	return [loadState.data, loadState.loading, refreshData];
};

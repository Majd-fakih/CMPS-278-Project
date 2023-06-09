import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Game } from "../data/Interfaces/Games";
import axios from "axios";
import ApiEndpoints from "../data/ApiEndpoints";

export const getGamesAsync = createAsyncThunk("games/getGamesAsync", async (_, thunkAPI) => {
	try {
		const response = await axios.get<Game[]>(ApiEndpoints.getGames);
		thunkAPI.dispatch(setGames(response.data));
		thunkAPI.dispatch(setIsLoading(false));
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const postGamesAsync = createAsyncThunk("games/postGamesAsync", async (data, thunkAPI) => {
	try {
		const response = await axios.post<Game[]>(ApiEndpoints.getGames);
		thunkAPI.dispatch(setGames(response.data));
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const putGamesAsync = createAsyncThunk("games/putGamesAsync", async (data, thunkAPI) => {
	try {
		const response = await axios.put<Game[]>(ApiEndpoints.getGames);
		thunkAPI.dispatch(setGames(response.data));
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const deleteGamesAsync = createAsyncThunk("games/deleteGamesAsync", async (data, thunkAPI) => {
	try {
		const response = await axios.delete<Game[]>(ApiEndpoints.getGames);
		thunkAPI.dispatch(setGames(response.data));
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

interface State {
	games: Game[];
	isLoading: boolean;
}

const initialState: State = {
	games: [] as Game[],
	isLoading: true,
};

const gamesSlice = createSlice({
	name: "Games",
	initialState,
	reducers: {
		setGames: (state, action: PayloadAction<Game[]>) => {
			state.games = action.payload;
			state.isLoading = false;
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
	},
});

export const { setGames, setIsLoading } = gamesSlice.actions;

export default gamesSlice.reducer;

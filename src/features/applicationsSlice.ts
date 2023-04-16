import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Application } from "../data/Interfaces/Applications";
import axios from "axios";
import ApiEndpoints from "../data/ApiEndpoints";

export const getApplicationAsync = createAsyncThunk("applications/getApplicationAsync", async (_, thunkAPI) => {
	try {
		const response = await axios.get<Application[]>(ApiEndpoints.getApplications);
		thunkAPI.dispatch(setApplications(response.data));
		thunkAPI.dispatch(setIsLoading(false));
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

interface State {
	applications: Application[];
	isLoading: boolean;
}

const initialState: State = {
	applications: [] as Application[],
	isLoading: true,
};

const applicationsSlice = createSlice({
	name: "Applications",
	initialState,
	reducers: {
		setApplications: (state, action: PayloadAction<Application[]>) => {
			state.applications = action.payload;
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
	},
});

export const { setApplications, setIsLoading } = applicationsSlice.actions;

export default applicationsSlice.reducer;

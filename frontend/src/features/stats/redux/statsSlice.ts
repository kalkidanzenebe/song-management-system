import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stats } from '../types/stats';

interface StatsState {
    stats: Stats | null;
    loading: boolean;
    error: string | null;
}

const initialState: StatsState = {
    stats: null,
    loading: false,
    error: null,
};

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        fetchStatsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchStatsSuccess: (state, action: PayloadAction<Stats>) => {
            state.loading = false;
            state.stats = action.payload;
        },
        fetchStatsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchStatsRequest,
    fetchStatsSuccess,
    fetchStatsFailure,
} = statsSlice.actions;

export default statsSlice.reducer;

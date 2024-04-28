import { createSlice } from '@reduxjs/toolkit'

export const timeSlice = createSlice({
    name: "time",
    initialState: {
            value: 0,
            isRunning: false,
            intervalId: ""
        },
    reducers : {
        changeStopwatchState: ( state, action ) => {
            state.isRunning = !state.isRunning
        },
        setTime: (state, action) => {
            state.value = action.payload.value;
            state.intervalId = action.payload.intervalId;
        },
        resetTime: (state, action) => {
            state.value = 0;
            state.isRunning = false;
        }
    }
})

export const {changeStopwatchState, setTime, resetTime} = timeSlice.actions;

export default timeSlice.reducer
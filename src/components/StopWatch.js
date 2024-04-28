import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import {setTime, changeStopwatchState, resetTime} from "../features/time";

const Stopwatch = (props) => {

    // Set local state
    // const [time, setTime] = useState(0);

    // useSelector is used to access values
    const state = useSelector( (state) => state.time)
    const time = state.value;
    const isRunning = state.isRunning
    const intervalId = state.intervalId;

    // useDispatch is used to change values
    const dispatch = useDispatch()

    const formatTimeUnit = (unit) => {
        return unit.toString().padStart(2, "0");
    };

    const {hours, minutes, seconds, milliseconds } = formatTime(time)

    useEffect(() => {
        let tempIntervalId;
        if (isRunning) {
            tempIntervalId = setInterval(() => {
                dispatch(setTime({
                    value: time + 1,
                    intervalId: tempIntervalId
                }));
            }, 10);
        } else if (!isRunning && intervalId) {
            clearInterval(intervalId);
            dispatch(setTime({
                value: time,
                intervalId: null
            }));
        }
        return () => {
            if (tempIntervalId) {
                clearInterval(tempIntervalId);
            }
        };

    }, [isRunning, time]);


    return (
        <div className="stopwatch-container">
            <p className="stopwatch-time">
                {formatTimeUnit(hours)}:{formatTimeUnit(minutes)}:
                {formatTimeUnit(seconds)}:{formatTimeUnit(milliseconds)}
            </p>
            <div className="stopwatch-buttons">
                <button className="stopwatch-button" onClick={() => {
                    dispatch(changeStopwatchState())
                }}>
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button className="stopwatch-button" onClick={() => {
                    dispatch(resetTime())
                }}>
                    Reset
                </button>
            </div>
        </div>
    );
};

function formatTime(time){
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    return {hours, minutes, seconds, milliseconds}
}
export default Stopwatch
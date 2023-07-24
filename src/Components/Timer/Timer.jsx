import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import "./Timer.css";

const Timer = ({ minutes, seconds }) => {
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [[m, s], setTime] = useState([minutes, seconds]);

    const tick = () => {
        if (paused || over) return;

        if (m === 0 && s === 0) {
            setOver(true);
        } else if (s == 0) {
            setTime([m - 1, 59]);
        } else {
            setTime([m, s - 1]);
        }
    };

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    });

    return (
        <span className="description">
            <button className="icon icon-play" onClick={() => setPaused(true)}></button>
            <button className="icon icon-pause" onClick={() => setPaused(false)}></button>
            {`${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`}
        </span>
    );
};

Timer.defaultProps = {
    minutes: 0,
    seconds: 0
};

Timer.propTypes = {
    minutes: PropTypes.number,
    seconds: PropTypes.number,
};

export default Timer;
export const timer = ({ minutes, seconds, setTimeInState, taskId }) => {
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
        const timerID = setInterval(() => {
            setTimeInState(m, s, taskId);
            tick();
        }, 1000);
        return () => clearInterval(timerID);
    });
};

Timer.defaultProps = {
    minutes: 0,
    seconds: 0,
};

Timer.propTypes = {
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    taskId: PropTypes.number,
    setTimeInState: PropTypes.func,
};
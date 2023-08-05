import PropTypes from "prop-types"

const Timer = ({ minutes, seconds, onTimerPaused, taskId }) => {
	return (
		<span className="description">
			<button className="icon icon-pause" onClick={() => onTimerPaused(taskId, false)}></button>
			<button className="icon icon-play" onClick={() => onTimerPaused(taskId, true)}></button>
			{`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
		</span>
	);
};

Timer.defaultProps = {
	minutes: 0,
	seconds: 0,
};

Timer.propTypes = {
	minutes: PropTypes.number,
	seconds: PropTypes.number,
	onTimerPaused: PropTypes.func,
	taskId: PropTypes.number,
};

export default Timer;

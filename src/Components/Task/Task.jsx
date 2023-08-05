import "./Task.css";
import { formatDistanceToNow } from "date-fns";
import KG from "date-fns/locale/en-AU";
import PropTypes from "prop-types";

const Task = ({ active, label, timer, timeBeginCreate, onToggleDone, taskId, onDeleteTask, onTimerPaused }) => {
	let checkboxChecked = !active;

	return (
		<div className="view">
			<input
				className="toggle"
				type="checkbox"
				checked={checkboxChecked}
				onChange={() => onToggleDone(taskId)}
			/>
			<label>
				<span className="title">{label}</span>
				{active ? (
					<Timer
						seconds={timer.seconds}
						minutes={timer.minutes}
						onTimerPaused={onTimerPaused}
						taskId={taskId}
					/>
				) : (
					<span className="description">00:00</span>
				)}
				<span className="description">
					{`created ${formatDistanceToNow(timeBeginCreate, {
						includeSeconds: true,
						locale: KG,
						addSuffix: true,
					})}`}
				</span>
			</label>
			<button className="icon icon-edit"></button>
			<button className="icon icon-destroy" onClick={() => onDeleteTask(taskId)}></button>
		</div>
	);
};

Task.defaultProps = {
	// onToggleDone: () => {},
	// onDeleTask: () => {},
};

Task.propTypes = {
	active: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	timeBeginCreate: PropTypes.object.isRequired,
	taskId: PropTypes.number.isRequired,
	onToggleDone: PropTypes.func,
	onDeleteTask: PropTypes.func,
	setTimeInState: PropTypes.func,
	onTimerPaused: PropTypes.func
};

export default Task;

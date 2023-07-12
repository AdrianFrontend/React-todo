import "./Task.css";
import { formatDistanceToNow } from "date-fns";
import KG from "date-fns/locale/en-AU";
import PropTypes from "prop-types";

const Task = ({active, label, timeBeginCreate, onToggleDone, taskId, onDeleteTask}) => {
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
				<span className="description">{label}</span>
				<span className="created">
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
};

export default Task;

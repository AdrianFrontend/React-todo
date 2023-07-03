import "./Task.css";
import { formatDistanceToNow } from "date-fns";
import KG from "date-fns/locale/en-AU";
import PropTypes from "prop-types";

const Task = (props) => {
	let checkboxChecked = props.taskStatus === "Active task" ? false : true;

	return (
		<div className="view">
			<input
				className="toggle"
				type="checkbox"
				checked={checkboxChecked}
				onChange={() => props.onToggleDone(props.taskId)}
			/>
			<label>
				<span className="description">{props.label}</span>
				<span className="created">
					{`created ${formatDistanceToNow(props.timeBeginCreate, {
						includeSeconds: true,
						locale: KG,
						addSuffix: true,
					})}`}
				</span>
			</label>
			<button className="icon icon-edit"></button>
			<button className="icon icon-destroy" onClick={() => props.onDeleteTask(props.taskId)}></button>
		</div>
	);
};

Task.defaultProps = {
	// onToggleDone: () => {},
	// onDeleTask: () => {},
};

Task.propTypes = {
	taskStatus: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	timeBeginCreate: PropTypes.object.isRequired,
	taskId: PropTypes.number.isRequired,
	onToggleDone: PropTypes.func,
	onDeleteTask: PropTypes.func,
};

export default Task;

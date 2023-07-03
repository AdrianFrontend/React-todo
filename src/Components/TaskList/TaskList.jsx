import Task from "../Task/Task";
import "./TaskList.css";
import PropTypes from "prop-types";

const TaskList = (props) => {
	const tasks = props.tasksData.map((item) => {
		const taskClassName = item.taskStatus.split(" ")[0].toLowerCase();

		return (
			<li className={taskClassName} key={item.id}>
				<Task
					taskStatus={item.taskStatus}
					label={item.label}
					timeBeginCreate={item.timeBeginCreate}
					onToggleDone={props.onToggleDone}
					taskId={item.id}
					onDeleteTask={props.onDeleteTask}
				/>
			</li>
		);
	});

	return <ul className="todo-list">{tasks}</ul>;
};

TaskList.defaultProps = {
	// onToggleDone: () => {},
	// onDeleteTask: () => {},
};

TaskList.propTypes = {
	tasksData: PropTypes.arrayOf(
		PropTypes.shape({
			taskStatus: PropTypes.string,
			label: PropTypes.string,
			timeBeginCreate: PropTypes.object,
			taskId: PropTypes.number,
		})
	),
	onToggleDone: PropTypes.func,
	onDeleteTask: PropTypes.func,
};

export default TaskList;

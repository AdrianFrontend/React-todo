import Task from "../Task/Task";
import "./TaskList.css";
import PropTypes from "prop-types";

const TaskList = ({tasksData, onToggleDone, onDeleteTask}) => {
	const tasks = tasksData.map((item) => {
		const taskClassName = item.active ? "active" : "completed";

		return (
			<li className={taskClassName} key={item.id}>
				<Task
					active={item.active}
					label={item.label}
					timeBeginCreate={item.timeBeginCreate}
					onToggleDone={onToggleDone}
					taskId={item.id}
					onDeleteTask={onDeleteTask}
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
			active: PropTypes.bool,
			label: PropTypes.string,
			timeBeginCreate: PropTypes.object,
			taskId: PropTypes.number,
		})
	),
	onToggleDone: PropTypes.func,
	onDeleteTask: PropTypes.func,
};

export default TaskList;

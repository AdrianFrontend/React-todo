import Task from "../Task/Task";
import "./TaskList.css";
import PropTypes from "prop-types";

const TaskList = ({ tasksData, onToggleDone, onDeleteTask, setTimeInState, onTimerPaused, onSubmitChanges }) => {
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
					setTimeInState={setTimeInState}
					onTimerPaused={onTimerPaused}
					timer={item.timer}
					onSubmitChanges={onSubmitChanges}
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
	setTimeInState: PropTypes.func,
	onTimerPaused: PropTypes.func,
	onSubmitChanges: PropTypes.func,
};

export default TaskList;

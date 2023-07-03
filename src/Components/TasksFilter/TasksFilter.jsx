import PropTypes from "prop-types";
import "./TasksFilter.css";

const TasksFilter = (props) => {
	return (
		<ul className="filters">
			<li>
				<button
					className={props.filter === "All" ? "selected" : ""}
					onClick={() => props.onChangeFilter("All")}
				>
					All
				</button>
			</li>
			<li>
				<button
					className={props.filter === "Active" ? "selected" : ""}
					onClick={() => props.onChangeFilter("Active")}
				>
					Active
				</button>
			</li>
			<li>
				<button
					className={props.filter === "Completed" ? "selected" : ""}
					onClick={() => props.onChangeFilter("Completed")}
				>
					Completed
				</button>
			</li>
		</ul>
	);
};

TasksFilter.defaultProps = {
	filter: "All",
	// onChangeFilter: () => {},
};

TasksFilter.propTypes = {
	filter: PropTypes.string,
	onChangeFilter: PropTypes.func,
};

export default TasksFilter;

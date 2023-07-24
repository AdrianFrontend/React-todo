import PropTypes from "prop-types";
import "./TasksFilter.css";

const TasksFilter = ({ filter, onChangeFilter }) => {
	const filters = ["All", "Active", "Completed"];

	const buttons = filters.map((item, idx) => (
		<li key={idx}>
			<button className={filter === item ? "selected" : ""} onClick={() => onChangeFilter(item)}>
				{item}
			</button>
		</li>
	));

	return <ul className="filters">{buttons}</ul>;
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

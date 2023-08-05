import PropTypes from "prop-types";
import "./TasksFilter.css";

<<<<<<< Updated upstream
const TasksFilter = ({filter, onChangeFilter}) => {
  const filters = ["All", "Active", "Completed"]

  const buttons = filters.map((item, idx) => <li key={idx}>
    <button 
    className={filter === item ? "selected" : ""}
    onClick={() => onChangeFilter(item)}>{item}</button>
  </li>)
=======
const TasksFilter = ({ filter, setFilter }) => {
	const filters = ["All", "Active", "Completed"];

	const buttons = filters.map((item, idx) => (
		<li key={idx}>
			<button className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>
				{item}
			</button>
		</li>
	));
>>>>>>> Stashed changes

	return (
		<ul className="filters">
			{buttons}
		</ul>
	);
};

TasksFilter.defaultProps = {
	filter: "All",
	// onChangeFilter: () => {},
};

TasksFilter.propTypes = {
	filter: PropTypes.string,
	setFilter: PropTypes.func,
};

export default TasksFilter;

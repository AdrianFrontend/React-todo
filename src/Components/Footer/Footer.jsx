import TasksFilter from "../TasksFilter/TasksFilter";
import "./Footer.css";
import PropTypes from "prop-types";

const Footer = ({onDeleteCompleted, activeTasksCount, onChangeFilter, filter}) => {
	return (
		<footer className="footer">
			<span className="todo-count">{activeTasksCount} items left</span>
			<TasksFilter onChangeFilter={onChangeFilter} filter={filter} />
			<button className="clear-completed" onClick={onDeleteCompleted}>
				Clear completed
			</button>
		</footer>
	);
};

Footer.defaultProps = {
	activeTasksCount: 0,
	filter: "All",
	// onChangeFilter: () => {},
	// onDeleteCompleted: () => {},
};

Footer.propTypes = {
	activeTasksCount: PropTypes.number,
	filter: PropTypes.string,
	onChangeFilter: PropTypes.func,
	onDeleteCompleted: PropTypes.func,
};

export default Footer;

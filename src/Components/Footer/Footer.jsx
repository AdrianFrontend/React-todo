import TasksFilter from "../TasksFilter/TasksFilter";
import "./Footer.css";
import PropTypes from "prop-types";

const Footer = (props) => {
	return (
		<footer className="footer">
			<span className="todo-count">{props.activeTasksCount} items left</span>
			<TasksFilter onChangeFilter={props.onChangeFilter} filter={props.filter} />
			<button className="clear-completed" onClick={props.onDeleteCompleted}>
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

import React from "react";
import "./NewTaskForm.css";
import PropTypes from "prop-types";

class NewTaskForm extends React.Component {
  constructor() {
    super()
    this.state = {
      currentInputValue: ""
    }
  }

	render() {
    const {onAddTask} = this.props

		const onSubmit = (e) => {
			e.preventDefault();
			if (this.state.currentInputValue === "") {
				return;
			} else if (this.state.currentInputValue.trim() === "") {
				this.setState({
					currentInputValue: "",
				});
				return;
			}

			onAddTask(this.state.currentInputValue);
			this.setState({
				currentInputValue: "",
			});
		};

		const onChange = (e) => {
			this.setState({
				currentInputValue: e.target.value,
			});
		};

		return (
			<form onSubmit={onSubmit}>
				<input
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus
					onChange={onChange}
					value={this.state.currentInputValue}
				/>
			</form>
		);
	}
}

NewTaskForm.defaultProps = {
	// onAddTask: () => {},
};

NewTaskForm.propTypes = {
	onAddTask: PropTypes.func,
};

export default NewTaskForm;

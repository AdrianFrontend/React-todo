import React from "react";
import "./NewTaskForm.css";
import PropTypes from "prop-types";

class NewTaskForm extends React.Component {
	constructor() {
		super();
		this.state = {
			currentNameInputValue: "",
			currentMinutesInputValue: "",
			currentSecondsInputValue: "",
		};
	}

	render() {
		const { onAddTask } = this.props;

		const onSubmit = (e) => {
			e.preventDefault();
			if (this.state.currentNameInputValue === "") {
				return;
			} else if (this.state.currentNameInputValue.trim() === "") {
				this.setState({
					currentNameInputValue: "",
					currentMinutesInputValue: "",
					currentSecondsInputValue: "",
				});
				return;
			}

			onAddTask(this.state.currentNameInputValue, {
				minutes: Number(this.state.currentMinutesInputValue),
				seconds: Number(this.state.currentSecondsInputValue),
			});

			this.setState({
				currentNameInputValue: "",
				currentMinutesInputValue: "",
				currentSecondsInputValue: "",
			});
		};

		const onChange = (e, name, validation) => {
			if (
				(validation === "number" && !!Number(e.target.value) && e.target.value <= 60) ||
				e.target.value.length === 0
			) {
				this.setState({
					[name]: e.target.value,
				});
			} else if (validation === "none") {
				this.setState({
					[name]: e.target.value,
				});
			}
		};

		return (
			<form onSubmit={onSubmit} className="new-todo-form">
				<input
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus
					onChange={(e) => onChange(e, "currentNameInputValue", "none")}
					value={this.state.currentNameInputValue}
				/>
				<input
					className="new-todo-form__timer"
					placeholder="Min"
					onChange={(e) => onChange(e, "currentMinutesInputValue", "number")}
					value={this.state.currentMinutesInputValue}
					maxLength={2}
				/>
				<input
					className="new-todo-form__timer"
					placeholder="Sec"
					onChange={(e) => onChange(e, "currentSecondsInputValue", "number")}
					value={this.state.currentSecondsInputValue}
					maxLength={2}
				/>
				<button
					type="submit"
					style={{
						width: 0,
						height: 0,
					}}
				></button>
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

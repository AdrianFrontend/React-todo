import { useMemo, useState } from "react";
import "./NewTaskForm.css";
import PropTypes from "prop-types";

const NewTaskForm = ({ onAddTask }) => {
	const initialState = useMemo(() => {
		return {
			currentNameInputValue: "",
			currentMinutesInputValue: "",
			currentSecondsInputValue: "",
		};
	}, []);

	const [inputValues, setInputValues] = useState(initialState);

	const onSubmit = (e) => {
		e.preventDefault();

		if (inputValues.currentNameInputValue === "") {
			return;
		} else if (inputValues.currentNameInputValue.trim() === "") {
			setInputValues(initialState);
			return;
		}

		onAddTask(inputValues.currentNameInputValue, {
			minutes: Number(inputValues.currentMinutesInputValue),
			seconds: Number(inputValues.currentSecondsInputValue),
		});

		setInputValues(initialState);
	};

	const onChange = (e, name, validation) => {
		if (
			(validation === "number" && !!Number(e.target.value) && e.target.value <= 60) ||
			e.target.value.length === 0
		) {
			setInputValues({
				...inputValues,
				[name]: e.target.value,
			});
		} else if (validation === "none") {
			setInputValues({
				...inputValues,
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
				value={inputValues.currentNameInputValue}
			/>
			<input
				className="new-todo-form__timer"
				placeholder="Min"
				onChange={(e) => onChange(e, "currentMinutesInputValue", "number")}
				value={inputValues.currentMinutesInputValue}
				maxLength={2}
			/>
			<input
				className="new-todo-form__timer"
				placeholder="Sec"
				onChange={(e) => onChange(e, "currentSecondsInputValue", "number")}
				value={inputValues.currentSecondsInputValue}
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
};

NewTaskForm.defaultProps = {
	// onAddTask: () => {},
};

NewTaskForm.propTypes = {
	onAddTask: PropTypes.func,
};

export default NewTaskForm;

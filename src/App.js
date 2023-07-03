import React from "react";

import "./App.css";
import Footer from "./Components/Footer/Footer";
import NewTaskForm from "./Components/NewTaskForm/NewTaskForm";
import TaskList from "./Components/TaskList/TaskList";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tasksData: [],
			filter: "All",
		};
	}

	render() {
		const { tasksData } = this.state;

		const activeTasksCount = tasksData.reduce((prev, item) => {
			if (item.taskStatus === "Active task") {
				return prev + 1;
			}
			return prev;
		}, 0);

		const toggleTaskState = (arr, idx, propName, newValue) => {
			const oldItem = arr[idx];
			return [...arr.slice(0, idx), { ...oldItem, [propName]: newValue }, ...arr.slice(idx + 1)];
		};

		const onToggleDone = (id) => {
			this.setState((state) => {
				const idx = state.tasksData.findIndex((item) => item.id === id);
				return {
					tasksData: toggleTaskState(
						state.tasksData,
						idx,
						"taskStatus",
						state.tasksData[idx].taskStatus === "Active task" ? "Completed task" : "Active task"
					),
				};
			});
		};

		const onAddTask = (taskLabel) => {
			this.setState({
				tasksData: [
					...tasksData,
					{
						id: this.state.tasksData.length,
						label: taskLabel,
						taskStatus: "Active task",
						timeBeginCreate: new Date(),
					},
				],
			});
		};

		const onDeleteTask = (id) => {
			this.setState((state) => {
				const idx = state.tasksData.findIndex((item) => item.id === id);

				return {
					tasksData: [...state.tasksData.slice(0, idx), ...state.tasksData.slice(idx + 1)],
				};
			});
		};

		const onChangeFilter = (filter) => {
			this.setState({
				filter: filter,
			});
		};

		const onDeleteCompleted = () => {
			this.setState({
				tasksData: tasksData.filter((item) => item.taskStatus !== "Completed task"),
			});
		};

		return (
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<NewTaskForm onAddTask={onAddTask} />
				</header>
				<section className="main">
					{this.state.filter === "All" ? (
						<TaskList tasksData={tasksData} onToggleDone={onToggleDone} onDeleteTask={onDeleteTask} />
					) : this.state.filter === "Active" ? (
						<TaskList
							tasksData={tasksData.filter((item) => item.taskStatus !== "Completed task")}
							onToggleDone={onToggleDone}
							onDeleteTask={onDeleteTask}
						/>
					) : (
						<TaskList
							tasksData={tasksData.filter((item) => item.taskStatus !== "Active task")}
							onToggleDone={onToggleDone}
							onDeleteTask={onDeleteTask}
						/>
					)}
					<Footer
						onDeleteCompleted={onDeleteCompleted}
						activeTasksCount={activeTasksCount}
						onChangeFilter={onChangeFilter}
						filter={this.state.filter}
					/>
				</section>
			</section>
		);
	}
}

export default App;

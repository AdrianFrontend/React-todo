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

    this.activeTasksCountCalc = () => this.state.tasksData.reduce((prev, item) => {
      if (item.taskStatus === "Active task") {
        return prev + 1;
      }
      return prev;
    }, 0);

    this.toggleTaskState = (arr, idx, propName, newValue) => {
			const oldItem = arr[idx];
			return [...arr.slice(0, idx), { ...oldItem, [propName]: newValue }, ...arr.slice(idx + 1)];
		};

    this.onToggleDone = (id) => {
			this.setState((state) => {
				const idx = state.tasksData.findIndex((item) => item.id === id);
				return {
					tasksData: this.toggleTaskState(
						state.tasksData,
						idx,
						"taskStatus",
						state.tasksData[idx].taskStatus === "Active task" ? "Completed task" : "Active task"
					),
				};
			});
		};

    this.onAddTask = (taskLabel) => {
			this.setState({
				tasksData: [
					...this.state.tasksData,
					{
						id: this.state.tasksData.length,
						label: taskLabel,
						taskStatus: "Active task",
						timeBeginCreate: new Date(),
					},
				],
			});
		};

    this.onDeleteTask = (id) => {
			this.setState((state) => {
				const idx = state.tasksData.findIndex((item) => item.id === id);

				return {
					tasksData: [...state.tasksData.slice(0, idx), ...state.tasksData.slice(idx + 1)],
				};
			});
		};

    this.onChangeFilter = (filter) => {
			this.setState({
				filter: filter,
			});
		};

		this.onDeleteCompleted = () => {
			this.setState({
				tasksData: this.state.tasksData.filter((item) => item.taskStatus !== "Completed task"),
			});
		};

    this.tasksFilter = (filter) => {
      if (filter === "Active") {
        return this.state.tasksData.filter((item) => item.taskStatus !== "Completed task")
      } 
      if (filter === "Completed") {
        return this.state.tasksData.filter((item) => item.taskStatus !== "Active task")
      } 
      return this.state.tasksData
    }
	}

	render() {
		return (
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<NewTaskForm onAddTask={this.onAddTask} />
				</header>
				<section className="main">
					<TaskList tasksData={this.tasksFilter(this.state.filter)} onToggleDone={this.onToggleDone} onDeleteTask={this.onDeleteTask} />
					<Footer
						onDeleteCompleted={this.onDeleteCompleted}
						activeTasksCount={this.activeTasksCountCalc()}
						onChangeFilter={this.onChangeFilter}
						filter={this.state.filter}
					/>
				</section>
			</section>
		);
	}
}

export default App;

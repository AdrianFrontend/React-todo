import { useEffect, useState } from "react";

import "./App.css";
import Footer from "./Components/Footer/Footer";
import NewTaskForm from "./Components/NewTaskForm/NewTaskForm";
import TaskList from "./Components/TaskList/TaskList";

const App = () => {

	const [tasksData, setTasksData] = useState([])
	const [filter, setFilter] = useState("All")

	const tick = () => {

		tasksData.forEach(item => {
			if (item.timer.paused || item.timer.over || !item.active) return;

			if (item.timer.minutes === 0 && item.timer.seconds === 0) {
				const idx = tasksData.findIndex((i) => i.id === item.id);

				toggleTaskState(tasksData, idx, "timer", (tasksData[idx].timer = {
					minutes: tasksData[idx].timer.minutes,
					seconds: tasksData[idx].timer.seconds,
					over: true,
					paused: tasksData[idx].timer.paused
				}));
			} else if (item.timer.seconds == 0) {
				setTimeInState(item.timer.minutes - 1, 59, item.id);
			} else {
				setTimeInState(item.timer.minutes, item.timer.seconds - 1, item.id);
			}
		})
	};

	useEffect(() => {
		const timerID = setInterval(() => {
			tick();
		}, 1000);
		return () => clearInterval(timerID);
	});


	const activeTasksCountCalc = () => {
		return tasksData.reduce((prev, item) => {
			if (item.active) {
				return prev + 1;
			}
			return prev;
		}, 0);
	}

	const toggleTaskState = (arr, idx, propName, newValue) => {
		const oldItem = arr[idx];
		return [...arr.slice(0, idx), { ...oldItem, [propName]: newValue }, ...arr.slice(idx + 1)];
	};

	const onToggleDone = (id) => {
		const idx = tasksData.findIndex((item) => item.id === id);

		setTasksData(
			toggleTaskState(
				tasksData,
				idx,
				"active",
				(tasksData[idx].active = !tasksData[idx].active)
			)
		);

	};

	const onTimerPaused = (id, pause) => {
		const idx = tasksData.findIndex((i) => i.id === id);


		toggleTaskState(tasksData, idx, "timer", (tasksData[idx].timer = {
			minutes: tasksData[idx].timer.minutes,
			seconds: tasksData[idx].timer.seconds,
			over: tasksData[idx].timer.over,
			paused: pause
		}))
	}

	const onAddTask = (taskLabel, timer) => {
		setTasksData([
			...tasksData,
			{
				id: tasksData.length,
				label: taskLabel,
				timer: {
					minutes: timer.minutes,
					seconds: timer.seconds,
					paused: false,
					over: false,
				},
				active: true,
				timeBeginCreate: new Date(),
			},
		],
		);
	};

	const setTimeInState = (m, s, id) => {
		setTasksData((prevState) => {
			const idx = tasksData.findIndex((item) => item.id === id);

			return [
				...prevState.slice(0, idx),
				(prevState[idx] = { ...prevState[idx], timer: { minutes: m, seconds: s, paused: false, over: false } }),
				...prevState.slice(idx + 1),
			]
		});
	};


	const onDeleteTask = (id) => {
		setTasksData((prevState) => {
			const idx = prevState.findIndex((item) => item.id === id);

			return [...prevState.slice(0, idx), ...prevState.slice(idx + 1)]
		});
	};

	const onDeleteCompleted = () => {
		setTasksData((prevState) => {
			return prevState.filter((item) => item.active !== false)
		});
	};

	const tasksFilter = (filter) => {
		if (filter === "Active") {
			return tasksData.filter((item) => item.active !== false);
		}
		if (filter === "Completed") {
			return tasksData.filter((item) => item.active !== true);
		}
		return tasksData;
	};



	return (
		<section className="todoapp">
			<header className="header">
				<h1>todos</h1>
				<NewTaskForm onAddTask={onAddTask} />
			</header>
			<section className="main">
				<TaskList
					tasksData={tasksFilter(filter)}
					onTimerPaused={onTimerPaused}
					onToggleDone={onToggleDone}
					onDeleteTask={onDeleteTask}
					setTimeInState={setTimeInState}
				/>
				<Footer
					onDeleteCompleted={onDeleteCompleted}
					activeTasksCount={activeTasksCountCalc()}
					setFilter={setFilter}
					filter={filter}
				/>
			</section>
		</section>
	);

}

export default App;
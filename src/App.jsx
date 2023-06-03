import "./reset.css";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import EventCard from "./components/EventCard/EventCard";
import Form from "./components/Form/Form";

function App() {
	const [events, setEvents] = useState([]);
	const [savedTimelines, setSavedTimelines] = useState([]);
	const nameInput = useRef();

	const saveTimeline = (e) => {
		e.preventDefault();
		if (nameInput.current.value === "") {
			alert("Timeline has to have a name");
			return;
		}
		const timeline = JSON.stringify(events);
		localStorage.setItem(`${nameInput.current.value.toLowerCase()}`, timeline);
		nameInput.current.value = "";
		getSavedTimelines();
	};

	const loadTimeline = (e) => {
		e.preventDefault();
		const data = JSON.parse(
			localStorage.getItem(`${nameInput.current.value.toLowerCase()}`)
		);
		if (!data) {
			alert("We could not find that timeline");
			return;
		}
		setEvents(data);
		nameInput.current.value = "";
	};

	const getSavedTimelines = () => {
		let timelineArr = [];
		const timelines = { ...localStorage };
		for (let x in timelines) {
			timelineArr.push(x);
		}
		setSavedTimelines(timelineArr);
	};

	const deleteTimeline = (e) => {
		localStorage.removeItem(`${nameInput.current.value}`);
		nameInput.current.value = "";
		getSavedTimelines();
	};

	// const clearTimelines = () => {
	// 	localStorage.clear();
	// 	getSavedTimelines();
	// };

	useEffect(() => {
		getSavedTimelines();
	}, []);

	return (
		<>
			<div className="save">
				<input ref={nameInput} type="text" placeholder="Timeline Name" />
				<div>
					<button onClick={(e) => saveTimeline(e)}>Save</button>
					<button onClick={(e) => loadTimeline(e)}>Load</button>
					<button onClick={(e) => deleteTimeline(e)}>Delete</button>
					{/* <button onClick={(e) => clearTimelines(e)}>Clear</button> */}
					<ul>
						<strong>Timelines:</strong>
						{savedTimelines.map((timeline) => {
							return <li key={timeline}>{timeline}</li>;
						})}
					</ul>
				</div>
			</div>
			<div className="timeline">
				{events.map((event, i) => {
					return (
						<EventCard
							key={i}
							setEvents={setEvents}
							title={event.title}
							date={event.date}
							edit={event.edit}
						></EventCard>
					);
				})}
			</div>
			<Form buttonTitle="Add" setEvents={setEvents}></Form>
		</>
	);
}

export default App;

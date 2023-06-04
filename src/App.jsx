import "./reset.css";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import EventCard from "./components/EventCard/EventCard";
import Form from "./components/Form/Form";

function App() {
	const [events, setEvents] = useState([]);
	const [savedTimelines, setSavedTimelines] = useState([]);
	const [areYouSure, setAreYouSure] = useState(false);
	const [text, setText] = useState("");
	const nameInput = useRef();

	const saveTimeline = (e) => {
		e.preventDefault();
		if (nameInput.current.value === "") {
			alert("Timeline has to have a name");
			return;
		}
		if (e.target.innerText === "Save") {
			setAreYouSure(true);
			setText("Are you sure you want to save?");
			return;
		}
		if (e.target.innerText === "Yes") {
			const timeline = JSON.stringify(events);
			localStorage.setItem(
				`${nameInput.current.value.toLowerCase()}`,
				timeline
			);
			setAreYouSure(false);
			getSavedTimelines();
			return;
		}
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
		if (e.target.innerText === "Delete") {
			const data = JSON.parse(
				localStorage.getItem(`${nameInput.current.value.toLowerCase()}`)
			);
			if (!data) {
				alert("We could not find that timeline");
				return;
			}
			setText("Are you sure you want to delete this timeline?");
			setAreYouSure(true);
			return;
		}

		if (e.target.innerText === "No") {
			setAreYouSure(false);
			return;
		}

		if (e.target.innerText === "Yes") {
			localStorage.removeItem(`${nameInput.current.value}`);
			setAreYouSure(false);
			nameInput.current.value = "";
			getSavedTimelines();
			return;
		}
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
			{areYouSure ? (
				<div className="modal">
					<h1>{text}</h1>
					<div>
						<button
							onClick={
								text === "Are you sure you want to delete this timeline?"
									? (e) => deleteTimeline(e)
									: (e) => saveTimeline(e)
							}
						>
							Yes
						</button>
						<button onClick={(e) => deleteTimeline(e)}>No</button>
					</div>
				</div>
			) : undefined}
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

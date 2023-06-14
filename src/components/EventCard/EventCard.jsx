import "./EventCard.css";
import { useState } from "react";
import Form from "../Form/Form";

const EventCard = (props) => {
	const [position, setPosition] = useState(0)
	const deleteEvent = (id) => {
		props.setEvents((prev) => {
			return prev.filter((event, i) => {
				return i !== id;
			});
		});
	};

	const handleClick = (id) => {
		props.setEvents((prev) => {
			return prev.map((event, i) => {
				if (i === id) {
					return { ...event, edit: !event.edit };
				} else return event;
			});
		});
	};

	const increaseHeight = (id) => {
		props.setEvents((prev) => {
			return prev.map((event, i) => {
				if (i === id) {
					return { ...event, height: event.height + 5 };
				} else return event;
			});
		});
	};

	const decreaseHeight = (id) => {
		props.setEvents((prev) => {
			return prev.map((event, i) => {
				if (i === id) {
					return { ...event, height: event.height - 5 };
				} else return event;
			});
		});
	};

	const translateRight = () => {
		setPosition((prev) => prev + .5)
	}

	const translateLeft = () => {
		setPosition((prev) => prev - .5)
	}

	const scale = (100 - props.eventsLength * 0.9) / 100;

	const style = {
		scale: `${scale}`,
		translate: `${position}rem 0`
	};

	return (
		<div className="event" style={style}>
			{props.hideAll ? undefined : (
				<>
					<button onClick={() => increaseHeight(props.id)}>+</button>
					<div className="translate">
						<button onClick={translateLeft}>&#8592;</button>
						<button onClick={translateRight}>&#8594;</button>
					</div>
					<button onClick={() => handleClick(props.id)}>Edit</button>
				</>
			)}
			{props.edit ? (
				<Form
					id={props.id}
					title={props.title}
					date={props.date}
					extraClasses={"edit-form"}
					setEvents={props.setEvents}
					buttonTitle="Save"
				></Form>
			) : (
				<>
					<h1>{props.title}</h1>
					<div
						className="event-bar"
						style={{ height: `${props.height}rem` }}
					></div>
					<h2>{props.date}</h2>
					{props.hideAll ? undefined : (
						<button onClick={() => deleteEvent(props.id)}>Delete</button>
					)}
				</>
			)}
			{props.hideAll ? undefined : (
				<button onClick={() => decreaseHeight(props.id)}>-</button>
			)}
		</div>
	);
};

export default EventCard;

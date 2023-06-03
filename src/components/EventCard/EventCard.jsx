import "./EventCard.css";
import Form from "../Form/Form";

const EventCard = (props) => {
	const deleteEvent = (title) => {
		props.setEvents((prev) => {
			return prev.filter((event) => {
				return event.title !== title;
			});
		});
	};

	const handleClick = (title) => {
		props.setEvents((prev) => {
			return prev.map((event) => {
				if (event.title === title) {
					return { ...event, edit: !event.edit };
				} else return event;
			});
		});
	};

	return (
		<div className="event">
			<button onClick={() => handleClick(props.title)}>Edit</button>
			{props.edit ? (
				<Form
					title={props.title}
					date={props.date}
					extraClasses={"edit-form"}
					setEvents={props.setEvents}
					buttonTitle="Save"
				></Form>
			) : (
				<>
					<h1>{props.title}</h1>
					<div className="event-bar"></div>
					<h2>{props.date}</h2>
					<button onClick={() => deleteEvent(props.title)}>Delete</button>
				</>
			)}
		</div>
	);
};

export default EventCard;

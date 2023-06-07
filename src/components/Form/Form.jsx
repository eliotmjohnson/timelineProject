import "./Form.css";
import { useRef } from "react";

const Form = (props) => {
	const titleInput = useRef();
	const dateInput = useRef();

	const handleSubmit = (e, button) => {
		e.preventDefault();

		const title = titleInput.current.value;
		const date = dateInput.current.value;

		if (button === "Add") {
			props.setEvents((prev) => {
				return [...prev, { title: title, date: date, edit: false, height: 5 }].sort(
					(a, b) => {
						const numA =
							(a.date.toLowerCase().includes("bc") ? -1 : 1) *
							a.date.replace(/\D/g, "");
						const numB =
							(b.date.toLowerCase().includes("bc") ? -1 : 1) *
							b.date.replace(/\D/g, "");
						return numA - numB;
					}
				);
			});
		}
		if (button === "Save") {
			props.setEvents((prev) => {
				return prev
					.map((event, id) => {
						if (id === props.id) {
							return { ...event, date: date, title: title, edit: false };
						} else return event;
					})
					.sort((a, b) => {
						const numA =
							(a.date.toLowerCase().includes("bc") ? -1 : 1) *
							a.date.replace(/\D/g, "");
						const numB =
							(b.date.toLowerCase().includes("bc") ? -1 : 1) *
							b.date.replace(/\D/g, "");
						return numA - numB;
					});
			});
		}

		titleInput.current.value = "";
		dateInput.current.value = "";
	};

	return (
		<form
			className={`form ` + props.extraClasses}
			onSubmit={(e) => handleSubmit(e, props.buttonTitle)}
		>
			<label htmlFor="">Title</label>
			<input defaultValue={props.title} ref={titleInput} type="text" />
			<label htmlFor="">Date</label>
			<input defaultValue={props.date} ref={dateInput} type="text" />
			<button>{props.buttonTitle}</button>
		</form>
	);
};

export default Form;

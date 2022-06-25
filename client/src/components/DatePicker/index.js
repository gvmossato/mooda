import "./styles.scoped.css";


function DatePicker(props) {
    return (
        <input
            value={props.value}
            type="date"
            onChange={(event) => props.onChange(event)}
        ></input>
    );
}

export default DatePicker;

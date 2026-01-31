export default function SecondayButton({ onClick, text, icon }) {
    return (
        <button onClick={onClick} className="secondary-button ">
            {icon}
            {text && <span>{text}</span>}
        </button>
    );
}

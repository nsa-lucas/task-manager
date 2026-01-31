import './style.css';

export default function SecondayButton({ onClick, text, icon }) {
    return (
        <button onClick={onClick} className="secondary-button ">
            {icon}
            <span>{text}</span>
        </button>
    );
}

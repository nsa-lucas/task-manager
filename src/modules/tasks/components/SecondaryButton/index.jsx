import { Container } from './style.js';

export default function SecondayButton({ onClick, text, icon }) {
    return (
        <Container onClick={onClick}>
            {icon}
            {text && <span>{text}</span>}
        </Container>
    );
}

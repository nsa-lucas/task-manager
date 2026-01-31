import { Container } from './style.js';

export default function PrimaryButton({ onClick, icon, text }) {
    return (
        <Container onClick={onClick}>
            {icon}
            {text}
        </Container>
    );
}

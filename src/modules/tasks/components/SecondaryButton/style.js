import styled from 'styled-components';

export const Container = styled.button`
    font-size: 1rem;
    color: #fff;
    background: var(--red);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;
    animation: fadeIn 0.2s ease-out;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &:hover {
        filter: brightness(0.9);
    }

    @keyframes fadeIn {
        from {
            transform: translateX(-100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

import styled from 'styled-components';

export const Container = styled.button`
    font-size: 1rem;
    color: #fff;
    background: var(--violet-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &:hover {
        filter: brightness(0.9);
    }
`;

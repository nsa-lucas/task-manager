import styled from 'styled-components';

export const Container = styled.header`
    background: var(--violet-light);
`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
        display: flex;
        align-items: center;

        gap: 12px;
        a {
            font-size: 1rem;
            color: #fff;
            display: flex;
            align-items: center;

            gap: 4px;
            padding: 0.25rem 0.5rem;

            text-decoration: none;

            border: 1px solid #fff;
            border-radius: 8px;

            transition:
                background 0.2s,
                border-color 0.2s;

            &:hover {
                background: var(--violet);
                border-color: var(--violet);
            }
        }
    }
`;

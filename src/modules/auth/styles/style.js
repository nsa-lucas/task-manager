import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: row;

    .logo {
        max-width: 300px;
    }

    @media (max-width: 680px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const Hero = styled.div`
    width: 70%;
    height: 100dvh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 1rem;

    z-index: 1;

    .hero {
        .bg-hero {
            max-width: 500px;
            width: 100%;
            background-size: contain;
        }
    }

    @media (min-width: 1280px) {
        width: 75vw;
    }

    @media (max-width: 1120px) {
        width: 60%;
    }

    @media (max-width: 680px) {
        margin-bottom: 5rem;
        height: 20dvh;
    }
`;

export const Content = styled.div`
    width: 30%;
    height: 100dvh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;

    background: var(--violet-light);

    @media (min-width: 1280px) {
        width: 25vw;
    }

    @media (max-width: 1120px) {
        width: 40%;
    }

    @media (max-width: 680px) {
        width: 60%;
        height: 30dvh;

        background: #fff;
        border-radius: 0.25rem;
    }

    @media (max-width: 540px) {
        width: 80%;
    }
`;

export const Form = styled.div`
    padding: 2rem;
    background: #fff;

    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    .icon-home {
        position: absolute;
        top: 1rem;
        left: 1rem;
        .link-home {
            color: #fff;
        }
    }

    .h-form {
        display: flex;
        justify-content: space-between;
        align-items: start;

        h1 {
            color: var(--violet);
        }

        img {
            height: 37px;
        }
    }

    .input-group {
        display: flex;
        flex-direction: column;

        label {
            color: var(--text-title);
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
        }

        input {
            width: 100%;
            padding: 0 1.5rem;
            height: 3rem;
            border-radius: 0.25rem;

            border: 1px solid #d7d7d7;
            background: var(--background);

            font-weight: 400;
            font-size: 1rem;

            &::placeholder {
                color: var(--text-body);
            }

            &:focus {
                outline-color: var(--violet);
            }
        }

        a {
            color: var(--violet);
            margin-top: 1rem;
        }

        .password-group {
            position: relative;
            display: flex;
            align-items: center;

            .btn-visible {
                border: none;
                background: none;
                color: var(--violet);
                position: absolute;

                right: 0.5rem;

                width: 22px;
                height: 22px;
            }
        }
    }

    .error-msg {
        color: var(--red);
    }

    .toRegister {
        a {
            color: var(--violet);
        }
    }

    @media (max-width: 680px) {
        .icon-home {
            position: inherit;
            .link-home {
                color: var(--violet);
            }
        }
    }
`;

import styled from "styled-components";

export const HomeContainer = styled.div`
    width: 100vw;
    `

export const HomeContent = styled.section`
    margin: 0 auto;
    width: 50%;
    
    div {
        justify-content: center;
        display: flex;
        gap: 0.5rem;

        button {
            padding: 5px;
            border-radius: 6px;
            border-color: #0d6efd;
            color: #0d6efd;
            cursor: pointer;
        }
    }
`

export const DeliveryContent = styled.section`
    margin-top: 5rem;

    div {
        display: flex;
        flex-direction: column;
        border: 2px solid #0d6efd;
        margin-top: 20px;
        border-radius: 10px;

        .addressActions {
            margin-top: 0;
            border: 0;
            display: flex;
            flex-direction: row;
            gap: 2rem;
            margin-bottom: 1rem;

            span {
                cursor: pointer;
            }

            span:first-of-type {
                &:hover {
                    color: #0d6efd;
                }
            }

            span:last-of-type {
                &:hover {
                    color: red;
                }

            }

        }
    }
`

export const DeliveryInformation = styled.article`
            width: 100%;
            display: flex;
            align-items: center;
            gap: 4rem;
            padding: 10px;

            .destinyWorld {
                max-width: 60px;
                text-align: center;
            }
            
            img {
                display: block;
                max-width: 200px;
                border-radius: 6px;
            }
            
            div {
                display: flex;
                flex-direction: column !important;
                border: 0;
                margin: 0;
                
                span {
                    background-color: #D3D3D3;
                    padding: 5px;
                    border-radius: 6px;
                }
            }
`
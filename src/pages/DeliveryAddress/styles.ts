import styled from "styled-components";

export const FormContainer = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .maxSelectContainer {
        width: 510px;

        section {
            display: flex;
            flex-direction: column;
            gap: 0.7rem;

            select {
                padding: 5px;
            }
        }
    }

    .imageContainer {
        display: none;
    }

    .imageContainer.active {
        display: block;
        max-height: 150px;
        width: 510px;
        margin-top: 0.5rem;
        border-radius: 10px;

        img {
            display: block;
            border-radius: 10px;
            border: none;
            height: 150px;
            width: 100%;
        }
    }
`

export const DeliveryForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .maxFormContainer {
        width: 70%;
        display: grid;
        margin-top: 1rem;
        grid-template-columns: repeat(2, 250px);
        justify-content: center;
        grid-gap: 0.7rem;
        
        .deliveryFormData {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-height: 120px;
            align-items: flex-start;

            &:active {
                display: flex;
            }
        }

        .deliveryFormData.inactive {
            display: none;
        }
    
        .deliveryFormData input {
            width: 200px;
            padding: 5px;
            border-radius: 6px;
            border: 1px solid black;
        }
    }
`

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
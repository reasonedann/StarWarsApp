import styled from '@emotion/styled';

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0;
`;

export const Button = styled.button`
    border: 1px solid black;
    border-radius: 5px;
    color: black;
    margin-right: 10px;
    padding: 5px;
    cursor: pointer;
    :hover {
        background: lightgray;
        color: black;
    }
`;

export const Label = styled.p`
    font-size: 18px;
    font-weight: 600;
    padding-right: 15px;
`;

export const ResetBtn = styled.button`
background: lightgray;
color: black;
cursor: pointer;
font-size: 16px;
padding: 5px 30px;
text-transform: uppercase;

:hover {
    background: silver;
    color: black;
}
`;
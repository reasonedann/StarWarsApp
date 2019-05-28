import * as React from 'react';

import styled from '@emotion/styled';

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0;
`;

const Button = styled.div`
    border-radius: 5px;
    background: darkgray;
    color: white;
    margin-right: 10px;
    padding: 5px;
    :hover {
        background: lightgray;
        color: black;
    }
`;

const Label = styled.h4`
    padding-right: 15px;
`;

interface PropsType {
    options: Array<string>,
    label: string
}

class Buttons extends React.Component<PropsType> {

    render() {
        return (
            <ButtonsContainer>
                <Label>{this.props.label}</Label>
                {(this.props.options).map((option: string) =>
                    <Button
                        key={option}
                        color={option}
                    >
                    {option.toUpperCase()}
                    </Button>
                )}
            </ButtonsContainer>
        )
    }
};

export default Buttons;
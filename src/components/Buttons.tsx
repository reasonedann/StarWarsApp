import * as React from 'react';
import { observer } from 'mobx-react';

import styled from '@emotion/styled';
import { FilterType, AppStoreComponent } from '../stores/AppStore';

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0;
`;

const Button = styled.button`
    border-radius: 10px;
    background: darkgray;
    color: white;
    margin-right: 10px;
    padding: 5px;
    cursor: pointer;
    :hover {
        background: lightgray;
        color: black;
    }
`;

const Label = styled.p`
    font-size: 18px;
    font-weight: 600;
    padding-right: 15px;
`;

interface PropsType {
    options: Array<string>,
    label: string,
    filterType: FilterType
}

@observer
class Buttons extends AppStoreComponent<PropsType> {

    handleClickToFilter = (e: any) => {
        const filterValue = e.target.value;
        this.appState.setFilter(this.props.filterType, filterValue);
    }

    render() {
        return (
            <ButtonsContainer>
                <Label>{this.props.label}</Label>
                {this.props.options.map((option: string) =>
                    <Button
                        onClick={this.handleClickToFilter}
                        key={option}
                        value={option}
                    >
                    {option.toUpperCase()}
                    </Button>
                )}
            </ButtonsContainer>
        )
    }
};

export default Buttons;
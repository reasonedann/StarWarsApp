import * as React from 'react';

import styled from '@emotion/styled';
import { AppStoreComponent, FilterType } from '../stores/AppStore';
import { observer } from 'mobx-react';

const Button = styled.button`
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

interface PropsType {
    filterType: FilterType
}

@observer
export class ResetButton extends AppStoreComponent<PropsType> {

    handleClickToDelete = (e: any) => {
        const filterValue = e.target.value;
        this.appState.setFilter(this.props.filterType, filterValue);
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClickToDelete}>Reset</Button>
            </div>
        )
    }
}
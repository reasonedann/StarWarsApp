import * as React from 'react';

import styled from '@emotion/styled';
import { AppStoreComponent, FilterType } from '../stores/AppStore';
import { observer } from 'mobx-react';

const Button = styled.button`
    border-radius: 10px;
    background: gray;
    color: white;
    font-weight: 600;
    margin-top: 20px;
    padding: 10px;
    cursor: pointer;
    :hover {
        background: lightgray;
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
                <Button onClick={this.handleClickToDelete}>Click to reset</Button>
            </div>
        )
    }
}
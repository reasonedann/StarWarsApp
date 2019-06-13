import * as React from 'react';
import { observer } from 'mobx-react';

import { AppStoreComponent } from '../stores/AppStore';
import { FilterType } from '../stores/interfaces';
import { ButtonsContainer, Label, Button } from './Buttons.style';

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
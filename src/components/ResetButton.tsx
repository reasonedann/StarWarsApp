import * as React from 'react';
import { observer } from 'mobx-react';

import { AppStoreComponent } from '../stores/AppStore';
import { FilterType } from '../stores/interfaces';
import { ResetBtn } from './Buttons.style';

interface PropsType {
    filterType: FilterType
}

@observer
class ResetButton extends AppStoreComponent<PropsType> {

    handleClickToDelete = (e: any) => {
        const filterValue = e.target.value;
        this.appState.setFilter(this.props.filterType, filterValue);
    }

    render() {
        return (
            <div>
                <ResetBtn onClick={this.handleClickToDelete}>Reset</ResetBtn>
            </div>
        )
    }
}

export default ResetButton;
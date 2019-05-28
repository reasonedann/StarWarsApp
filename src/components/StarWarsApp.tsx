import * as React from 'react';
import { observer } from 'mobx-react';

import HeroesTable from './HeroesTable';
import Buttons from './Buttons';
import { AppStoreComponent } from '../stores/AppStore';

import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    min-width: 460px;
    max-width: 1000px;
    align-items: center;
`;

@observer
export class StarWarsApp extends AppStoreComponent {

    render() {

        const {genderOptions, eyeColorOptions, skinColorOptions, hairColorOptions } = this.appState;

        return (
            <Container>
                <Buttons options={genderOptions} label={'Gender: '} />
                <Buttons options={eyeColorOptions} label={'Eye color: '} />
                <Buttons options={skinColorOptions} label={'Skin color: '} />
                <Buttons options={hairColorOptions} label={'Hair color: '} />
                <HeroesTable />
            </Container>
        );
    }
};
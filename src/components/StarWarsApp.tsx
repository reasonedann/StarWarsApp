import * as React from 'react';
import { observer } from 'mobx-react';

import HeroesTable from './HeroesTable';
import Buttons from './Buttons';
import { AppStoreComponent, FilterType } from '../stores/AppStore';

import styled from '@emotion/styled';
import { ResetButton } from './ResetButton';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px auto;
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
                <Buttons options={genderOptions} filterType={FilterType.Gender} label={'Gender: '} />
                <Buttons options={eyeColorOptions} filterType={FilterType.EyeColor} label={'Eye color: '} />
                <Buttons options={skinColorOptions} filterType={FilterType.SkinColor} label={'Skin color: '} />
                <Buttons options={hairColorOptions} filterType={FilterType.HairColor} label={'Hair color: '} />
                <ResetButton filterType={FilterType.None} />
                <HeroesTable />
            </Container>
        );
    }
};
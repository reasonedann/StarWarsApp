import * as React from 'react';
import { observer } from 'mobx-react';

import styled from '@emotion/styled';

import HeroesTable from './HeroesTable';
import Buttons from './Buttons';
import Modal from './Modal';
import { AppStoreComponent } from '../stores/AppStore';

import ResetButton from './ResetButton';
import Pagination from './Pagination';
import { FilterType } from '../stores/interfaces';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    min-width: 460px;
    max-width: 1000px;
    align-items: center;
`;

@observer
class StarWarsApp extends AppStoreComponent {

    render() {

        const {genderOptions, eyeColorOptions, skinColorOptions, hairColorOptions, heroModalData, closeModal } = this.appState;
        return (
            <Container>
                <Buttons options={genderOptions} filterType={FilterType.Gender} label={'Gender: '} />
                <Buttons options={eyeColorOptions} filterType={FilterType.EyeColor} label={'Eye color: '} />
                <Buttons options={skinColorOptions} filterType={FilterType.SkinColor} label={'Skin color: '} />
                <Buttons options={hairColorOptions} filterType={FilterType.HairColor} label={'Hair color: '} />
                <HeroesTable />
                <Modal hero={heroModalData} onClose={closeModal} />
                <Pagination />
                <ResetButton filterType={FilterType.None} />
            </Container>
        );
    }
};

export default StarWarsApp;
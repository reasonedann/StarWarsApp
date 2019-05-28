import * as React from 'react';
import Hero from './Hero';
import { observer } from 'mobx-react';
import { HeroType, AppStoreComponent } from '../stores/AppStore';

import styled from '@emotion/styled';

const TableWrapper = styled.table`
    border-collapse: collapse;
    margin-top: 30px;
`;

const Title = styled.th`
    text-transform: uppercase;
    padding: 12px 0;
    text-align: center;
    background-color: rosybrown;
    color: white;
`;

@observer
class HeroesTable extends AppStoreComponent {

    async componentDidMount() {
        await this.appState.getHeroesFromSwapi();
    }

    render() {
        const { heroes } = this.appState;

        return (
            <TableWrapper>
                <Title>Name</Title>
                <Title>Gender</Title>
                <Title>Height</Title>
                <Title>Mass</Title>
                <Title>Skin color</Title>
                <Title>Eye color</Title>
                <Title>Hair color</Title>
                {heroes.map((hero: HeroType) =>
                    <Hero
                        key={hero.url}
                        name={hero.name}
                        gender={hero.gender}
                        height={hero.height}
                        mass={hero.mass}
                        skinColor={hero.skinColor}
                        eyeColor={hero.eyeColor}
                        hairColor={hero.hairColor}
                    />
                )}
            </TableWrapper>
        );
    }
};

export default HeroesTable;
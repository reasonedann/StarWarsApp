import * as React from 'react';
import { observer } from 'mobx-react';

import { AppStoreComponent } from '../stores/AppStore';
import { HeroType } from '../stores/interfaces';
import Hero from './Hero';
import { TableWrapper, Title } from './HeroesTable.style';

@observer
class HeroesTable extends AppStoreComponent {

    // async componentDidMount() {
    //     await this.appState.getHeroesFromSwapi();
    // }

    render() {
        // const { filteredHeroes } = this.appState;

        let result = this.appState.models.getHeroes();
        switch (result.type) {
            case 'loading':
                return <h1>LOADING. Wait.</h1>;
            case 'ready':
                const heroes = result.value;
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
                                url={hero.url}
                            />
                        )}
                    </TableWrapper>
                );
        }
    }
}


export default HeroesTable;
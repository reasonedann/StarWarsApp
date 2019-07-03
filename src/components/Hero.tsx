import * as React from 'react';

import { AppStoreComponent } from '../stores/AppStore';
import { HeroTableType } from '../stores/interfaces';
import { Row, Cell } from './HeroesTable.style';

class Hero extends AppStoreComponent<HeroTableType> {

    render() {
        const comma = ', ';
        const hyphen = '-';
        const { name, height, mass, skinColor, gender, eyeColor, hairColor, url } = this.props;
        const skinColorStr = skinColor.join(comma);
        const eyeColorStr =  eyeColor.join(hyphen);
        const hairColorStr = hairColor.join(comma);
        const { redirectToHero } = this.appState.currentView;
        const id = url;

        return (
            <Row onClick={() => redirectToHero(id)}>
                <Cell>{name}</Cell>
                <Cell>{gender}</Cell>
                <Cell>{height}</Cell>
                <Cell>{mass}</Cell>
                <Cell>{skinColorStr}</Cell>
                <Cell>{eyeColorStr}</Cell>
                <Cell>{hairColorStr}</Cell>
            </Row>
        );
    }
};

export default Hero;
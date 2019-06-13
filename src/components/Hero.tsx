import * as React from 'react';

import { AppStoreComponent } from '../stores/AppStore';
import { HeroTableType } from '../stores/interfaces';
import { Row, Cell } from './HeroesTable.style';

class Hero extends AppStoreComponent<HeroTableType> {

    render() {
        const comma = ', ';
        const hyphen = '-';
        const { name, height, mass, skinColor, gender, eyeColor, hairColor, hero } = this.props;
        const skinColorStr = skinColor.join(comma);
        const eyeColorStr =  eyeColor.join(hyphen);
        const hairColorStr = hairColor.join(comma);

        return (
            <Row onClick={() => this.appState.openModal(hero)}>
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
import * as React from 'react';

import styled from '@emotion/styled';

const Row = styled.tr`
    :nth-child(even){background-color: #f2f2f2;}
    :hover {background-color: #ddd;}
`;

const Cell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    min-width: 100px;
`;

interface HeroTableType {
    name: string,
    gender: string,
    height: string,
    mass: string,
    skinColor: Array<string>,
    eyeColor: Array<string>,
    hairColor: Array<string>
}

const Hero = (props: HeroTableType) => {

    const comma = ', ';
    const hyphen = '-';

    const { name, height, mass, skinColor, gender, eyeColor, hairColor } = props;
    const skinColorStr = skinColor.join(comma);
    const eyeColorStr =  eyeColor.join(hyphen);
    const hairColorStr = hairColor.join(comma);

    return (
        <Row>
            <Cell>{name}</Cell>
            <Cell>{gender}</Cell>
            <Cell>{height}</Cell>
            <Cell>{mass}</Cell>
            <Cell>{skinColorStr}</Cell>
            <Cell>{eyeColorStr}</Cell>
            <Cell>{hairColorStr}</Cell>
        </Row>
    );
};

export default Hero;
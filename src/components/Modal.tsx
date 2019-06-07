import * as React from 'react';
import { AppStoreComponent, HeroModalType } from '../stores/AppStore';
import { observer } from 'mobx-react';

import styled from '@emotion/styled';

interface PropsTypes {
    show: boolean
}

const ModalContainer = styled.div<PropsTypes>`
    background-color: rgba(0,0,0, 0.5);
    transform: ${props => props.show ? 'translateY(0vh)' : 'translateY(-100vh)'};
    transition: all .8s;
    width: 100%;
    height: 100%;
    margin: 0;
    position: absolute;
`;

const ModalWrapper = styled.div`
    background: white;
    border: 1px solid #d0cccc;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17);
    margin: 100px auto 0;
    width: 60%;
`;

const ModalHeader = styled.header`
    background: rosybrown;
    height: 40px;
    line-height: 40px;
    padding: 5px 20px;
    text-align: right;
`;

const Title = styled.h3`
    color: white;
    float: left;
    margin: 0;
    padding: 0;
`;

const ModalBody = styled.p`
    padding: 10px 15px;
    text-align: center;
    min-height: 200px;
`;

const CloseBtn = styled.span`
    color: white;
    cursor: pointer;
    float: right;
    font-size: 30px;
    margin: 0;

    &:hover {
        color: black
    }
`;

const Info = styled.p`
    font-size: 16px;
    margin: 5px 0;
`;

const Label = styled.span`
    font-weight: 700;
`;

interface ModalPropsTypes {
    hero: HeroModalType | null,
    onClose: () => void
}

@observer
class Modal extends AppStoreComponent<ModalPropsTypes> {

    render() {

        const renderHeroData = (hero: HeroModalType) => {
            const { name, birthYear, gender, mass, height, eyeColor, hairColor, skinColor, homeworld, films, species, starships, vehicles, created, edited } = hero;
            return (
                <div>
                    <Info><Label>Name:</Label> {name}</Info>
                    <Info><Label>Year of birth:</Label> {birthYear}</Info>
                    <Info><Label>Gender:</Label> {gender}</Info>
                    <Info><Label>Mass:</Label> {mass}</Info>
                    <Info><Label>Height:</Label> {height}</Info>
                    <Info><Label>Color of eyes:</Label> {eyeColor}</Info>
                    <Info><Label>Color of hair:</Label> {hairColor}</Info>
                    <Info><Label>Color of skin:</Label> {skinColor}</Info>
                    <Info><Label>Homeworld:</Label> {homeworld}</Info>
                    <Info><Label>Films:</Label> {films}</Info>
                    <Info><Label>Species:</Label> {species}</Info>
                    <Info><Label>Starships:</Label> {starships}</Info>
                    <Info><Label>Vehicles:</Label> {vehicles}</Info>
                    <Info><Label>When was created?</Label> {created}</Info>
                    <Info><Label>When was edited?</Label> {edited}</Info>
                </div>
            )
        }
        const { hero, onClose } = this.props;
        return (
            <ModalContainer show={hero !== null}>
                <ModalWrapper>
                    <ModalHeader>
                        <Title>Read more about Star Wars' hero:</Title>
                        <CloseBtn onClick={onClose}>x</CloseBtn>
                    </ModalHeader>
                    <ModalBody>
                        {hero && renderHeroData(hero)}
                    </ModalBody>
                </ModalWrapper>
            </ModalContainer>
        )
    }
};

export default Modal;
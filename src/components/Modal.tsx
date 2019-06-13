import * as React from 'react';
import { AppStoreComponent } from '../stores/AppStore';
import { observer } from 'mobx-react';

import { HeroModalType } from 'stores/interfaces';
import { FilmTitle, Item, Info, Label, ModalContainer, ModalWrapper, ModalHeader, Title, CloseBtn, ModalBody, SearchLink } from './Modal.style';
import { ResetBtn } from './Buttons.style';
import TapIcon from './TapIcon';

interface ModalPropsTypes {
    hero: HeroModalType | null,
    onClose: () => void
}

@observer
class Modal extends AppStoreComponent<ModalPropsTypes> {

    renderHeroData(hero: HeroModalType) {
        const { name, birthYear, gender, mass, height, eyeColor, hairColor, skinColor, created, edited } = hero;
        const {  homeworld, filmTitles, species, starships, vehicles } = this.appState;

        const renderedFilms = filmTitles.map(film => <FilmTitle>{film}</FilmTitle>);
        const renderedStarships = starships.map(starship => <Item>{starship}</Item>);
        const renderedVehicles = vehicles.map(vehicle => <Item>{vehicle}</Item>);

        const creationDate = created.substring(0, 10) // funkcja która zmienia format daty????
        const editionDate = edited.substring(0, 10);
        const hrefSearch = `https://www.google.com/search?tbm=isch&source=hp&biw=1920&bih=941&ei=6IACXdz7NuOqrgT7vbfoDA&q=${name}`;

        return (
            <div>
                {name && <Info><SearchLink href={hrefSearch} target="_blank"> {name} </SearchLink></Info>}
                <TapIcon size='50px'/>
                {birthYear && <Info><Label>Year of birth:</Label> {birthYear}</Info>}
                {gender && <Info><Label>Gender:</Label> {gender}</Info>}
                {mass && <Info><Label>Mass:</Label> {mass}</Info>}
                {height && <Info><Label>Height:</Label> {height}</Info>}
                {eyeColor && <Info><Label>Color of eyes:</Label> {eyeColor}</Info>}
                {hairColor && <Info><Label>Color of hair:</Label> {hairColor}</Info>}
                {skinColor && <Info><Label>Color of skin:</Label> {skinColor}</Info>}
                {homeworld && <Info><Label>Homeworld:</Label> {homeworld}</Info>}
                {filmTitles && <Info><Label>Films:</Label> {renderedFilms}</Info>}
                {species && <Info><Label>Species:</Label> {species}</Info>}
                {starships.length  > 0 && <Info><Label>Starships:</Label> {renderedStarships}</Info>}
                {vehicles.length > 0 && <Info><Label>Vehicles:</Label> {renderedVehicles}</Info>}
                {created && <Info><Label>When was created?</Label> {creationDate}</Info>}
                {edited && <Info><Label>When was edited?</Label> {editionDate}</Info>}
            </div>
        )
    }

    notClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    }

    render() {
        const { hero, onClose } = this.props;
        return (
            <ModalContainer show={hero !== null} onClick={onClose}>
                <ModalWrapper onClick={this.notClose}>
                    <ModalHeader>
                        <Title>Read more about Star Wars' hero:</Title>
                        <CloseBtn onClick={onClose}>x</CloseBtn>
                    </ModalHeader>
                    <ModalBody>
                        {hero && this.renderHeroData(hero)}
                        <ResetBtn onClick={onClose}>Close</ResetBtn>
                    </ModalBody>
                </ModalWrapper>
            </ModalContainer>
        )
    }
};

export default Modal;
import * as React from 'react';
import { AppStoreComponent } from '../stores/AppStore';
import { observer } from 'mobx-react';

import { HeroType } from 'stores/interfaces';
import { Item, Info, Label, ModalContainer, ModalWrapper, ModalHeader, Title, CloseBtn, ModalBody, SearchLink } from './Modal.style';
import { ResetBtn } from './Buttons.style';
import TapIcon from './TapIcon';

@observer
class Modal extends AppStoreComponent {

    renderHeroData(hero: HeroType) {
        const { name, birthYear, gender, mass, height, eyeColor, hairColor, skinColor, created, edited } = hero;
        // const {  homeworld, filmTitles, species, starships, vehicles } = this.appState;

        const renderedHomeworld = <Item>hero.homeworld</Item>;

        const renderedFilms = hero.films.map(url => {
            let result = this.appState.models.getFilms(url);

            switch (result.type) {
                case 'loading':
                    return <h1>LOADING. Wait.</h1>;
                case 'ready':
                    return <Item>{result.value}</Item>
            }
        });

        const renderedStarships = hero.starships.map(url => {
            let result = this.appState.models.getStarships(url);

            switch (result.type) {
                case 'loading':
                    return <h1>LOADING. Wait.</h1>;
                case 'ready':
                    return <Item>{result.value}</Item>
            }
        });

        const renderedSpecies = hero.species.map(url => {
            let result = this.appState.models.getSpecies(url);

            switch (result.type) {
                case 'loading':
                    return <h1>LOADING. Wait.</h1>;
                case 'ready':
                    return <Item>{result.value}</Item>
            }
        });


        const renderedVehicles = hero.vehicles.map(url => {
            let result = this.appState.models.getVehicles(url);

            switch (result.type) {
                case 'loading':
                    return <h1>LOADING. Wait.</h1>;
                case 'ready':
                    return <Item>{result.value}</Item>
            }
        });

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
                <Info><Label>Homeworld:</Label> {renderedHomeworld}</Info>
                <Info><Label>Films:</Label> {renderedFilms}</Info>
                <Info><Label>Species:</Label> {renderedSpecies}</Info>
                <Info><Label>Starships:</Label> {renderedStarships}</Info>
                <Info><Label>Vehicles:</Label> {renderedVehicles}</Info>
                {created && <Info><Label>When was created?</Label> {creationDate}</Info>}
                {edited && <Info><Label>When was edited?</Label> {editionDate}</Info>}
            </div>
        )
    }

    notClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    }

    render() {

        switch(this.appState.currentView.currentView.type) {
            case 'main':
                return null
            case 'hero':
                return this.renderModal(this.appState.currentView.currentView.id);
        }

    }

    renderModal (id: string) {

        const { redirectToMain } = this.appState.currentView;
        const result = this.appState.models.getHeroes();

        switch (result.type) {
            case 'loading':
                return null;
            case 'ready':

                const hero = result.value.find(hero => hero.url === id);     // TO CHANGE

                return (
                    <ModalContainer show={Boolean(hero) } onClick={redirectToMain}>
                        <ModalWrapper onClick={this.notClose}>
                            <ModalHeader>
                                <Title>Read more about Star Wars' hero:</Title>
                                <CloseBtn onClick={redirectToMain}>x</CloseBtn>
                            </ModalHeader>
                            <ModalBody>
                                {hero && this.renderHeroData(hero)}
                                <ResetBtn onClick={redirectToMain}>Close</ResetBtn>
                            </ModalBody>
                        </ModalWrapper>
                    </ModalContainer>
                )
        }
    }
};

export default Modal;
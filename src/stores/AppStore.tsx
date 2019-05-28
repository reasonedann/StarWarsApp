import * as React from 'react';
import { observable, computed } from 'mobx';

export interface SwapiHeroType {
    name: string,
    birth_year: string,
    eye_color: string,
    gender: string,
    hair_color: string,
    height: string,
    mass: string,
    skin_color: string,
    homeworld: string,
    films: Array<string>,
    species: Array<string>,
    starships: Array<string>,
    vehicles: Array<string>,
    url: string,
    created: string,
    edited: string
}

export interface HeroType {
    name: string,
    birthYear: string,
    eyeColor: Array<string>,
    gender: string,
    hairColor: Array<string>,
    height: string,
    mass: string,
    skinColor: Array<string>,
    homeworld: string,
    films: Array<string>,
    species: Array<string>,
    starships: Array<string>,
    vehicles: Array<string>,
    url: string,
    created: string,
    edited: string,
}

const getHeroes = async (): Promise<Array<HeroType>> => {
    const response = await fetch('https://swapi.co/api/people');

    if (!response.ok) {
        console.log('Error:', response.statusText)
    }

    const jsonResponse = await response.json();

    console.log(jsonResponse);

    if (jsonResponse.results) {

        const comma = ',';
        const hyphen = '-';

        return jsonResponse.results.map((hero: SwapiHeroType) => ({
            name: hero.name,
            birthYear: hero.birth_year,
            eyeColor: hero.eye_color.split(hyphen),
            gender: hero.gender,
            hairColor: hero.hair_color.split(comma).map(i => i.trim()),
            height: hero.height,
            mass: hero.mass,
            skinColor: hero.skin_color.split(comma).map(i => i.trim()),
            homeworld: hero.homeworld,
            films: hero.films,
            species: hero.species,
            starships: hero.starships,
            vehicles: hero.vehicles,
            url: hero.url,
            created: hero.created,
            edited: hero.edited,
        }));
    }
    return []
}

export class  AppStore {

    @observable heroes: Array<HeroType> = [];

    static createForContext(): AppStore {
        return new AppStore();
    }

    getHeroesFromSwapi = async () => {
        const heroes = await getHeroes();
        this.heroes = heroes;
    }

    @computed get eyeColorOptions() {
        const eyeColorOptions = new Set(this.heroes.flatMap(hero => hero.gender));
        return Array.from(eyeColorOptions).sort();
    }

    @computed get genderOptions() {
        const genderOptions = new Set(this.heroes.flatMap(hero => hero.eyeColor));
        return (Array.from(genderOptions)).sort();
    }

    @computed get skinColorOptions() {
        const skinColorOptions = new Set(this.heroes.flatMap(hero => hero.skinColor));
        return (Array.from(skinColorOptions)).sort();
    }

    @computed get hairColorOptions() {
        const hairColorOptions = new Set(this.heroes.flatMap(hero => hero.hairColor))
        return (Array.from(hairColorOptions)).sort();
    }
}

const AppContext = React.createContext(AppStore.createForContext());

export const Provider = AppContext.Provider;

export class AppStoreComponent<PropsType = {}, StateType = {}> extends React.Component<PropsType, StateType> {
    static contextType = AppContext;

    get appState(): AppStore {
        //Fix for "any" type
        return this.context;
    }
}

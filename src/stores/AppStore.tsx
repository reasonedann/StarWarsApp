import * as React from 'react';
import { observable, computed, action } from 'mobx';

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

export interface HeroModalType {
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
    created: string,
    edited: string
}

interface FilmType {
    title: string
}

export enum FilterType {
    None,
    Gender,
    HairColor,
    EyeColor,
    SkinColor
}

interface GetHeroesType {
    heroesArray: Array<HeroType>,
    count: number,
    next: string | null,
    previous: string | null
}

const getHeroes = async (url: string): Promise<GetHeroesType> => {
    const response = await fetch(url);

    if (!response.ok) {
        console.log('Error:', response.statusText)
    }

    const jsonResponse = await response.json();

    const count = jsonResponse.count;
    const next = jsonResponse.next;
    const previous = jsonResponse.previous;

    const comma = ',';
    const hyphen = '-';

    const heroesArray = jsonResponse.results.map((hero: SwapiHeroType) => ({
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

    return {
        heroesArray,
        count,
        next,
        previous
    }
}


const getFilm = async (film: string): Promise<Array<FilmType>> => {
    const response = await fetch(film);
    if (!response.ok) {
        console.log('Error:', response.statusText)
    }
    const jsonResponse = await response.json();

    console.log(jsonResponse);

    if (jsonResponse.results) {
        return jsonResponse.results.values.map((film: FilmType) => ({
            title: film.title
        }));
    }
    return []
}

export class AppStore {

    static createForContext(): AppStore {
        return new AppStore();
    }

    @observable heroes: Array<HeroType> = [];

    getHeroesFromSwapi = async (url?: string | null) => {
        const urlPeople = url ? url : 'https://swapi.co/api/people';
        const payload = await getHeroes(urlPeople);
        this.heroes = payload.heroesArray;
        this.count = payload.count;
        this.next = payload.next;
        this.previous = payload.previous
    }

    @computed get genderOptions() {
        const genderOptions = new Set(this.heroes.flatMap(hero => hero.gender));
        return Array.from(genderOptions).sort();
    }

    @computed get eyeColorOptions() {
        const eyeColorOptions = new Set(this.heroes.flatMap(hero => hero.eyeColor));
        return Array.from(eyeColorOptions).sort();
    }

    @computed get skinColorOptions() {
        const skinColorOptions = new Set(this.heroes.flatMap(hero => hero.skinColor));
        return Array.from(skinColorOptions).sort();
    }

    @computed get hairColorOptions() {
        const hairColorOptions = new Set(this.heroes.flatMap(hero => hero.hairColor))
        return Array.from(hairColorOptions).sort();
    }

    @observable filterValue: string = '';

    @observable filterType: FilterType = FilterType.None;

    @action setFilter = (filterType: FilterType, filterValue: string) => {
        this.filterType = filterType;
        this.filterValue = filterValue;
    }

    @computed get filteredHeroes() { // trzeba tu ludziów ze wszyskich stron a nie tylko z jednej żeby się na górze ustawiały wszystkie filtry
        return this.heroes.filter(hero => {
            switch (this.filterType) {
                case FilterType.None:
                    return true;
                case FilterType.Gender:
                    return this.filterValue === hero.gender;
                case FilterType.HairColor:
                    return hero.hairColor.includes(this.filterValue);
                case FilterType.EyeColor:
                    return hero.eyeColor.includes(this.filterValue);
                case FilterType.SkinColor:
                    return hero.skinColor.includes(this.filterValue);
            }
        })
    }

    @observable heroModalData: HeroModalType | null = null;

    openModal = (hero: HeroModalType) => {
        this.heroModalData = hero;
    }
    closeModal = () => {
        this.heroModalData = null
    }

    @observable count: number = 0;

    @observable next: string | null | undefined = null;

    @observable previous: string | null | undefined = null;

    @computed get pageNumbers() {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.count / 10); i++) {
          pageNumbers.push(i);
        }
        return pageNumbers
    }

    @computed get currentPage() {
        if (this.next) {
            return parseInt(this.next.split('=')[1]) - 1;
        }
        if (this.previous) {
            return parseInt(this.previous.split('=')[1]) + 1;
        }
        return 1;
    }

    @computed get filmName() {
        if (this.heroModalData) {
            return this.heroModalData.films.map(async (url) => {
                const response = await fetch(url);
                if (!response.ok) {
                    console.log('Error:', response.statusText)
                }
                const jsonResponse = await response.json();
                return jsonResponse.name;
            });
        }
    }

    getFilmTitleFromSwapi = async (url: string) => {
        await getFilm(url);
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

import * as React from 'react';
import { observable, computed, action } from 'mobx';
import { HeroType, SwapiHeroType, FilterType, HeroModalType, GetHeroesType } from './interfaces';

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


export class AppStore {

    static createForContext(): AppStore {
        return new AppStore();
    }

    @observable heroes: Array<HeroType> = [];

    @observable filterValue: string = '';
    @observable filterType: FilterType = FilterType.None;

    @observable heroModalData: HeroModalType | null = null;

    @observable homeworld: string = '';
    @observable filmTitles: Array<string> = [];
    @observable species: Array<string> = [];
    @observable starships: Array<string> = [];
    @observable vehicles: Array<string> = [];

    @observable count: number = 0;
    @observable next: string | null | undefined = null;
    @observable previous: string | null | undefined = null;


    getHeroesFromSwapi = async (url?: string | null) => {
        const urlPeople = url ? url : 'https://swapi.co/api/people';
        const payload = await getHeroes(urlPeople);
        this.heroes = payload.heroesArray;
        this.count = payload.count;
        this.next = payload.next;
        this.previous = payload.previous
    }


    @action getHomeworld = async () => {
        if (this.heroModalData) {
            const url = this.heroModalData.homeworld;
            const response = await fetch(url);
            if (!response.ok) {
                console.log('Error:', response.statusText)
            }
            const jsonResponse = await response.json();
            this.homeworld = jsonResponse.name;
        }
    }

    @action getFilmTitles = async () => {
        if (this.heroModalData) {
            const promises = this.heroModalData.films.map(async (url) => {
                const response = await fetch(url);
                if (!response.ok) {
                    console.log('Error:', response.statusText)
                }
                const jsonResponse = await response.json();
                return jsonResponse.title;
            });
            this.filmTitles = await Promise.all(promises);
        }
    }

    @action getSpecies = async () => {
        if (this.heroModalData) {
            const promises = this.heroModalData.species.map(async (url) => {
                const response = await fetch(url);
                if (!response.ok) {
                    console.log('Error:', response.statusText)
                }
                const jsonResponse = await response.json();
                return jsonResponse.name;
            });
            this.species = await Promise.all(promises);
        }
    }

    @action getStarships = async () => {
        if (this.heroModalData) {
            const promises = this.heroModalData.starships.map(async (url) => {
                const response = await fetch(url);
                if (!response.ok) {
                    console.log('Error:', response.statusText)
                }
                const jsonResponse = await response.json();
                return jsonResponse.model;
            });
            this.starships = await Promise.all(promises);
        }
    }

    @action getVehicles = async () => {
        if (this.heroModalData) {
            const promises = this.heroModalData.vehicles.map(async (url) => {
                const response = await fetch(url);
                if (!response.ok) {
                    console.log('Error:', response.statusText)
                }
                const jsonResponse = await response.json();
                return jsonResponse.name;
            });
            this.vehicles = await Promise.all(promises);
        }
    }

    openModal = (hero: HeroModalType) => {
        this.heroModalData = hero;
        this.getHomeworld();
        this.getFilmTitles();
        this.getSpecies();
        this.getStarships();
        this.getVehicles();
    }

    closeModal = () => {
        this.heroModalData = null;
        this.homeworld = '';
        this.filmTitles = [];
        this.species = [];
        this.starships = [];
        this.vehicles = [];
    }

    @action setFilter = (filterType: FilterType, filterValue: string) => {
        this.filterType = filterType;
        this.filterValue = filterValue;
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

    @computed get filteredHeroes() {
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
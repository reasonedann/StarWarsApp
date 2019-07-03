
import { SwapiHeroType, HeroType } from './interfaces';

//export const getHeroes = async (/*url: string*/): Promise<GetHeroesType> => {
export const getHeroes = async (/*url: string*/): Promise<Array<HeroType>> => {
        const response = await fetch('https://swapi.co/api/people/');

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

    return heroesArray;
    // return {
    //     heroesArray,
    //     count,
    //     next,
    //     previous
    // }
};

export const getHomeworld = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        console.log('Error:', response.statusText)
    }
    const jsonResponse = await response.json();
    return jsonResponse.name;
};

export const getFilmTitles = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        console.log('Error:', response.statusText)
    }
    const jsonResponse = await response.json();
    return jsonResponse.title;
};

export const getSpecies = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        console.log('Error:', response.statusText)
    }
    const jsonResponse = await response.json();
    return jsonResponse.name;
};

export const getStarships = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        console.log('Error:', response.statusText)
    }
    const jsonResponse = await response.json();
    return jsonResponse.model;
};

export const getVehicles = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        console.log('Error:', response.statusText)
    }
    const jsonResponse = await response.json();
    return jsonResponse.name;
};
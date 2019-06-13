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

export enum FilterType {
    None,
    Gender,
    HairColor,
    EyeColor,
    SkinColor
}

export interface GetHeroesType {
    heroesArray: Array<HeroType>,
    count: number,
    next: string | null,
    previous: string | null
}

export interface HeroTableType {
    name: string,
    gender: string,
    height: string,
    mass: string,
    skinColor: Array<string>,
    eyeColor: Array<string>,
    hairColor: Array<string>,
    hero: HeroType
}
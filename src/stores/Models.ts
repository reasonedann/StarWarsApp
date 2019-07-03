import { observable } from "mobx";
import { getHeroes, getHomeworld, getFilmTitles, getSpecies, getStarships, getVehicles } from "./Api";
import { HeroType } from "./interfaces";

type ResultLoading = {
    type: 'loading'
}

type ResultReady<T> = {
    type: 'ready',
    value: T
};

type Result<T> = ResultLoading | ResultReady<T>;


class Resource<T> {
    readonly getValue: () => Promise<T>;
    @observable value: null | Result<T>;

    constructor(getValue: () => Promise<T>) {
        this.getValue = getValue;
        this.value = null;
    }

    get(): Result<T> {
        if (this.value === null) {
            this.value = {
                type: 'loading'
            };

            (async () => {
                const value = await this.getValue();
                this.value = {
                    type: 'ready',
                    value: value
                };
            })();
        }

        return this.value;
    }
}

class ResourceMap<K, V> {
    private create: (key: K) => V;
    private data: Map<K, V> = new Map();

    constructor(create: (key: K) => V) {
        this.create = create;
    }

    get(key:K): V {
        const item = this.data.get(key);
        if (item) {
            return item;
        }

        const newItem = this.create(key);
        this.data.set(key, newItem);
        return newItem;
    }
}

export class Models {

    private readonly heroes: Resource<Array<HeroType>> = new Resource(getHeroes);

    private readonly homeworldsMap: ResourceMap<string, Resource<string>> = new ResourceMap(
        (homeworldUrl: string) => new Resource(
            () => getHomeworld(homeworldUrl)
        )
    );

    private readonly filmsMap: ResourceMap<string, Resource<Array<string>>> = new ResourceMap(
        (filmUrl: string) => new Resource(
            () => getFilmTitles(filmUrl)
        )
    );

    private readonly speciesMap: ResourceMap<string, Resource<Array<string>>> = new ResourceMap(
        (speciesUrl: string) => new Resource(
            () => getSpecies(speciesUrl)
        )
    );

    private readonly starshipsMap: ResourceMap<string, Resource<Array<string>>> = new ResourceMap(
        (starshipsUrl: string) => new Resource(
            () => getStarships(starshipsUrl)
        )
    );

    private readonly vehiclesMap: ResourceMap<string, Resource<Array<string>>> = new ResourceMap(
        (vehiclesUrl: string) => new Resource(
            () => getVehicles(vehiclesUrl)
        )
    );


    getHeroes(): Result<Array<HeroType>> {
        return this.heroes.get();
    }

    getHomeworld(id: string): Result<string> {
        return this.homeworldsMap.get(id).get();
    }

    getFilms(id: string): Result<Array<string>> {
        return this.filmsMap.get(id).get();
    }

    getSpecies(id: string): Result<Array<string>> {
        return this.speciesMap.get(id).get();
    }

    getStarships(id: string): Result<Array<string>> {
        return this.starshipsMap.get(id).get();
    }

    getVehicles(id: string): Result<Array<string>> {
        return this.vehiclesMap.get(id).get();
    }
}

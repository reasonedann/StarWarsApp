import { observable, action } from 'mobx';

type CurrentViewMain = {
    type: 'main'
};

type CurrentViewHero = {
    type: 'hero',
    id: string
};

type CurrentView = CurrentViewMain | CurrentViewHero;

export default class CurrentViewState {

    @observable currentView: CurrentView = {
        type: 'main'
    };


    @action redirectToMain = () => {
        this.currentView = {
            type: 'main'
        };
    }

    @action redirectToHero = (id: string) => {
        this.currentView = {
            type: 'hero',
            id
        };
    }
}
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StarWarsApp from './components/StarWarsApp';
import { Provider, AppStore } from './stores/AppStore';

const appStore = new AppStore();

ReactDOM.render(
    <Provider value={appStore}>
        <StarWarsApp />
    </Provider>,
    document.getElementById('app')
);


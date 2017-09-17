'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CardsList from './components/cardsList';

const URL_API = 'https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=b0aa3bb54321444ab7cdd05c2d5faa45';
const root = document.getElementById('root');

export const App: React.StatelessComponent<{}> = () => {
    return (
        <div className="content">
            <CardsList url={URL_API}/>
        </div>
    );
};

ReactDOM.render(<App/>, root);
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require("babel-polyfill");
var React = require("react");
var ReactDOM = require("react-dom");
var cardsList_1 = require("./components/cardsList");
var URL_API = 'https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=b0aa3bb54321444ab7cdd05c2d5faa45';
var root = document.getElementById('root');
exports.App = function () {
    return (<div className="content">
            <cardsList_1.default url={URL_API}/>
        </div>);
};
ReactDOM.render(<exports.App />, root);

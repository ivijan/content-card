'use strict';

import * as React from 'react';
import { Button } from 'react-bootstrap';

export default class CardsBlockControls extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            id: this.props.id,
            url: this.props.url,
            removeHandler: this.props.removeHandler
        };
        this.addToFavouriteHandler = this.addToFavouriteHandler.bind(this);
        this.removeCardHandler = this.removeCardHandler.bind(this);
    }

    public addToFavouriteHandler () {
        console.log("Save card " + this.state.id + " to favourite list!");
    }

    public removeCardHandler () {
        console.log("Remove card " + this.state.id + " from list!");

        if (this.state.removeHandler) {
            this.state.removeHandler(this.state.id);
        }
    }

    public render () {
        return (
            <div className="cardsBlock-controls">
                <div className="btn-group">
                    <a className="btn btn-link cardsBlock-controls-open" href={this.state.url}>
                        <span className="glyphicon glyphicon-eye-open"/>
                    </a>
                    <Button bsStyle="link" className="cardsBlock-controls-remove" onClick={this.removeCardHandler}>
                        <span className="glyphicon glyphicon-remove"/>
                    </Button>
                    <Button bsStyle="link" className="cardsBlock-controls-save" onClick={this.addToFavouriteHandler}>
                        <span className="glyphicon glyphicon-heart"/>
                    </Button>
                </div>
            </div>
        );
    }
}
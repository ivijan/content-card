'use strict';

import * as React from 'react';
import { Button } from 'react-bootstrap';

export interface ICardBlockControl {
    id: number;
    url: string;
    removeHandler: Function;
    sortHandler: Function;
}

export default class CardsBlockControls extends React.Component<ICardBlockControl, ICardBlockControl> {
    constructor(props: ICardBlockControl) {
        super(props);
        this.state = {
            id: this.props.id,
            url: this.props.url,
            removeHandler: this.props.removeHandler,
            sortHandler: this.props.sortHandler
        };
        this.moveToFrontHandler = this.moveToFrontHandler.bind(this);
        this.removeCardHandler = this.removeCardHandler.bind(this);
    }

    public moveToFrontHandler() {
        console.log("Move card " + this.state.id + " to start of list!");

        if (this.state.sortHandler) {
            this.state.sortHandler(this.state.id);
        }
    }

    public removeCardHandler() {
        console.log("Remove card " + this.state.id + " from list!");

        if (this.state.removeHandler) {
            this.state.removeHandler(this.state.id);
        }
    }

    public render() {
        return (
            <div className="cardsBlock-controls">
                <div className="btn-group">
                    <a className="btn btn-link cardsBlock-controls-open" href={this.state.url}>
                        <span className="glyphicon glyphicon-eye-open" />
                    </a>
                    <Button bsStyle="link" className="cardsBlock-controls-remove" onClick={this.removeCardHandler}>
                        <span className="glyphicon glyphicon-remove" />
                    </Button>
                    <Button bsStyle="link" className="cardsBlock-controls-save" onClick={this.moveToFrontHandler}>
                        <span className="glyphicon glyphicon-heart" />
                    </Button>
                </div>
            </div>
        );
    }
}
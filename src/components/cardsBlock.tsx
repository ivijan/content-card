'use strict';

import * as React from 'react';
import CardsBlockControls, { ICardBlockControl } from './CardsBlockControls';

export interface ICardBlock extends ICardBlockControl {
    title: string;
    description: string;
    image: string;
}

export default class CardsBlock extends React.Component<ICardBlock, ICardBlock> {
    constructor(props: ICardBlock) {
        super(props);
        this.state = {
            id: this.props.id,
            url: this.props.url,
            title: this.props.title,
            description: this.props.description,
            image: this.props.image,
            removeHandler: this.props.removeHandler,
            sortHandler: this.props.sortHandler
        };
    }

    public render() {
        return (
            <div className="cardsBlock">
                <div className="cardsBlock-overlay" />
                <div className="cardsBlock-content">
                    <h3 className="cardsBlock-title">
                        {this.state.title}
                    </h3>
                    <p className="cardsBlock-description">
                        {this.state.description}
                    </p>
                </div>
                <div className="cardsBlock-tooltip">
                    <CardsBlockControls id={this.state.id} url={this.state.url} sortHandler={this.state.sortHandler} removeHandler={this.state.removeHandler} />
                </div>
                <div className="cardsBlock-background" style={{ backgroundImage: 'url(' + this.state.image + ')' }} />
            </div>
        );
    }
}
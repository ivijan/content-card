'use strict';

import * as React from 'react';
import CardsBlockControls from './CardsBlockControls';

export default class CardsList extends React.Component<any, any> {
    public render () {
        return (
            <div className="cardsBlock">
                <div className="cardsBlock-overlay"/>
                <div className="cardsBlock-content">
                    <h3 className="cardsBlock-title">
                        {this.props.title}
                    </h3>
                    <p className="cardsBlock-description">
                        {this.props.description}
                    </p>
                </div>
                <div className="cardsBlock-tooltip">
                    <CardsBlockControls id={this.props.id} url={this.props.url} removeHandler={this.props.removeHandler}/>
                </div>
                <div className="cardsBlock-background" style={{backgroundImage: 'url(' + this.props.image + ')' }}/>
            </div>
        );
    }
}
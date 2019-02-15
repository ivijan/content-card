'use strict';

import * as _ from 'lodash';
import * as React from 'react';
import Tilt from '../../node_modules/react-tilt';
import CardsBlock, { ICardBlock } from './CardsBlock';

export interface Articles {
    articles: any[];
}

export interface ICardsList {
    dataLoaded: boolean;
    data: any[];
    apiUrl: string;
    error?: string;
}

export interface ICardBlockExt extends ICardBlock {
    urlToImage?: string;
}

export default class CardsList extends React.Component<ICardsList, ICardsList> {
    constructor(props: ICardsList) {
        super(props);
        this.state = {
            dataLoaded: this.props.dataLoaded,
            data: this.props.data,
            apiUrl: this.props.apiUrl
        };
        this.removeItem = this.removeItem.bind(this);
        this.sortItem = this.sortItem.bind(this);
    }

    componentDidMount() {
        fetch(this.state.apiUrl)
            .then(result => result.json())
            .then((response: Articles): void => {
                const newArr = _.map(response.articles, element => _.extend({}, element, { id: _.uniqueId() }));
                this.setState({ data: newArr, dataLoaded: true });
            })
            .catch(() => this.setState({ error: 'Problems with loading data.', dataLoaded: true }));
    }

    private filterItem(id: number): Articles {
        return _.find(this.state.data, (data: ICardBlock): boolean => data.id == id);
    }

    public removeItem(id: number): void {
        let card = this.filterItem(id);

        if (card) {
            this.setState({
                data: _.pull(this.state.data, card)
            });
        }
    }

    public sortItem(id: number): void {
        let card = this.filterItem(id);

        if (card) {
            this.setState((state: ICardsList): ICardsList => {
                _.pull(state.data, card);
                state.data.unshift(card);
                return state;
            });
        }
    }

    public render() {
        let content: JSX.Element[];
        const self = this;
        content = [<div className="alert alert-warning">'Oops. List is empty.'</div>];
        if (!this.state.dataLoaded) {
            content = [<div className="preloader" />];
        } else if (this.state.error) {
            content = [<div className="alert alert-danger">{this.state.error}</div>];
        } else if (this.state.data.length) {
            content = _.map(this.state.data, (item: ICardBlockExt): JSX.Element => {
                return (
                    <Tilt options={{ max: 15, scale: 1.05 }} className="col col-lg-3 col-md-4 col-sm-6 col-xs-12"
                        key={item.id}>
                        <CardsBlock
                            title={item.title}
                            description={item.description}
                            image={item.urlToImage}
                            id={item.id}
                            url={item.url}
                            removeHandler={self.removeItem}
                            sortHandler={self.sortItem}
                        />
                    </Tilt>
                );
            });
        }

        return <div className="cardsList">{content}</div>;
    }
}
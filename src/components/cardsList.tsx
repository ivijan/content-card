'use strict';

import * as React from 'react';
import * as _ from 'lodash';
import * as $ from 'jquery';
import CardsBlock from './CardsBlock';
import Tilt from '../../node_modules/react-tilt';

export default class CardsList extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            dataLoaded: this.props.dataLoaded || false,
            data: this.props.data || []
        };
        this.removeItem = this.removeItem.bind(this)
    }

    componentDidMount () {
        const self = this;
        $.ajax({
                url:      this.props.url,
                dataType: 'json',
                cache:    false
            })
            .then(function(response : any) {
                const newArr = _.map(response.articles, function(element) {
                    return _.extend({}, element, {id: _.uniqueId()});
                });

                self.setState({ data: newArr, dataLoaded: true });
            })
            .fail(function() {
                self.setState({ error: 'Problems with loading data.', dataLoaded: true });
            });
    }

    public removeItem (id : any) {
        let card = _.filter(this.state.data, function(e: any){ return e.id == id; });
        card = card && card[0];

        if (card) {
            const index = this.state.data.indexOf(card);

            this.setState(function(state) {
                state.data.splice(index, 1);
                return state;
            });
        }
    }

    public render () {
        const self = this;
        let content : any = <div className="alert alert-warning">'Oops. List is empty.'</div>;
        if (!this.state.dataLoaded) {
            content = <div className="preloader"/>;
        } else if (this.state.error) {
            content = <div className="alert alert-danger">{this.state.error}</div>;
        } else if (this.state.data.length) {
            content = _.map(this.state.data, function(item : any) {
                return (
                    <Tilt options={{ max : 15, scale: 1.05 }} className="col col-lg-3 col-md-4 col-sm-6 col-xs-12"
                        key={item.id}>
                        <CardsBlock
                            title={item.title}
                            description={item.description}
                            image={item.urlToImage}
                            id={item.id}
                            url={item.url}
                            removeHandler={self.removeItem}
                        />
                    </Tilt>
                );
            });
        }

        return <div className="cardsList">{content}</div>;
    }
}
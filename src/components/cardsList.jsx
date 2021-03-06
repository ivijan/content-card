'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var $ = require("jquery");
var _ = require("lodash");
var react_tilt_1 = require("../../node_modules/react-tilt");
var CardsBlock_1 = require("./CardsBlock");
var CardsList = /** @class */ (function (_super) {
    __extends(CardsList, _super);
    function CardsList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            dataLoaded: _this.props.dataLoaded,
            data: _this.props.data
        };
        _this.removeItem = _this.removeItem.bind(_this);
        _this.sortItem = _this.sortItem.bind(_this);
        return _this;
    }
    CardsList.prototype.componentDidMount = function () {
        var self = this;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false
        })
            .then(function (response) {
            var newArr = _.map(response.articles, function (element) {
                return _.extend({}, element, { id: _.uniqueId() });
            });
            self.setState({ data: newArr, dataLoaded: true });
        })
            .fail(function () {
            self.setState({ error: 'Problems with loading data.', dataLoaded: true });
        });
    };
    CardsList.prototype.filterItem = function (id) {
        var card = _.filter(this.state.data, function (e) { return e.id == id; });
        return card && card[0];
    };
    CardsList.prototype.removeItem = function (id) {
        var card = this.filterItem(id);
        if (card) {
            this.setState({
                data: _.pull(this.state.data, card)
            });
        }
    };
    CardsList.prototype.sortItem = function (id) {
        var card = this.filterItem(id);
        if (card) {
            this.setState(function (state) {
                _.pull(state.data, card);
                state.data.unshift(card);
                return state;
            });
        }
    };
    CardsList.prototype.render = function () {
        var self = this;
        var content = <div className="alert alert-warning">'Oops. List is empty.'</div>;
        if (!this.state.dataLoaded) {
            content = <div className="preloader"/>;
        }
        else if (this.state.error) {
            content = <div className="alert alert-danger">{this.state.error}</div>;
        }
        else if (this.state.data.length) {
            content = _.map(this.state.data, function (item) {
                return (<react_tilt_1.default options={{ max: 15, scale: 1.05 }} className="col col-lg-3 col-md-4 col-sm-6 col-xs-12" key={item.id}>
                        <CardsBlock_1.default title={item.title} description={item.description} image={item.urlToImage} id={item.id} url={item.url} removeHandler={self.removeItem} sortHandler={self.sortItem}/>
                    </react_tilt_1.default>);
            });
        }
        return <div className="cardsList">{content}</div>;
    };
    return CardsList;
}(React.Component));
exports.default = CardsList;

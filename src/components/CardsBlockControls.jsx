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
var react_bootstrap_1 = require("react-bootstrap");
var CardsBlockControls = /** @class */ (function (_super) {
    __extends(CardsBlockControls, _super);
    function CardsBlockControls(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            id: _this.props.id,
            url: _this.props.url,
            removeHandler: _this.props.removeHandler
        };
        _this.addToFavouriteHandler = _this.addToFavouriteHandler.bind(_this);
        _this.removeCardHandler = _this.removeCardHandler.bind(_this);
        return _this;
    }
    CardsBlockControls.prototype.addToFavouriteHandler = function () {
        console.log("Save card " + this.state.id + " to favourite list!");
    };
    CardsBlockControls.prototype.removeCardHandler = function () {
        console.log("Remove card " + this.state.id + " from list!");
        if (this.state.removeHandler) {
            this.state.removeHandler(this.state.id);
        }
    };
    CardsBlockControls.prototype.render = function () {
        return (<div className="cardsBlock-controls">
                <div className="btn-group">
                    <a className="btn btn-link cardsBlock-controls-open" href={this.state.url}>
                        <span className="glyphicon glyphicon-eye-open"/>
                    </a>
                    <react_bootstrap_1.Button bsStyle="link" className="cardsBlock-controls-remove" onClick={this.removeCardHandler}>
                        <span className="glyphicon glyphicon-remove"/>
                    </react_bootstrap_1.Button>
                    <react_bootstrap_1.Button bsStyle="link" className="cardsBlock-controls-save" onClick={this.addToFavouriteHandler}>
                        <span className="glyphicon glyphicon-heart"/>
                    </react_bootstrap_1.Button>
                </div>
            </div>);
    };
    return CardsBlockControls;
}(React.Component));
exports.default = CardsBlockControls;

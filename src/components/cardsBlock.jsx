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
var CardsBlockControls_1 = require("./CardsBlockControls");
var CardsList = /** @class */ (function (_super) {
    __extends(CardsList, _super);
    function CardsList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardsList.prototype.render = function () {
        return (<div className="cardsBlock">
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
                    <CardsBlockControls_1.default id={this.props.id} url={this.props.url} removeHandler={this.props.removeHandler}/>
                </div>
                <div className="cardsBlock-background" style={{ backgroundImage: 'url(' + this.props.image + ')' }}/>
            </div>);
    };
    return CardsList;
}(React.Component));
exports.default = CardsList;

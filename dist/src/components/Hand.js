"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hand = /** @class */ (function () {
    function Hand(cardOne, cardTwo) {
        this.cards = [];
        this.cards.push(cardOne);
        this.cards.push(cardTwo);
    }
    Hand.prototype.getFirstCard = function () {
        return this.cards[0];
    };
    return Hand;
}());
exports.default = Hand;

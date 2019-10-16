"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hand = /** @class */ (function () {
    function Hand(cardOne, cardTwo) {
        this.cards = [];
        this.cards.push(cardOne);
        this.cards.push(cardTwo);
    }
    Hand.prototype.addCard = function (card) {
        this.cards.push(card);
    };
    Hand.prototype.getCards = function () {
        return this.cards;
    };
    Hand.prototype.getFirstCard = function () {
        return this.cards[0];
    };
    Hand.prototype.getHandValue = function () {
        return this.cards
            .map(function (card) { return card.getCardValue().join(""); })
            .join(", ");
    };
    Hand.prototype.getHandValues = function () {
        return this.cards.map(function (card) { return card.getValue(); });
    };
    return Hand;
}());
exports.default = Hand;

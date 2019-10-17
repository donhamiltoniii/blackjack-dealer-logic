"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Hand_1 = require("./Hand");
var Player_1 = require("./Player");
var Dealer = /** @class */ (function (_super) {
    __extends(Dealer, _super);
    function Dealer(deck) {
        var _this = _super.call(this) || this;
        deck.shuffle();
        _this.deck = deck;
        return _this;
    }
    Dealer.prototype.dealCard = function () {
        return this.deck.dealTopCard();
    };
    Dealer.prototype.dealHands = function () {
        var firstHand = new Hand_1["default"](this.deck.dealTopCard(), this.deck.dealTopCard());
        var secondHand = new Hand_1["default"](this.deck.dealTopCard(), this.deck.dealTopCard());
        return [firstHand, secondHand];
    };
    Dealer.prototype.getCardUp = function () {
        if (this.getHand() === undefined) {
            throw new Error("dealerHand isn't defined yet");
        }
        var firstCard = this.getHand().getFirstCard();
        var cardValue = firstCard.getCardValue().join("");
        return cardValue;
    };
    Dealer.prototype.getDeck = function () {
        return this.deck;
    };
    return Dealer;
}(Player_1["default"]));
exports["default"] = Dealer;

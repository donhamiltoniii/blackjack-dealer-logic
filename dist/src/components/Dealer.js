"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hand_1 = __importDefault(require("./Hand"));
var Dealer = /** @class */ (function () {
    function Dealer(deck) {
        this.deck = deck;
    }
    Dealer.prototype.dealHands = function () {
        var firstHand = new Hand_1.default(this.deck.dealTopCard(), this.deck.dealTopCard());
        var secondHand = new Hand_1.default(this.deck.dealTopCard(), this.deck.dealTopCard());
        return [firstHand, secondHand];
    };
    return Dealer;
}());
exports.default = Dealer;

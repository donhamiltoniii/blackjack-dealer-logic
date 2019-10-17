"use strict";
exports.__esModule = true;
var Player = /** @class */ (function () {
    function Player() {
        this.bust = false;
        this.playing = true;
    }
    Player.prototype.double = function (card) {
        this.hit(card);
        this.playing = false;
    };
    Player.prototype.getHand = function () {
        if (typeof this.hand === "undefined") {
            throw new Error("Hand must be defined!");
        }
        return this.hand;
    };
    Player.prototype.hit = function (card) {
        if (typeof this.hand === "undefined") {
            throw new Error("Hand must be defined!");
        }
        this.hand.addCard(card);
    };
    Player.prototype.isBust = function () {
        return this.bust;
    };
    Player.prototype.isPlaying = function () {
        return this.playing;
    };
    Player.prototype.receiveHand = function (hand) {
        this.hand = hand;
    };
    Player.prototype.reset = function () {
        this.bust = false;
        this.playing = true;
    };
    Player.prototype.setBust = function (value) {
        this.bust = value;
    };
    Player.prototype.setPlaying = function (value) {
        this.playing = value;
    };
    Player.prototype.stand = function () {
        this.setPlaying(false);
    };
    return Player;
}());
exports["default"] = Player;

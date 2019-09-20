"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player() {
        this.chips = 200;
    }
    Player.prototype.wager = function (ante) {
        if (ante > this.chips) {
            throw new Error("Can't wager more chips than are available!");
        }
        this.chips -= ante;
    };
    Player.prototype.getChips = function () {
        return this.chips;
    };
    return Player;
}());
exports.default = Player;

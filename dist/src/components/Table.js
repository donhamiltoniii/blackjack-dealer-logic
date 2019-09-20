"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Table = /** @class */ (function () {
    function Table(player, dealer) {
        this.ante = 0;
        this.dealer = dealer;
        this.player = player;
    }
    Table.prototype.deal = function () {
        var _a = this.dealer.dealHands(), dealerHand = _a[0], playerHand = _a[1];
        this.dealerHand = dealerHand;
        this.playerHand = playerHand;
    };
    Table.prototype.getAnte = function () {
        return this.ante;
    };
    Table.prototype.getDealerCardUp = function () {
        if (this.dealerHand === undefined) {
            throw new Error("dealerHand isn't defined yet");
        }
        var firstDealerCard = this.dealerHand.getFirstCard();
        var cardValue = firstDealerCard.getValue();
        return cardValue;
    };
    Table.prototype.getDealerHand = function () {
        if (this.dealerHand === undefined) {
            throw new Error("dealerHand isn't defined yet");
        }
        return this.dealerHand;
    };
    Table.prototype.getPlayerChips = function () {
        return this.player.getChips();
    };
    Table.prototype.getPlayerHand = function () {
        if (this.playerHand === undefined) {
            throw new Error("playerHand isn't defined yet");
        }
        return this.playerHand;
    };
    Table.prototype.receiveAnte = function (ante) {
        this.player.wager(ante);
        this.ante += ante;
    };
    return Table;
}());
exports.default = Table;

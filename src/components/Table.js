"use strict";
exports.__esModule = true;
var Result_1 = require("./Result");
var Table = /** @class */ (function () {
    function Table(user, dealer) {
        this.ante = 0;
        this.dealer = dealer;
        this.user = user;
    }
    Table.prototype.deal = function () {
        var _a = this.dealer.dealHands(), dealerHand = _a[0], playerHand = _a[1];
        this.dealer.receiveHand(dealerHand);
        this.user.receiveHand(playerHand);
    };
    Table.prototype.doubleUser = function () {
        this.user.double(this.dealer.dealCard());
        this.user.wager(this.ante);
        this.ante = this.ante * 2;
    };
    Table.prototype.evaluateDealer = function () {
        return this.evaluateHand(this.dealer.getHand().getHandValues(), this.dealer);
    };
    Table.prototype.evaluateUser = function () {
        return this.evaluateHand(this.user.getHand().getHandValues(), this.user);
    };
    Table.prototype.getAnte = function () {
        return this.ante;
    };
    Table.prototype.getDealerCardUp = function () {
        return this.dealer.getCardUp();
    };
    Table.prototype.getDealerHandValue = function () {
        return this.dealer.getHand().getHandValue();
    };
    Table.prototype.getUserChips = function () {
        return this.user.getChips();
    };
    Table.prototype.getUserHandValue = function () {
        return this.user.getHand().getHandValue();
    };
    Table.prototype.hitDealer = function () {
        this.dealer.hit(this.dealer.dealCard());
    };
    Table.prototype.hitUser = function () {
        this.user.hit(this.dealer.dealCard());
    };
    Table.prototype.isDealerBust = function () {
        return this.dealer.isBust();
    };
    Table.prototype.isDealerPlaying = function () {
        return this.dealer.isPlaying();
    };
    Table.prototype.isUserBust = function () {
        return this.user.isBust();
    };
    Table.prototype.isUserPlaying = function () {
        return this.user.isPlaying();
    };
    Table.prototype.outcome = function () {
        if (this.isDealerBust() && !this.isUserBust()) {
            return Result_1["default"].WIN;
        }
        if (this.evaluateUser() < this.evaluateDealer() || this.isUserBust()) {
            return Result_1["default"].LOSS;
        }
        if (this.evaluateUser() === this.evaluateDealer()) {
            return Result_1["default"].PUSH;
        }
        return Result_1["default"].WIN;
    };
    Table.prototype.pushHand = function () {
        this.user.receiveChips(this.ante);
        this.resetAnte();
    };
    Table.prototype.receiveAnte = function (ante) {
        this.user.wager(ante);
        this.ante += ante;
    };
    Table.prototype.resetAnte = function () {
        this.ante = 0;
    };
    Table.prototype.resetPlayers = function () {
        this.user.reset();
        this.dealer.reset();
    };
    Table.prototype.settleDealerHand = function () {
        while (this.evaluateDealer() < 17) {
            this.hitDealer();
        }
        this.standDealer();
    };
    Table.prototype.standDealer = function () {
        this.dealer.stand();
    };
    Table.prototype.standUser = function () {
        this.user.stand();
    };
    Table.prototype.userWin = function () {
        var payOut = this.ante * 2;
        this.user.receiveChips(payOut);
        this.resetAnte();
    };
    Table.prototype.getUserHand = function () {
        return this.user.getHand();
    };
    Table.prototype.getDealerHand = function () {
        return this.dealer.getHand();
    };
    Table.prototype.evaluateHand = function (values, player) {
        var valueTotal = 0;
        values.forEach(function (value) {
            if (value === "A") {
                valueTotal += 11;
            }
            else if (value === "J" || value === "Q" || value === "K") {
                valueTotal += 10;
            }
            else {
                valueTotal += Number(value);
            }
        });
        if (valueTotal > Table.BLACKJACK && values.includes("A")) {
            var firstAce = values.indexOf("A");
            values[firstAce] = "1";
            return this.evaluateHand(values, player);
        }
        else {
            if (valueTotal > Table.BLACKJACK) {
                player.setBust(true);
            }
            return valueTotal;
        }
    };
    Table.BLACKJACK = 21;
    return Table;
}());
exports["default"] = Table;

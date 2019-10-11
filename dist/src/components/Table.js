"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Table = /** @class */ (function () {
    function Table(player, dealer) {
        this.ante = 0;
        this.dealer = dealer;
        this.player = player;
        this.playerBust = false;
        this.playerPlaying = true;
    }
    Table.prototype.deal = function () {
        var _a = this.dealer.dealHands(), dealerHand = _a[0], playerHand = _a[1];
        this.dealerHand = dealerHand;
        this.playerHand = playerHand;
    };
    Table.prototype.doublePlayer = function () {
        if (this.playerHand === undefined) {
            throw new Error("Player hand isn't established yet");
        }
        this.playerHand.addCard(this.dealer.dealCard());
        this.player.wager(this.ante);
        this.ante = this.ante * 2;
        this.playerPlaying = false;
        this.evaluateHand();
    };
    Table.prototype.evaluateHand = function () {
        var _this = this;
        if (this.playerHand === undefined) {
            throw new Error("Player hand isn't established yet");
        }
        var valueTotal = 0;
        this.playerHand.getCards().forEach(function (card) {
            if (_this.playerHand === undefined) {
                throw new Error("Player hand isn't established yet");
            }
            var value = card.getValue();
            if (value === 'A') {
                valueTotal += 11;
            }
            else if (value === 'J' || value === 'Q' || value === 'K') {
                valueTotal += 10;
            }
            else {
                valueTotal += Number(value);
            }
        });
        if (valueTotal > Table.BLACKJACK) {
            this.playerBust = true;
        }
        if (this.isPlayerBust()) {
            valueTotal = 0;
            this.playerHand.getCards().forEach(function (card) {
                if (_this.playerHand === undefined) {
                    throw new Error("Player hand isn't established yet");
                }
                var value = card.getValue();
                if (value === 'A') {
                    valueTotal += 1;
                }
                else if (value === 'J' || value === 'Q' || value === 'K') {
                    valueTotal += 10;
                }
                else {
                    valueTotal += Number(value);
                }
            });
            if (valueTotal > Table.BLACKJACK) {
                this.playerBust = true;
            }
        }
        return valueTotal;
    };
    Table.prototype.getAnte = function () {
        return this.ante;
    };
    Table.prototype.getDealer = function () {
        return this.dealer;
    };
    Table.prototype.getDealerCardUp = function () {
        if (this.dealerHand === undefined) {
            throw new Error("dealerHand isn't defined yet");
        }
        var firstDealerCard = this.dealerHand.getFirstCard();
        var cardValue = firstDealerCard.getCardValue().join('');
        return cardValue;
    };
    Table.prototype.getDealerHand = function () {
        if (this.dealerHand === undefined) {
            throw new Error("dealerHand isn't defined yet");
        }
        return this.dealerHand;
    };
    Table.prototype.getDealerHandValue = function () {
        if (this.dealerHand === undefined) {
            throw new Error("dealerHand isn't defined yet");
        }
        return this.dealerHand.getHandValue();
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
    Table.prototype.getPlayerHandValue = function () {
        if (this.playerHand === undefined) {
            throw new Error("playerHand isn't defined yet");
        }
        return this.playerHand.getHandValue();
    };
    Table.prototype.hitPlayer = function () {
        if (this.playerHand === undefined) {
            throw new Error("Player hand isn't established yet");
        }
        this.playerHand.addCard(this.dealer.dealCard());
        this.evaluateHand();
    };
    Table.prototype.isPlayerBust = function () {
        return this.playerBust;
    };
    Table.prototype.isPlayerPlaying = function () {
        return this.playerPlaying;
    };
    Table.prototype.receiveAnte = function (ante) {
        this.player.wager(ante);
        this.ante += ante;
    };
    Table.prototype.standPlayer = function () {
        this.playerPlaying = false;
    };
    Table.BLACKJACK = 21;
    return Table;
}());
exports.default = Table;

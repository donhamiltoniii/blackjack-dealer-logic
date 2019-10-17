'use strict';

var playingCardDeckGenerator = require('playing-card-deck-generator');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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
        var firstHand = new Hand(this.deck.dealTopCard(), this.deck.dealTopCard());
        var secondHand = new Hand(this.deck.dealTopCard(), this.deck.dealTopCard());
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
}(Player));

var Result;
(function (Result) {
    Result[Result["LOSS"] = 0] = "LOSS";
    Result[Result["PUSH"] = 1] = "PUSH";
    Result[Result["WIN"] = 2] = "WIN";
})(Result || (Result = {}));
var Result$1 = Result;

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
            return Result$1.WIN;
        }
        if (this.evaluateUser() < this.evaluateDealer() || this.isUserBust()) {
            return Result$1.LOSS;
        }
        if (this.evaluateUser() === this.evaluateDealer()) {
            return Result$1.PUSH;
        }
        return Result$1.WIN;
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

var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(chips) {
        if (chips === void 0) { chips = 200; }
        var _this = _super.call(this) || this;
        _this.chips = chips;
        return _this;
    }
    User.prototype.getChips = function () {
        return this.chips;
    };
    User.prototype.receiveChips = function (chips) {
        this.chips += chips;
    };
    User.prototype.wager = function (ante) {
        if (ante > this.chips) {
            throw new Error("Can't wager more chips than are available!");
        }
        this.chips -= ante;
    };
    return User;
}(Player));

var singleDeckGame = new Table(new User(), new Dealer(playingCardDeckGenerator.standardDeck));

module.exports = singleDeckGame;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var playing_card_deck_generator_1 = require("playing-card-deck-generator");
var readline_sync_1 = __importDefault(require("readline-sync"));
var Dealer_1 = __importDefault(require("./src/components/Dealer"));
var Player_1 = __importDefault(require("./src/components/Player"));
var Table_1 = __importDefault(require("./src/components/Table"));
var gameTable = new Table_1.default(new Player_1.default(), new Dealer_1.default(playing_card_deck_generator_1.standardDeck));
p('--------------------------------------');
p('Welcome to Dondons BlackJack Emporium!');
p('--------------------------------------');
p();
p("Your current chip count is: " + gameTable.getPlayerChips());
var userWager = Number(ask('Please enter an amount to wager: '));
gameTable.receiveAnte(userWager);
p();
printCurrentAnte();
gameTable.deal();
p("Dealer is showing: " + gameTable.getDealerCardUp());
p("Your current hand: " + gameTable.getPlayerHandValue());
p();
p('Action choices:');
p('---------------');
p();
p('1. Hit');
p('2. Double');
p('3. Stand');
var userHandAction = ask('what would you like to do? ');
while (gameTable.isPlayerPlaying() && !gameTable.isPlayerBust()) {
    switch (userHandAction) {
        case '1':
            gameTable.hitPlayer();
            break;
        case '2':
            gameTable.doublePlayer();
            break;
        case '3':
            gameTable.standPlayer();
            break;
        default:
            break;
    }
}
if (gameTable.isPlayerBust()) {
    p('BUST! you lose... Better luck next time!');
}
p();
p("Dealer has: " + gameTable.getDealerHandValue());
// Private Interface
function ask(question) {
    if (question === void 0) { question = ''; }
    return readline_sync_1.default.question(question);
}
function p(msg) {
    if (msg === void 0) { msg = ''; }
    console.log(msg);
}
function printCurrentAnte() {
    p("Current Ante: " + gameTable.getAnte());
    p('-----------------');
    p();
}

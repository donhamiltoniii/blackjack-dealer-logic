"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var playing_card_deck_generator_1 = require("playing-card-deck-generator");
var readline_sync_1 = __importDefault(require("readline-sync"));
var Dealer_1 = __importDefault(require("./src/components/Dealer"));
var Result_1 = __importDefault(require("./src/components/Result"));
var Table_1 = __importDefault(require("./src/components/Table"));
var User_1 = __importDefault(require("./src/components/User"));
var gameTable = new Table_1.default(new User_1.default(), new Dealer_1.default(playing_card_deck_generator_1.standardDeck));
var gameIsRunning = true;
p("--------------------------------------");
p("Welcome to Dondons BlackJack Emporium!");
p("--------------------------------------");
while (gameIsRunning) {
    p();
    p("Your current chip count is: " + gameTable.getUserChips());
    var userWager = Number(ask("Please enter an amount to wager: "));
    gameTable.receiveAnte(userWager);
    p();
    printCurrentAnte();
    gameTable.deal();
    p("Dealer is showing: " + gameTable.getDealerCardUp());
    p("Your current hand: " + gameTable.getUserHandValue());
    p();
    p("Action choices:");
    p("---------------");
    p();
    p("1. Hit");
    p("2. Double");
    p("3. Stand");
    while (gameTable.isUserPlaying() && !gameTable.isUserBust()) {
        var userHandAction = ask("what would you like to do? ");
        switch (userHandAction) {
            case "1":
                gameTable.hitUser();
                break;
            case "2":
                gameTable.doubleUser();
                break;
            case "3":
                gameTable.standUser();
                break;
            default:
                break;
        }
        p("Your current hand: " + gameTable.getUserHandValue());
    }
    p();
    gameTable.settleDealerHand();
    p("Dealer has: " + gameTable.getDealerHandValue());
    switch (gameTable.outcome()) {
        case Result_1.default.LOSS:
            p("You lost you fucking loser...");
            gameTable.resetAnte();
            break;
        case Result_1.default.PUSH:
            p("Push... at least you get your money back...");
            gameTable.pushHand();
        case Result_1.default.WIN:
            p("Congrats!!! You win!!!");
            gameTable.userWin();
        default:
            break;
    }
    gameTable.resetPlayers();
}
// Private Interface
function ask(question) {
    if (question === void 0) { question = ""; }
    return readline_sync_1.default.question(question);
}
function p(msg) {
    if (msg === void 0) { msg = ""; }
    console.log(msg);
}
function printCurrentAnte() {
    p("Current Ante: " + gameTable.getAnte());
    p("-----------------");
    p();
}

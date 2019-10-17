import { standardDeck } from "playing-card-deck-generator";
import * as input from "readline-sync";
import Dealer from "./src/components/Dealer";
import Result from "./src/components/Result";
import Table from "./src/components/Table";
import User from "./src/components/User";

const gameTable = new Table(new User(), new Dealer(standardDeck));
const gameIsRunning = true;

p("--------------------------------------");
p("Welcome to Dondons BlackJack Emporium!");
p("--------------------------------------");
while (gameIsRunning) {
  p();
  p(`Your current chip count is: ${gameTable.getUserChips()}`);
  const userWager = Number(ask("Please enter an amount to wager: "));
  gameTable.receiveAnte(userWager);
  p();
  printCurrentAnte();
  gameTable.deal();
  p(`Dealer is showing: ${gameTable.getDealerCardUp()}`);
  p(`Your current hand: ${gameTable.getUserHandValue()}`);
  p();
  p("Action choices:");
  p("---------------");
  p();
  p("1. Hit");
  p("2. Double");
  p("3. Stand");

  while (gameTable.isUserPlaying() && !gameTable.isUserBust()) {
    const userHandAction: string = ask("what would you like to do? ");
    switch (userHandAction) {
      case "1":
        gameTable.hitUser();
        gameTable.evaluateUser();
        break;

      case "2":
        gameTable.doubleUser();
        gameTable.evaluateUser();
        break;

      case "3":
        gameTable.standUser();
        gameTable.evaluateUser();
        break;

      default:
        break;
    }
    p(`Your current hand: ${gameTable.getUserHandValue()}`);
  }
  p();

  gameTable.settleDealerHand();

  p(`Dealer has: ${gameTable.getDealerHandValue()}`);

  switch (gameTable.outcome()) {
    case Result.LOSS:
      p("You lost...");
      gameTable.resetAnte();
      break;
    case Result.PUSH:
      p("Push... at least you get your money back!");
      gameTable.pushHand();
    case Result.WIN:
      p("Congrats!!! You win!!!");
      gameTable.userWin();

    default:
      break;
  }

  gameTable.resetPlayers();
}

// Private Interface
function ask(query: string = "") {
  return input.question(query);
}

function p(msg: string = "") {
  console.log(msg);
}

function printCurrentAnte() {
  p(`Current Ante: ${gameTable.getAnte()}`);
  p("-----------------");
  p();
}

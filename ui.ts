import { standardDeck } from "playing-card-deck-generator"
import input from "readline-sync"
import Dealer from "./src/components/Dealer"
import Player from "./src/components/Player"
import Table from "./src/components/Table"

const gameTable = new Table(new Player(), new Dealer(standardDeck));

p("--------------------------------------");
p("Welcome to Dondons BlackJack Emporium!");
p("--------------------------------------");
p();
const userWager = Number(ask("Please enter an amount to wager: "));
gameTable.receiveAnte(userWager);
p();
printCurrentAnte();
gameTable.deal();
p(`Dealer is showing: ${gameTable.getDealerCardUp()}`);
p(`Your current hand: ${gameTable.getPlayerHandValues()}`);

// Private Interface
function ask(question: string = "") {
  return input.question(question);
}

function p(msg: string = "") {
  console.log(msg);
}

function printCurrentAnte() {
  p(`Current Ante: ${gameTable.getAnte()}`);
  p("-----------------");
  p();
}

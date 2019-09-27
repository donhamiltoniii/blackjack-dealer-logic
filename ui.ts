import { standardDeck } from 'playing-card-deck-generator'
import input from 'readline-sync'
import Dealer from './src/components/Dealer'
import Player from './src/components/Player'
import Table from './src/components/Table'

const gameTable = new Table(new Player(), new Dealer(standardDeck))

p('--------------------------------------')
p('Welcome to Dondons BlackJack Emporium!')
p('--------------------------------------')
p()
p(`Your current chip count is: ${gameTable.getPlayerChips()}`)
const userWager = Number(ask('Please enter an amount to wager: '))
gameTable.receiveAnte(userWager)
p()
printCurrentAnte()
gameTable.deal()
p(`Dealer is showing: ${gameTable.getDealerCardUp()}`)
p(`Your current hand: ${gameTable.getPlayerHandValue()}`)
p()
p('Action choices:')
p('---------------')
p()
p('1. Hit')
p('2. Double')
p('3. Stand')
const userHandAction: string = ask('what would you like to do? ')

while (gameTable.isPlayerPlaying() && !gameTable.isPlayerBust()) {
  switch (userHandAction) {
    case '1':
      gameTable.hitPlayer()
      break

    case '2':
      gameTable.doublePlayer()
      break

    case '3':
      gameTable.standPlayer()
      break

    default:
      break
  }
}

if (gameTable.isPlayerBust()) {
  p('BUST! you lose... Better luck next time!')
}
p()
p(`Dealer has: ${gameTable.getDealerHandValue()}`)

// Private Interface
function ask(question: string = '') {
  return input.question(question)
}

function p(msg: string = '') {
  console.log(msg)
}

function printCurrentAnte() {
  p(`Current Ante: ${gameTable.getAnte()}`)
  p('-----------------')
  p()
}

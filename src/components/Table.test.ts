import { Card, standardDeck } from 'playing-card-deck-generator'
import Dealer from './Dealer'
import Hand from './Hand'
import Player from './Player'
import Table from './Table'

describe('Table', () => {
  let testDealer: Dealer
  let testPlayer: Player
  let underTest: Table

  beforeEach(() => {
    testDealer = new Dealer(standardDeck)
    testPlayer = new Player()
    underTest = new Table(testPlayer, testDealer)
  })

  describe('receiveAnte', () => {
    test('increases ante value', () => {
      underTest.receiveAnte(25)

      expect(underTest.getAnte()).toEqual(25)
    })

    test('decreases Player ante', () => {
      underTest.receiveAnte(25)

      expect(underTest.getPlayerChips()).toEqual(175)
    })

    test('throws error if error is received from Player.wager', () => {
      expect(() => {
        underTest.receiveAnte(300)
      }).toThrow("Can't wager more chips than are available!")
    })
  })

  describe('deal', () => {
    test('should call Dealer.dealHands', () => {
      testDealer.dealHands = jest.fn(() => [
        new Hand(new Card('', ''), new Card('', '')),
        new Hand(new Card('', ''), new Card('', ''))
      ])
      underTest.deal()

      expect(testDealer.dealHands).toHaveBeenCalled()
    })

    test('should populate the dealerHand and playerHand', () => {
      underTest.deal()

      expect(underTest.getDealerHand()).toBeInstanceOf(Hand)
      expect(underTest.getPlayerHand()).toBeInstanceOf(Hand)
    })
  })

  describe('getDealerHand', () => {
    test('should throw error if dealerHand is undefined', () => {
      expect(() => {
        underTest.getDealerHand()
      }).toThrow("dealerHand isn't defined yet")
    })
  })

  describe('getDealerCardUp', () => {
    test('should return first card in dealer hand', () => {
      underTest.deal()

      const actual: string = underTest.getDealerCardUp()

      expect(actual).toBe(
        underTest
          .getDealerHand()
          .getFirstCard()
          .getValue()
      )
    })
  })

  describe('getPlayerHAndValues', () => {
    test('should throw error if playerHand is undefined', () => {
      expect(() => {
        underTest.getPlayerHandValues()
      }).toThrow("playerHand isn't defined yet")
    })

    test('should return a string of comma seperated values representing the current hand', () => {
      underTest.deal()

      const actual = underTest.getPlayerHandValues()

      expect(actual).toBe(`4♤, 5♤`)
    })
  })
})

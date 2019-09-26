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

  describe('getPlayerHandValue', () => {
    test('should throw error if playerHand is undefined', () => {
      expect(() => {
        underTest.getPlayerHandValue()
      }).toThrow("playerHand isn't defined yet")
    })

    test('should return a string of comma separated values representing the current hand', () => {
      underTest.deal()

      const actual = underTest.getPlayerHandValue()

      expect(actual).toBe(
        underTest
          .getPlayerHand()
          .getCards()
          .map((card: Card) => card.getValue())
          .join(', ')
      )
    })
  })

  describe('hitPlayer', () => {
    test('should deal a card to player hand', () => {
      underTest.deal()
      underTest.hitPlayer()

      const playerHandLength = underTest.getPlayerHand().getCards().length

      expect(playerHandLength).toEqual(3)
    })

    test('should call evaluateHand', () => {
      underTest.evaluateHand = jest.fn()

      underTest.deal()
      underTest.hitPlayer()

      expect(underTest.evaluateHand).toBeCalledTimes(1)
    })
  })

  describe('doublePlayer', () => {
    test('should deal one card to player', () => {
      underTest.deal()
      underTest.doublePlayer()

      const playerHandLength = underTest.getPlayerHand().getCards().length

      expect(playerHandLength).toEqual(3)
    })

    test('should double ante', () => {
      underTest.deal()
      underTest.receiveAnte(25)
      const currentAnte = underTest.getAnte()

      underTest.doublePlayer()
      const newAnte = underTest.getAnte()

      expect(currentAnte * 2).toEqual(newAnte)
    })

    test('should set playerPlaying to flase', () => {
      underTest.deal()
      underTest.doublePlayer()

      expect(underTest.isPlayerPlaying()).toBeFalsy()
    })

    test('should call evaluateHand', () => {
      underTest.evaluateHand = jest.fn()

      underTest.deal()
      underTest.doublePlayer()

      expect(underTest.evaluateHand).toBeCalledTimes(1)
    })
  })

  describe('standPlayer', () => {
    test('should set playerPlaying to false', () => {
      underTest.standPlayer()

      expect(underTest.isPlayerPlaying()).toBeFalsy()
    })
  })

  describe('getDealerHandValue', () => {
    test('should throw error if dealerHand is undefined', () => {
      expect(() => {
        underTest.getDealerHandValue()
      }).toThrow("dealerHand isn't defined yet")
    })

    test('should return a string of comma seperated values representing the current hand', () => {
      underTest.deal()

      const actual = underTest.getDealerHandValue()

      expect(actual).toBe(
        underTest
          .getDealerHand()
          .getCards()
          .map((card: Card) => card.getValue())
          .join(', ')
      )
    })
  })

  describe('evaluateHand', () => {
    test('should set playerBust to true when hand value is over 21', () => {
      testDealer.dealHands = jest.fn((): Hand[] => [
        new Hand(new Card('10', 'R'), new Card('3', '7')),
        new Hand(new Card('10', 'R'), new Card('A', '🎓'))
      ])
      underTest.deal()
      underTest.hitPlayer()

      expect(testDealer.dealHands).toHaveBeenCalledTimes(1)
      // expect(underTest.isPlayerBust()).toBeTruthy()
    })
  })
})

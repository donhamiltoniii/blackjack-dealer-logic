import { standardDeck } from 'playing-card-deck-generator'
import Dealer from './Dealer'
import Hand from './Hand'

describe('Dealer', () => {
  describe('constructor', () => {
    test('should shuffle deck before assignment', () => {
      const testDeck = standardDeck
      const underTest = new Dealer(standardDeck)

      expect(testDeck).toMatchObject(underTest.getDeck())
    })
  })

  describe('dealHands', () => {
    test('should return an Array of two hands', () => {
      const underTest = new Dealer(standardDeck)

      const hands: Hand[] = underTest.dealHands()

      expect(hands).toBeInstanceOf(Array)
      expect(hands.length).toEqual(2)
    })
  })

  describe('dealCard', () => {
    test('should decrease length of deck', () => {
      const underTest = new Dealer(standardDeck)

      const initialDeckLength = underTest.getDeck().getCards().length
      underTest.dealCard()
      const newDeckLength = underTest.getDeck().getCards().length

      expect(initialDeckLength - 1).toEqual(newDeckLength)
    })
  })
})

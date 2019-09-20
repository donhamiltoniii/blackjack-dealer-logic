import DeckGenerator, { standardDeck } from 'playing-card-deck-generator'
import Dealer from './Dealer'
import Hand from './Hand'

describe('Dealer', () => {
  describe('dealHands', () => {
    test('should return an Array of two hands', () => {
      const underTest = new Dealer(standardDeck)

      const hands: Hand[] = underTest.dealHands()

      expect(hands).toBeInstanceOf(Array)
      expect(hands.length).toEqual(2)
    })
  })
})

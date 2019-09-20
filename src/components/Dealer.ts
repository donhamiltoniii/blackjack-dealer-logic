import { Deck } from 'playing-card-deck-generator'
import Hand from './Hand'

class Dealer {
  private deck: Deck

  constructor(deck: Deck) {
    this.deck = deck
  }

  public dealHands(): Hand[] {
    const firstHand = new Hand(this.deck.dealTopCard(), this.deck.dealTopCard())
    const secondHand = new Hand(
      this.deck.dealTopCard(),
      this.deck.dealTopCard()
    )

    return [firstHand, secondHand]
  }
}

export default Dealer

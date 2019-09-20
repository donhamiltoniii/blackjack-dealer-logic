import { Card, Deck } from 'playing-card-deck-generator'
import Hand from './Hand'

class Dealer {
  private deck: Deck

  constructor(deck: Deck) {
    deck.shuffle()
    this.deck = deck
  }

  public dealCard(): Card {
    return this.deck.dealTopCard()
  }

  public dealHands(): Hand[] {
    const firstHand = new Hand(this.deck.dealTopCard(), this.deck.dealTopCard())
    const secondHand = new Hand(
      this.deck.dealTopCard(),
      this.deck.dealTopCard()
    )

    return [firstHand, secondHand]
  }

  public getDeck(): Deck {
    return this.deck
  }
}

export default Dealer

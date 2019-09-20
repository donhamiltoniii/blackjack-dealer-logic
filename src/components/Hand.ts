import { Card } from 'playing-card-deck-generator'

class Hand {
  private cards: Card[]

  constructor(cardOne: Card, cardTwo: Card) {
    this.cards = []
    this.cards.push(cardOne)
    this.cards.push(cardTwo)
  }

  public getFirstCard(): Card {
    return this.cards[0]
  }

  public getHandValue(): string {
    return this.cards.map((card: Card) => card.getValue()).join(', ')
  }
}

export default Hand

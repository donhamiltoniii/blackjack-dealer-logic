import { Card } from "playing-card-deck-generator";

class Hand {
  private cards: Card[];

  constructor(cardOne: Card, cardTwo: Card) {
    this.cards = [];
    this.cards.push(cardOne);
    this.cards.push(cardTwo);
  }

  public addCard(card: Card) {
    this.cards.push(card);
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public getFirstCard(): Card {
    return this.cards[0];
  }

  public getHandValue(): string {
    return this.cards
      .map((card: Card) => card.getCardValue().join(""))
      .join(", ");
  }

  public getHandValues(): string[] {
    return this.cards.map((card: Card) => card.getValue());
  }
}

export default Hand;

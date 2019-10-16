import { Card, Deck } from "playing-card-deck-generator";
import Hand from "./Hand";
import Player from "./Player";

class Dealer extends Player {
  private deck: Deck;

  constructor(deck: Deck) {
    super();
    deck.shuffle();
    this.deck = deck;
  }

  public dealCard(): Card {
    return this.deck.dealTopCard();
  }

  public dealHands(): Hand[] {
    const firstHand = new Hand(this.deck.dealTopCard(), this.deck.dealTopCard());
    const secondHand = new Hand(
      this.deck.dealTopCard(),
      this.deck.dealTopCard(),
    );

    return [firstHand, secondHand];
  }

  public getCardUp(): string {
    if (this.getHand() === undefined) {
      throw new Error("dealerHand isn't defined yet");
    }
    const firstCard: Card = this.getHand().getFirstCard();
    const cardValue: string = firstCard.getCardValue().join("");
    return cardValue;
  }

  public getDeck(): Deck {
    return this.deck;
  }
}

export default Dealer;

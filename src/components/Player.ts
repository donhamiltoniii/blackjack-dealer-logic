import Card from "playing-card-deck-generator/dist/Card";
import Hand from "./Hand";

abstract class Player {
  private bust: boolean;
  private hand: Hand | undefined;
  private playing: boolean;

  constructor() {
    this.bust = false;
    this.playing = true;
  }

  public double(card: Card) {
    this.hit(card);
    this.playing = false;
  }

  public getHand() {
    if (typeof this.hand === "undefined") {
      throw new Error("Hand must be defined!");
    }
    return this.hand;
  }

  public hit(card: Card) {
    if (typeof this.hand === "undefined") {
      throw new Error("Hand must be defined!");
    }
    this.hand.addCard(card);
  }

  public isBust(): boolean {
    return this.bust;
  }

  public isPlaying(): boolean {
    return this.playing;
  }

  public receiveHand(hand: Hand) {
    this.hand = hand;
  }

  public reset(): void {
    this.bust = false;
    this.playing = true;
  }

  public setBust(value: boolean) {
    this.bust = value;
  }

  public setPlaying(value: boolean) {
    this.playing = value;
  }

  public stand(): void {
    this.setPlaying(false);
  }
}

export default Player;

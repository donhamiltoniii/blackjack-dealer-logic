import Dealer from "./Dealer";
import Hand from "./Hand";
import Player from "./Player";
import Result from "./Result";
import User from "./User";

class Table {
  private static BLACKJACK: number = 21;

  private ante: number;
  private dealer: Dealer;
  private user: User;

  constructor(user: User, dealer: Dealer) {
    this.ante = 0;
    this.dealer = dealer;
    this.user = user;
  }

  public deal() {
    const [dealerHand, playerHand] = this.dealer.dealHands();
    this.dealer.receiveHand(dealerHand);
    this.user.receiveHand(playerHand);
  }

  public doubleUser(): void {
    this.user.double(this.dealer.dealCard());
    this.user.wager(this.ante);
    this.ante = this.ante * 2;
  }

  public evaluateDealer() {
    return this.evaluateHand(this.dealer.getHand().getHandValues(), this.dealer);
  }

  public evaluateUser() {
    return this.evaluateHand(this.user.getHand().getHandValues(), this.user);
  }

  public getAnte(): number {
    return this.ante;
  }

  public getDealerCardUp(): string {
    return this.dealer.getCardUp();
  }

  public getDealerHandValue() {
    return this.dealer.getHand().getHandValue();
  }

  public getUserChips(): number {
    return this.user.getChips();
  }

  public getUserHandValue(): string {
    return this.user.getHand().getHandValue();
  }

  public hitDealer(): void {
    this.dealer.hit(this.dealer.dealCard());
  }

  public hitUser(): void {
    this.user.hit(this.dealer.dealCard());
  }

  public isDealerBust(): boolean {
    return this.dealer.isBust();
  }

  public isDealerPlaying(): boolean {
    return this.dealer.isPlaying();
  }

  public isUserBust(): boolean {
    return this.user.isBust();
  }

  public isUserPlaying(): boolean {
    return this.user.isPlaying();
  }

  public outcome(): Result {
    if (this.isDealerBust() && !this.isUserBust()) {
      return Result.WIN;
    }
    if (this.evaluateUser() < this.evaluateDealer() || this.isUserBust()) {
      return Result.LOSS;
    }
    if (this.evaluateUser() === this.evaluateDealer()) {
      return Result.PUSH;
    }
    return Result.WIN;
  }

  public pushHand(): void {
    this.user.receiveChips(this.ante);
    this.resetAnte();
  }

  public receiveAnte(ante: number): void {
    this.user.wager(ante);
    this.ante += ante;
  }

  public resetAnte() {
    this.ante = 0;
  }

  public resetPlayers(): void {
    this.user.reset();
    this.dealer.reset();
  }

  public settleDealerHand(): void {
    while (this.evaluateDealer() < 17) {
      this.hitDealer();
    }
    this.standDealer();
  }

  public standDealer() {
    this.dealer.stand();
  }

  public standUser() {
    this.user.stand();
  }

  public userWin() {
    const payOut = this.ante * 2;
    this.user.receiveChips(payOut);
    this.resetAnte();
  }

  private getUserHand(): Hand {
    return this.user.getHand();
  }

  private getDealerHand(): Hand {
    return this.dealer.getHand();
  }

  private evaluateHand(values: string[], player: Player): number {

    let valueTotal: number = 0;

    values.forEach((value: string) => {
      if (value === "A") {
        valueTotal += 11;
      } else if (value === "J" || value === "Q" || value === "K") {
        valueTotal += 10;
      } else {
        valueTotal += Number(value);
      }
    });

    if (valueTotal > Table.BLACKJACK && values.includes("A")) {
      const firstAce = values.indexOf("A");
      values[firstAce] = "1";
      return this.evaluateHand(values, player);
    } else {
      if (valueTotal > Table.BLACKJACK) {
        player.setBust(true);
      }
      return valueTotal;
    }
  }

}

export default Table;

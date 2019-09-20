import { Card } from 'playing-card-deck-generator'
import Dealer from './Dealer'
import Hand from './Hand'
import Player from './Player'

class Table {
  private ante: number
  private dealer: Dealer
  private dealerHand: Hand | undefined
  private player: Player
  private playerHand: Hand | undefined
  private playerPlaying: boolean

  constructor(player: Player, dealer: Dealer) {
    this.ante = 0
    this.dealer = dealer
    this.player = player
    this.playerPlaying = true
  }

  public deal() {
    const [dealerHand, playerHand] = this.dealer.dealHands()
    this.dealerHand = dealerHand
    this.playerHand = playerHand
  }

  public doublePlayer(): void {
    if (this.playerHand === undefined) {
      throw new Error("Player hand isn't established yet")
    }
    this.playerHand.addCard(this.dealer.dealCard())
    this.player.wager(this.ante)
    this.ante = this.ante * 2
    this.playerPlaying = false
  }

  public getAnte(): number {
    return this.ante
  }

  public getDealerCardUp(): string {
    if (this.dealerHand === undefined) {
      throw new Error("dealerHand isn't defined yet")
    }
    const firstDealerCard: Card = this.dealerHand.getFirstCard()
    const cardValue: string = firstDealerCard.getValue()
    return cardValue
  }

  public getDealerHand(): Hand {
    if (this.dealerHand === undefined) {
      throw new Error("dealerHand isn't defined yet")
    }
    return this.dealerHand
  }

  public getDealerHandValue() {
    if (this.dealerHand === undefined) {
      throw new Error("dealerHand isn't defined yet")
    }
    return this.dealerHand.getHandValue()
  }

  public getPlayerChips(): number {
    return this.player.getChips()
  }

  public getPlayerHand(): Hand {
    if (this.playerHand === undefined) {
      throw new Error("playerHand isn't defined yet")
    }
    return this.playerHand
  }

  public getPlayerHandValue(): string {
    if (this.playerHand === undefined) {
      throw new Error("playerHand isn't defined yet")
    }
    return this.playerHand.getHandValue()
  }

  public hitPlayer(): void {
    if (this.playerHand === undefined) {
      throw new Error("Player hand isn't established yet")
    }
    this.playerHand.addCard(this.dealer.dealCard())
  }

  public isPlayerBust(): boolean {
    throw new Error('Method not implemented.')
  }

  public isPlayerPlaying(): boolean {
    return this.playerPlaying
  }

  public receiveAnte(ante: number): void {
    this.player.wager(ante)
    this.ante += ante
  }

  public standPlayer() {
    this.playerPlaying = false
  }

  private getDealer(): Dealer {
    return this.dealer
  }
}

export default Table

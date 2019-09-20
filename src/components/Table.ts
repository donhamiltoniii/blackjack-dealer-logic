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

  constructor(player: Player, dealer: Dealer) {
    this.ante = 0
    this.dealer = dealer
    this.player = player
  }

  public deal() {
    const [dealerHand, playerHand] = this.dealer.dealHands()
    this.dealerHand = dealerHand
    this.playerHand = playerHand
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

  public getPlayerChips(): number {
    return this.player.getChips()
  }

  public getPlayerHand(): Hand {
    if (this.playerHand === undefined) {
      throw new Error("playerHand isn't defined yet")
    }
    return this.playerHand
  }

  public getPlayerHandValues() {
    if (this.playerHand === undefined) {
      throw new Error("playerHand isn't defined yet")
    }
    return this.playerHand.getHandValue()
  }

  public receiveAnte(ante: number) {
    this.player.wager(ante)
    this.ante += ante
  }
}

export default Table

import { Card } from 'playing-card-deck-generator'
import Dealer from './Dealer'
import Hand from './Hand'
import Player from './Player'

class Table {
  private static BLACKJACK: number = 21
  private ante: number
  private dealer: Dealer
  private dealerHand: Hand | undefined
  private player: Player
  private playerBust: boolean
  private playerHand: Hand | undefined
  private playerPlaying: boolean

  constructor(player: Player, dealer: Dealer) {
    this.ante = 0
    this.dealer = dealer
    this.player = player
    this.playerBust = false
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
    this.evaluateHand()
  }

  public evaluateHand(): void {
    if (this.playerHand === undefined) {
      throw new Error("Player hand isn't established yet")
    }

    let valueTotal: number = 0

    this.playerHand.getCards().forEach((card: Card) => {
      const value: string = card.getValue().split('')[0]

      if (value === 'A') {
        valueTotal += 11
      } else if (value === 'J' || value === 'Q' || value === 'K') {
        valueTotal += 10
      } else {
        valueTotal += Number(value)
      }
    })

    if (valueTotal > Table.BLACKJACK) {
      this.playerBust = true
    }
  }

  public getAnte(): number {
    return this.ante
  }

  public getDealer(): Dealer {
    return this.dealer
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
    this.evaluateHand()
  }

  public isPlayerBust(): boolean {
    return this.playerBust
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
}

export default Table

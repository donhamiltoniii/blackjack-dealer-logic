class Player {
  private chips: number

  constructor() {
    this.chips = 200
  }
  public wager(ante: number) {
    if (ante > this.chips) {
      throw new Error("Can't wager more chips than are available!")
    }
    this.chips -= ante
  }

  public getChips(): number {
    return this.chips
  }
}

export default Player

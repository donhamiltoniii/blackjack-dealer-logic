import Player from "./Player";

class User extends Player {
  private chips: number;

  constructor(chips: number = 200) {
    super();
    this.chips = chips;
  }

  public getChips(): number {
    return this.chips;
  }

  public receiveChips(chips: number) {
    this.chips += chips;
  }

  public wager(ante: number) {
    if (ante > this.chips) {
      throw new Error("Can't wager more chips than are available!");
    }
    this.chips -= ante;
  }
}

export default User;

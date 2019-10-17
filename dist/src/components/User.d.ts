import Player from "./Player";
declare class User extends Player {
    private chips;
    constructor(chips?: number);
    getChips(): number;
    receiveChips(chips: number): void;
    wager(ante: number): void;
}
export default User;

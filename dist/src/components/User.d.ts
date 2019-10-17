import Player from "./Player";
declare class User extends Player {
    private chips;
    constructor();
    getChips(): number;
    receiveChips(chips: number): void;
    wager(ante: number): void;
}
export default User;

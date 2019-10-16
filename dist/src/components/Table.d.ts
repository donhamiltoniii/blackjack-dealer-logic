import Dealer from "./Dealer";
import Hand from "./Hand";
import Result from "./Result";
import User from "./User";
declare class Table {
    private static BLACKJACK;
    private ante;
    private dealer;
    private user;
    constructor(user: User, dealer: Dealer);
    deal(): void;
    doubleUser(): void;
    evaluateDealer(): number;
    evaluateUser(): number;
    getAnte(): number;
    getDealer(): Dealer;
    getDealerCardUp(): string;
    getDealerHand(): Hand;
    getDealerHandValue(): string;
    getUserChips(): number;
    getUserHand(): Hand;
    getUserHandValue(): string;
    hitDealer(): void;
    hitUser(): void;
    isDealerBust(): boolean;
    isDealerPlaying(): boolean;
    isUserBust(): boolean;
    isUserPlaying(): boolean;
    outcome(): Result;
    pushHand(): void;
    receiveAnte(ante: number): void;
    resetAnte(): void;
    resetPlayers(): void;
    settleDealerHand(): void;
    standDealer(): void;
    standUser(): void;
    userWin(): void;
    private evaluateHand;
}
export default Table;

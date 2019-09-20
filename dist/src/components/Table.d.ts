import Dealer from './Dealer';
import Hand from './Hand';
import Player from './Player';
declare class Table {
    private ante;
    private dealer;
    private dealerHand;
    private player;
    private playerHand;
    constructor(player: Player, dealer: Dealer);
    deal(): void;
    getAnte(): number;
    getDealer(): Dealer;
    getDealerCardUp(): string;
    getDealerHand(): Hand;
    getPlayerChips(): number;
    getPlayerHand(): Hand;
    getPlayerHandValues(): string;
    receiveAnte(ante: number): void;
}
export default Table;

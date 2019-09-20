import { Deck } from 'playing-card-deck-generator';
import Hand from './Hand';
declare class Dealer {
    private deck;
    constructor(deck: Deck);
    dealHands(): Hand[];
    getDeck(): Deck;
}
export default Dealer;

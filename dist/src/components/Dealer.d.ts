import { Card, Deck } from 'playing-card-deck-generator';
import Hand from './Hand';
declare class Dealer {
    private deck;
    constructor(deck: Deck);
    dealCard(): Card;
    dealHands(): Hand[];
    getDeck(): Deck;
}
export default Dealer;

import { Card, Deck } from "playing-card-deck-generator";
import Hand from "./Hand";
import Player from "./Player";
declare class Dealer extends Player {
    private deck;
    constructor(deck: Deck);
    dealCard(): Card;
    dealHands(): Hand[];
    getCardUp(): string;
    getDeck(): Deck;
}
export default Dealer;

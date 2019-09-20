import { Card } from "playing-card-deck-generator";
declare class Hand {
    private cards;
    constructor(cardOne: Card, cardTwo: Card);
    getCards(): Card[];
    getFirstCard(): Card;
    getHandValue(): string;
}
export default Hand;

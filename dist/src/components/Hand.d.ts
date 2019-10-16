import { Card } from "playing-card-deck-generator";
declare class Hand {
    private cards;
    constructor(cardOne: Card, cardTwo: Card);
    addCard(card: Card): void;
    getCards(): Card[];
    getFirstCard(): Card;
    getHandValue(): string;
    getHandValues(): string[];
}
export default Hand;

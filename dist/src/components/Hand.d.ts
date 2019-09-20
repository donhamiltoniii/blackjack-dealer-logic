import { Card } from 'playing-card-deck-generator';
declare class Hand {
    private cards;
    constructor(cardOne: Card, cardTwo: Card);
    getFirstCard(): Card;
}
export default Hand;

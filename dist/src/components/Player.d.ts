import Card from "playing-card-deck-generator/dist/Card";
import Hand from "./Hand";
declare class Player {
    private bust;
    private hand;
    private playing;
    constructor();
    double(card: Card): void;
    getHand(): Hand;
    hit(card: Card): void;
    isBust(): boolean;
    isPlaying(): boolean;
    receiveHand(hand: Hand): void;
    reset(): void;
    setBust(value: boolean): void;
    setPlaying(value: boolean): void;
    stand(): void;
}
export default Player;

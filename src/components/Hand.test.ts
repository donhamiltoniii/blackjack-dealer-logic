import { Card } from "playing-card-deck-generator";
import Hand from "./Hand";

describe("Hand", () => {
  describe("getFirstCard", () => {
    test("should return the first card in hand", () => {
      const firstCard = new Card("2", "🤮");
      const underTest = new Hand(firstCard, new Card("6", "🤗"));

      const actual = underTest.getFirstCard();

      expect(actual).toBe(firstCard);
    });
  });

  describe("getHandValue", () => {
    test("should return string representation of hand with comma separated values", () => {
      const underTest = new Hand(new Card("2", "a"), new Card("3", "b"));

      const actual = underTest.getHandValue();

      expect(actual).toBe("2a, 3b");
    });
  });

  describe("addCard", () => {
    test("should increase number of cards in hand", () => {
      const underTest = new Hand(new Card("2", "a"), new Card("3", "b"));

      underTest.addCard(new Card("s", "✊"));
      const cardsLength = underTest.getCards().length;

      expect(cardsLength).toEqual(3);
    });
  });

  describe("getHandValues", () => {
    test("should return an array containing card values of current hand", () => {
      const underTest = new Hand(new Card("2", "a"), new Card("3", "b"));

      const actual: String[] = underTest.getHandValues();

      expect(actual).toStrictEqual(["2", "3"]);
    });
  });
});

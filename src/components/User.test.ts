import { Card } from "playing-card-deck-generator";
import Hand from "./Hand";
import User from "./User";

describe("User", () => {
  describe("wager", () => {
    test("should decrease chips", () => {
      const underTest = new User();

      underTest.wager(25);

      expect(underTest.getChips()).toEqual(175);
    });

    test("should throw error if ante is more than available chips", () => {
      const underTest = new User();

      expect(() => {
        underTest.wager(300);
      }).toThrow("Can't wager more chips than are available!");
    });
  });

  describe("receiveHand", () => {
    test("should populate hand", () => {
      const underTest = new User();

      underTest.receiveHand(new Hand(new Card("2", "suit"), new Card("2", "suit")));

      expect(underTest.getHand() instanceof Hand).toBeTruthy();
    });
  });

  describe("hit", () => {
    test("should add Card to Hand", () => {
      const underTest = new User();

      underTest.receiveHand(new Hand(new Card("2", "suit"), new Card("2", "suit")));
      underTest.hit(new Card("2", "suit"));

      expect(underTest.getHand().getCards().length).toEqual(3);
    });
  });
});

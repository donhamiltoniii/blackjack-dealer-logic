import { Card, standardDeck } from "playing-card-deck-generator";
import Dealer from "./Dealer";
import Hand from "./Hand";
import Result from "./Result";
import Table from "./Table";
import User from "./User";

describe("Table", () => {
  let testDealer: Dealer;
  let testUser: User;
  let underTest: Table;

  beforeEach(() => {
    testDealer = new Dealer(standardDeck);
    testUser = new User();
    underTest = new Table(testUser, testDealer);
  });

  describe("receiveAnte", () => {
    test("increases ante value", () => {
      underTest.receiveAnte(25);

      expect(underTest.getAnte()).toEqual(25);
    });

    test("decreases Player ante", () => {
      underTest.receiveAnte(25);

      expect(underTest.getUserChips()).toEqual(175);
    });

    test("throws error if error is received from Player.wager", () => {
      expect(() => {
        underTest.receiveAnte(300);
      }).toThrow("Can't wager more chips than are available!");
    });
  });

  describe("deal", () => {
    test("should call Dealer.dealHands", () => {
      testDealer.dealHands = jest.fn(() => [
        new Hand(new Card("", ""), new Card("", "")),
        new Hand(new Card("", ""), new Card("", "")),
      ]);
      underTest.deal();

      expect(testDealer.dealHands).toHaveBeenCalled();
    });

    test("should populate the dealerHand and playerHand", () => {
      underTest.deal();

      expect(underTest.getDealerHand()).toBeInstanceOf(Hand);
      expect(underTest.getUserHand()).toBeInstanceOf(Hand);
    });
  });

  describe("getDealerCardUp", () => {
    test("should return first card in dealer hand", () => {
      underTest.deal();

      const actual: string = underTest.getDealerCardUp();

      expect(actual).toBe(
        underTest
          .getDealerHand()
          .getFirstCard()
          .getCardValue()
          .join(""),
      );
    });
  });

  describe("getPlayerHandValue", () => {
    test("should return a string of comma separated values representing the current hand", () => {
      underTest.deal();

      const actual = underTest.getUserHandValue();

      expect(actual).toBe(
        underTest
          .getUserHand()
          .getCards()
          .map((card: Card) => card.getCardValue().join(""))
          .join(", "),
      );
    });
  });

  describe("hitPlayer", () => {
    test("should deal a card to player hand", () => {
      underTest.deal();
      underTest.hitUser();

      const playerHandLength = underTest.getUserHand().getCards().length;

      expect(playerHandLength).toEqual(3);
    });
  });

  describe("doublePlayer", () => {
    test("should deal one card to player", () => {
      underTest.deal();
      underTest.doubleUser();

      const playerHandLength = underTest.getUserHand().getCards().length;

      expect(playerHandLength).toEqual(3);
    });

    test("should double ante", () => {
      underTest.deal();
      underTest.receiveAnte(25);
      const currentAnte = underTest.getAnte();

      underTest.doubleUser();
      const newAnte = underTest.getAnte();

      expect(currentAnte * 2).toEqual(newAnte);
    });

    test("should set playerPlaying to false", () => {
      underTest.deal();
      underTest.doubleUser();

      expect(underTest.isUserPlaying()).toBeFalsy();
    });
  });

  describe("standPlayer", () => {
    test("should set playerPlaying to false", () => {
      underTest.standUser();

      expect(underTest.isUserPlaying()).toBeFalsy();
    });
  });

  describe("getDealerHandValue", () => {
    test("should return a string of comma separated values representing the current hand", () => {
      underTest.deal();

      const actual = underTest.getDealerHandValue();

      expect(actual).toBe(
        underTest
          .getDealerHand()
          .getCards()
          .map((card: Card) => card.getCardValue().join(""))
          .join(", "),
      );
    });
  });

  describe("evaluateHand", () => {
    test("should set playerBust to true when hand value is over 21", () => {
      testDealer.dealHands = jest.fn((): Hand[] => [
        new Hand(new Card("10", "suit"), new Card("10", "suit")),
        new Hand(new Card("10", "suit"), new Card("10", "suit")),
      ]);
      testDealer.dealCard = jest.fn(() => new Card("2", "suit"));
      underTest.deal();
      underTest.hitUser();
      underTest.evaluateUser();

      expect(testDealer.dealHands).toHaveBeenCalledTimes(1);
      expect(underTest.isUserBust()).toBeTruthy();
    });

    test("should evaluate Ace as value 1 when Hand evaluates to higher than 21", () => {
      testDealer.dealHands = jest.fn((): Hand[] => [
        new Hand(new Card("10", "suit"), new Card("10", "suit")),
        new Hand(new Card("10", "suit"), new Card("A", "suit")),
      ]);

      testDealer.dealCard = jest.fn((): Card => new Card("2", "suit"));

      underTest.deal();
      underTest.hitUser();

      expect(underTest.evaluateUser()).toBe(13);
    });

    test("should evaluate '9', 'A', 'A' as 21", () => {
      testDealer.dealHands = jest.fn((): Hand[] => [
        new Hand(new Card("10", "suit"), new Card("10", "suit")),
        new Hand(new Card("9", "suit"), new Card("A", "suit")),
      ]);

      testDealer.dealCard = jest.fn((): Card => new Card("A", "suit"));

      underTest.deal();
      underTest.hitUser();

      expect(underTest.evaluateUser()).toBe(21);
    });
  });

  describe("settleDealerHand", () => {
    test("should hit when hand evaluates to less than 17", () => {
      testDealer.dealHands = jest.fn((): Hand[] => [
        new Hand(new Card("10", "suit"), new Card("6", "suit")),
        new Hand(new Card("9", "suit"), new Card("A", "suit")),
      ]);

      testDealer.dealCard = jest.fn(() => new Card("4", "suit"));
      jest.spyOn(underTest, "hitDealer");

      underTest.deal();
      underTest.settleDealerHand();

      expect(underTest.hitDealer).toHaveBeenCalledTimes(1);
      expect(underTest.evaluateDealer()).toBe(20);
    });

    test("should stand when hand evaluates to 17+", () => {
      testDealer.dealHands = jest.fn((): Hand[] => [
        new Hand(new Card("10", "suit"), new Card("7", "suit")),
        new Hand(new Card("9", "suit"), new Card("A", "suit")),
      ]);

      testDealer.dealCard = jest.fn(() => new Card("4", "suit"));
      jest.spyOn(underTest, "standDealer");

      underTest.deal();
      underTest.settleDealerHand();

      expect(underTest.standDealer).toHaveBeenCalledTimes(1);
      expect(underTest.evaluateDealer()).toBe(17);
    });
  });

  describe("outcome", () => {
    test("returns Result.LOSS when userHand evaluates lower than dealerHand", () => {
      testDealer.dealHands = jest.fn((): Hand[] => [
        new Hand(new Card("10", "suit"), new Card("A", "suit")),
        new Hand(new Card("9", "suit"), new Card("A", "suit")),
      ]);

      underTest.deal();

      expect(underTest.outcome()).toBe(Result.LOSS);
    });

    test("returns result.PUSH when userHand evaluates the same as dealerHand", () => {
      testDealer.dealHands = jest.fn((): Hand[] => [
        new Hand(new Card("10", "suit"), new Card("7", "suit")),
        new Hand(new Card("10", "suit"), new Card("7", "suit")),
      ]);

      underTest.deal();

      expect(underTest.outcome()).toBe(Result.PUSH);
    });

    test("returns result.WIN when userHand evaluates higher than dealerHand", () => {
      testDealer.dealHands = jest.fn((): Hand[] => [
        new Hand(new Card("9", "suit"), new Card("A", "suit")),
        new Hand(new Card("10", "suit"), new Card("A", "suit")),
      ]);

      underTest.deal();

      expect(underTest.outcome()).toBe(Result.WIN);
    });
  });

  describe("resetAnte", () => {
    test("should set table ante to 0", () => {
      underTest.receiveAnte(50);

      underTest.resetAnte();

      expect(underTest.getAnte()).toEqual(0);
    });
  });

  describe("pushHand", () => {
    test("should pay user current ante", () => {
      underTest.receiveAnte(50);

      underTest.pushHand();

      expect(underTest.getUserChips()).toEqual(200);
    });

    test("should reset table ante", () => {
      underTest.receiveAnte(50);

      underTest.pushHand();

      expect(underTest.getAnte()).toEqual(0);
    });
  });

  describe("userWin", () => {
    test("should pay user double the current ante", () => {
      underTest.receiveAnte(50);

      underTest.userWin();

      expect(underTest.getUserChips()).toEqual(250);
    });

    test("should reset table ante", () => {
      underTest.receiveAnte(50);

      underTest.userWin();

      expect(underTest.getAnte()).toEqual(0);
    });
  });

  describe("resetPlayers", () => {
    test("should reset player bust and playing values", () => {
      underTest.deal()

      underTest.standUser()
      underTest.resetPlayers()

      expect(underTest.isUserBust()).toBe(false)
      expect(underTest.isUserPlaying()).toBe(true)
    })
  })
});

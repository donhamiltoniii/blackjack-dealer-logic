# Black Jack Game Logic

## Installation

`yarn add blackjack-dealer-logic`

or

`npm i blackjack-dealer-logic`

## Classes

### `Table`

The `Table` operates as the public interface of the package. All necessary actions for both `User` and `Dealer` can be performed through the `Table` instance.

#### `static BLACKJACK: number`

represents the number for blackjack (21)

---

#### `constructor(user: User, dealer: Dealer)`

Constructor receives a `User` and a `Dealer`. These are the only necessary players for the game

---

#### `deal(): void`

Uses the `Dealer` to provide a valid starting hand for both parties (`User` and `Dealer`)

---

#### `doubleUser(): void`

This method will allow deal the `User` one card, cease the `User` playing, and double the ante by taking another wager from the `User`

---

#### `evaluateDealer(): number`

Combines value of all cards and evaluates whether `Dealer` hand is bust or not.

Returns a number corresponding to the value of the current hand (i.e. `A♤, 10♡` would yield `21`)

---

#### `evaluateUser(): number`

Combines value of all cards and evaluates whether `User` hand is bust or not.

Returns a number corresponding to the value of the current hand (i.e. `A♤, 10♡` would yield `21`)

---

#### `getAnte(): number`

Gets current ante value

---

#### `getDealerCardUp(): string`

Returns A single card from the dealer.

---

#### `getDealerHandValue(): string`

Get the current value of the `Dealer` hand in the form of a comma separated string. (i.e. `'A♤', 'K♧'`)

---

#### `getUserChips(): number`

Get the `User`s current number of chips.

---

#### `getUserHandValue(): string`

Get the current value of the `Dealer` hand in the form of a comma separated string. (i.e. `'A♤', 'K♧'`)

---

#### `hitDealer(): void`

Deals the `Dealer` a single card and allows play to continue.

#### `hitUser(): void`

Deals the `User` a single card and allows play to continue.

---

#### `isDealerBust(): boolean`

Returns the current value of `Dealer.bust`.

---

#### `isDealerPlaying(): boolean`

Returns the current value of `Dealer.playing`.

---

#### `isUserBust(): boolean`

Returns the current value of `User.bust`.

---

#### `isUserPlaying(): boolean`

Returns the current value of `User.playing`.

---

#### `outcome(): Result`

Meant to be called when `User` and `Dealer` hands are no longer in play to evaluate the winner of the current round.

Returns a `Result` enum value.

---

#### `pushHand(): void`

To be called when `outcome` evaluates to `Result.PUSH`.

---

#### `receiveAnte(ante: number): void`

Sets the ante for the current round.

Receives chips from `User`.

---

#### `resetAnte(): void`

Resets ante to zero.

---

#### `resetPlayers(): void`

Resets the values of `bust` and `playing` to their starting values for both `User` and `Dealer`.

---

#### `settleDealerHand(): void`

Makes decisions for `Dealer`s hand based on the current value of said hand.

---

#### `standDealer(): void`

Calls `Dealer.stand()`.

---

#### `standUser(): void`

Calls `User.stand()`.

---

#### `userWin(): void`

To be called when `outcome` returns `Result.WIN`.

---

### `Dealer`

The `Dealer` class contains all methods the `Table` needs to properly handle the current deck as well as `Dealer` hand actions.

#### `constructor(deck: Deck)`

Dealer accepts a `Deck` object from `playing-card-deck-generator`.

---

#### `dealCard(): Card`

Retrieves top `Card` from `Deck`.

Returns retrieved `Card`.

---

#### `dealHands(): Hand[]`

Makes two valid `Hand` objects.

Returns an array containing newly created `Hand`s.

---

#### `getCardUp(): string`

Retrieves the first `Card` in `Dealer.hand`.

Returns a string value representing retrieved `Card`.

---

### `User`

The `User` class contains all logic for managing decisions the player makes through the game.

#### `constructor(chips: number = 200)`

Sets initial number of chips to 200 if no other value is given.

---

#### `getChips(): number`

Returns current number of chips.

---

#### `receiveChips(chips: number): void`

Adds a given number of chips to the `User`s chip count.

---

#### `wager(ante: number): void`

Removes a given number of chips from the `User`.

Throws error if ante is higher than available chips.

---

### `Player`

An abstract class that manages common properties for `Dealer` and `User`.

#### `constructor()`

Sets initial value of `bust` to `false`. Sets initial value of `playing` to `true`.

---

#### `double(card: Card): void`

Calls `hit` once and sets `playing` to `false`.

---

#### `getHand(): Hand`

Returns the current value of `Player.hand`

Throws error if `Player.hand` is `undefined`.

---

#### `hit(card: Card): void`

Adds a `Card` to `Player.hand`.

Throws error if `Player.hand` is `undefined`.

---

#### `isBust(): boolean`

Returns the current value of `Player.bust`.

---

#### `isPlaying(): boolean`

Returns the current value of `Player.playing`.

---

#### `receiveHand(hand: Hand): void`

Accepts a `Hand`.

Assigns given `Hand` to `Player.hand`.

---

#### `reset(): void`

Sets value of `Player.bust` to `false`. Sets value of `Player.playing` to `true`.

---

#### `setBust(value: boolean): void`

Accepts `boolean` value.

Assigns given `boolean` value to `Player.bust`

---

#### `setPlaying(value: boolean)`

Accepts `boolean` value.

Assigns given `boolean` value to `Player.playing`

---

#### `stand(): void`

Sets value of `Player.playing` to `false`

---

### `Hand`

Represents an individual `Hand` given to each `Player` every round.

#### `constructor(cardOne: Card, cardTwo: Card)`

Accepts two `Card` objects and stores them in an array.

---

#### `addCard(card: Card): void`

Accepts a `Card`.

Adds a given `Card` to the `Card` array.

---

#### `getCards(): Card[]`

Returns the current array of `Card`s.

---

#### `getFirstCard(): Card`

Returns the `Card` at index 0 in the `Card` array.

---

#### `getHandValue(): string`

Returns a string representation of the current `Card` array. (i.e. `A♧, 3♤, 7♢`)

---

#### `getHandValues(): string[]`

Returns a string array containing the values of all `Card`s in `Hand`.

---

### `Result`

Enum representing the possible round outcomes.

#### `Result.LOSS`

Indicates a loss.

---

#### `Result.PUSH`

Indicates hands are equal.

---

### `Result.WIN`

Indicates a victory.

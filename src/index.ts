import { standardDeck } from "playing-card-deck-generator";
import Dealer from "./components/Dealer";
import Table from "./components/Table";
import User from "./components/User";

const singleDeckGame = new Table(new User(), new Dealer(standardDeck));

export default singleDeckGame;

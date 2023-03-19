//import { TYPE } from './CARD.js';
//import { CheckCard } from './CheckCard.js';
import { CARD, TYPE } from "./CARD.js";
import { NUM_HAND, NUM_TOTAL, CheckCard } from "./CheckCard.js";
import { VideoPoker } from "./VideoPoker.js";

var game = new VideoPoker();
game.TotalProbability();

/*var game = new VideoPoker();
var checker = new CheckCard();

game.GenerateCARDForTest();
game.PrintHand();
game.ChangeHand();
game.PrintHand();
var hand = game.GetHand();

checker.Sorting(hand);
checker.PrintHandCheck(hand);*/

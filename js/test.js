//import { TYPE } from './CARD.js';
//import { CheckCard } from './CheckCard.js';
import { CARD, TYPE } from "./CARD.js";
import { NUM_HAND, NUM_TOTAL, CheckCard } from "./CheckCard.js";
import { VideoPoker } from "./VideoPoker.js";

var game = new VideoPoker();
game.TotalProbability();

var checker = new CheckCard();

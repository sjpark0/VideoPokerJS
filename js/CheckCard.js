//import { CARD } from "./CARD";
import { CARD, TYPE } from "./CARD.js";

export const NUM_TOTAL = 52;
export const NUM_HAND =  5;

export class CheckCard{
    constructor(){
        this.m_creditJackBetter = 1;
        this.m_creditTwoPair = 2;
        this.m_creditTriple = 3;
        this.m_creditStraight = 4;
        this.m_creditFlush = 6;
        this.m_creditFullHouse = 9;
        this.m_creditFourCARD = 25;
        this.m_creditStraightFlush = 50;
        this.m_creditRoyalFlush = 800;
    }

    IsOnePair(card){
        if(card[0].IsSameNumber(card[1])
            || card[1].IsSameNumber(card[2])
            || card[2].IsSameNumber(card[3])
            || card[3].IsSameNumber(card[4])) {
               return true;
           }
        else {
            return false;
        }
    }

    IsJackBetter(card) {
        if (((card[0].IsSameNumber(card[1]) && (card[0].m_number >= 11 || card[0].m_number == 1)) ||
            (card[1].IsSameNumber(card[2]) && (card[1].m_number >= 11 || card[1].m_number == 1)) ||
            (card[2].IsSameNumber(card[3]) && (card[2].m_number >= 11 || card[2].m_number == 1)) ||
            (card[3].IsSameNumber(card[4]) && (card[3].m_number >= 11 || card[3].m_number == 1)))) {
                return true;
            }
        else {
            return false;
        }
    }
    IsTwoPair(card) {
        if (((card[0].IsSameNumber(card[1]) && card[2].IsSameNumber(card[3])) ||
            (card[0].IsSameNumber(card[1]) && card[3].IsSameNumber(card[4])) ||
            (card[1].IsSameNumber(card[2]) && card[3].IsSameNumber(card[4])))){
                return true;
            }
        else {
            return false;
        }
    }
    IsTriple(card) {
        if ((card[0].IsSameNumber(card[2]) ||
            card[1].IsSameNumber(card[3]) ||
            card[2].IsSameNumber(card[4]))) {
                return true;
            }
        else {
            return false;
        }
    }
    IsFlush(card) {
        if ((card[0].IsSameType(card[1]) && card[0].IsSameType(card[2]) && card[0].IsSameType(card[3]) && card[0].IsSameType(card[4]))) {
               return true;
           }
        else {
            return false;
        }
    }
    IsStraight(card) {
        if ((card[0].m_number == card[1].m_number - 1 &&
                card[1].m_number == card[2].m_number - 1 &&
                card[2].m_number == card[3].m_number - 1 &&
                card[3].m_number == card[4].m_number - 1)) {
                return true;
            }
            else if ((card[0].m_number == 1 &&
                card[1].m_number == 10 &&
                card[2].m_number == 11 &&
                card[3].m_number == 12 &&
                card[4].m_number == 13)) {
                return true;
            }
        else {
            return false;
        }
    }
    IsFullHouse(card) {
        if (((card[0].IsSameNumber(card[2]) && card[3].IsSameNumber(card[4])) ||
            (card[0].IsSameNumber(card[1]) && card[2].IsSameNumber(card[4])))) {
               return true;
           }
        else {
            return false;
        }
    }
    IsFourCARD(card) {
        if ((card[0].IsSameNumber(card[3]) ||
            card[1].IsSameNumber(card[4]))) {
                return true;
            }
        else {
            return false;
        }
    }
    IsStraightFlush(card)  {
        if ((this.IsFlush(card) && this.IsStraight(card))) {
                return true;
            }
        else {
            return false;
        }
    }
    IsRoyalFlush(card)  {
        if ((this.IsFlush(card))) {
               if ((card[0].m_number == 1 &&
                   card[1].m_number == 10 &&
                   card[2].m_number == 11 &&
                   card[3].m_number == 12 &&
                   card[4].m_number == 13)) {
                   return true;
               }
            else {
                return false;
            }
           }
        else {
            return false
        }
    }
    
    ReturnCredit(card, bet) {
        if (this.IsRoyalFlush(card)) {
            return bet * this.m_creditRoyalFlush;
        }
        else if (this.IsStraightFlush(card)) {
            return bet * this.m_creditStraightFlush;
        }
        else if (this.IsFourCARD(card)) {
            return bet * this.m_creditFourCARD;
        }
        else if (this.IsFullHouse(card)) {
            return bet * this.m_creditFullHouse;
        }
        else if (this.IsFlush(card)) {
            return bet * this.m_creditFlush;
        }
        else if (this.IsStraight(card)) {
            return bet * this.m_creditStraight;
        }
        else if (this.IsTriple(card)) {
            return bet * this.m_creditTriple;
        }
        else if (this.IsTwoPair(card)) {
            return bet * this.m_creditTwoPair;
        }
        else if (this.IsJackBetter(card)) {
            return bet * this.m_creditJackBetter;
        }
        else {
            return 0;
        }
    }
    PrintHandCheck(card) {
        if (this.IsRoyalFlush(card)) {
            console.log("Royal Flush");
        }
        else if (this.IsStraightFlush(card)) {
            console.log("Straight Flush");
        }
        else if (this.IsFourCARD(card)) {
            console.log("Four CARD");
        }
        else if (this.IsFullHouse(card)) {
            console.log("Full House");
        }
        else if (this.IsFlush(card)) {
            console.log("Flush");
        }
        else if (this.IsStraight(card)) {
            console.log("Straight");
        }
        else if (this.IsTriple(card)) {
            console.log("Triple");
        }
        else if (this.IsTwoPair(card)) {
            console.log("Two Pair");
        }
        else if (this.IsJackBetter(card)) {
            console.log("Jack Better");
        }
        else if (this.IsOnePair(card)) {
            console.log("One Pair\n");
        }
        else {
            console.log("Nothing");
        }
    } // test
    Sorting(card) {
        var tempCARD = new CARD();
        
        for(var i = 0; i<NUM_HAND;i++){
            for(var j = (i+1);j < NUM_HAND;j++) {
                if (card[i].m_number > card[j].m_number) {
                    tempCARD.AssignFrom(card[i]);
                    card[i].AssignFrom(card[j]);
                    card[j].AssignFrom(tempCARD);
                }
            }
        }
    }
    // test
}
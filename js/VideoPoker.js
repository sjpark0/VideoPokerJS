import {CARD, TYPE} from "./CARD.js";
import { NUM_HAND, NUM_TOTAL, CheckCard } from "./CheckCard.js";

export class VideoPoker{
    constructor(){
        this.m_checker = new CheckCard();
        this.m_pHand = new Array(NUM_HAND);
        this.m_pAvail = new Array(NUM_HAND);
        this.m_pRemain = new Array(NUM_TOTAL - NUM_HAND);

        for(var i=0;i<NUM_HAND;i++){
            this.m_pHand[i] = new CARD();
            this.m_pAvail[i] = new CARD();
        }
        for(var i=0;i<NUM_TOTAL - NUM_HAND;i++){
            this.m_pRemain[i] = new CARD();
        }
    }
    ConValToType(val){
        switch(val){
            case 0:
                return TYPE.CARD_SPADE;
            case 1:
                return TYPE.CARD_CLOVER;
            case 2:
                return TYPE.CARD_HEART;
            case 3:
                return TYPE.CARD_DIAMOND;
            default:
                return TYPE.UNKNOWN;
        }
    }
    GenerateNCard(cardIdx, numTotalCard, numGenCard)  {
        var i = 0
        while(i < numGenCard) {
            cardIdx[i] = Math.floor(Math.random() * numTotalCard);
            for(var j =0;j<i;j++) {
                if(cardIdx[i] == cardIdx[j]) {
                    i--;
                    break;
                }
            }
            i++;
        }
    }
    ChangeOneCARD(card, handIdx, remainIdx)  {
        card[handIdx].AssignFrom(m_pRemain[remainIdx])
    }
    ComputeAvgCreditForCardChange(card, handIdx, numChangeCard) {
        
        values = this.ComputeTotalCreditForCardChange(card, handIdx, 0, numChangeCard)
        credit = value.first;
        numComputeCredit = value.second;
        
        return Float(credit) / Float(numComputeCredit)
        
    }
    ComputeTotalCreditForCardChange(card, handIdx,  startRemainIdx, numChangeCard) {
        var numComputeCredit = -1;
        if(numChangeCard == 0) {
            numComputeCredit = 1;
            return this.ComputeCredit(card);
        }
        
        var tempCARD = new Array(NUM_HAND);
        
        for(var i=0;i < NUM_HAND;i++) {
            tempCARD[i] = new CARD();
            tempCARD[i].AssignFrom(card[i]);
        }

        var credit = 0;
        var tempHandIdx = new Array(NUM_HAND); 
        for(var i=0;i<NUM_HAND - 1;i++){
            tempHandIdx[i] = handIdx[i + 1];
        }
        tempHandIdx[NUM_HAND - 1] = -1;

        for(var i = startRemainIdx;i <(NUM_TOTAL - NUM_HAND);i++) {
            this.ChangeOneCARD(tempCARD, handIdx[0], i);
            values = this.ComputeTotalCreditForCardChange(tempCARD, tempHandIdx, i + 1, numChangeCard - 1);
            credit += values.first;
            numComputeCredit += values.second;
        }
            
        return {
            first : credit,
            second : numComputeCredit,
        }
    }
    ComputeCredit(card)  {
        var tempCARD = new Array(NUM_HAND);
        for(var i = 0;i < NUM_HAND;i++){
            tempCARD[i] = new CARD();
            tempCARD[i].AssignFrom(card[i])
        }
        this.m_pChecker.Sorting(tempCARD)

        return this.m_pChecker.ReturnCredit(tempCARD, 1)
    }
    PrintResultForString() {        
        var tempCARD = new Array(NUM_HAND);
        for(var i = 0;i < NUM_HAND;i++){
            tempCARD[i] = new CARD();
            tempCARD[i].AssignFrom(card[i])
        }

        this.m_pChecker.Sorting(tempCARD)
        credit = this.m_pChecker.ReturnCredit(tempCARD, 1)
        result = this.m_pChecker.PrintHandCheckForString(tempCARD) + ", Credit : " + credit.toString()
        return result
    }
    PrintCard(card, numCard)  {
        for(i=0;i<numCard;i++) {
            card[i].Print()
        }
    }
    GetHand(){
        return this.m_pHand;
    }
    PrintHand(){
        this.PrintCard(this.m_pHand, NUM_HAND);
    }
    PrintHandForString(index) {
        return this.m_pHand[index].PrintForString()
    }
    GenerateCARD(cards) {
        var isHand = new Array(NUM_TOTAL);
        for(var i=0;i<NUM_TOTAL;i++){
            isHand[i] = false;
        }
        
        for(var i=0;i<NUM_HAND;i++){
            this.m_pHand[i].m_number = cards[i].m_number;
            this.m_pHand[i].m_type = cards[i].m_type;
            isHand[this.ConTypeToVal(cards[i].m_type) + (cards[i].m_number - 1) * 4] = true;
        }
        var cntRemain = 0;
        for(var i=0;i<NUM_TOTAL;i++) {
            if(!isHand[i]) {
                this.m_pRemain[cntRemain].m_number =  i / 4 + 1;
                this.m_pRemain[cntRemain].m_type = this.ConValToType(i % 4);
                cntRemain++;
            }
        }
    }
    GenerateCARD() {
        var isHand = new Array(NUM_TOTAL);
        for(var i=0;i<NUM_TOTAL;i++){
            isHand[i] = false;
        }

        var handIdx = new Array(NUM_HAND);
        for (var i=0;i<NUM_HAND;i++){
            handIdx[i] = -1;
        }

        GenerateNCard(handIdx,  NUM_TOTAL,  NUM_HAND);

        for(var i=0;i<NUM_HAND;i++){
            this.m_pHand[i].m_number = cards[i].m_number;
            this.m_pHand[i].m_type = cards[i].m_type;
            isHand[this.ConTypeToVal(cards[i].m_type) + (cards[i].m_number - 1) * 4] = true;
        }
        var cntRemain = 0;
        for(var i=0;i<NUM_TOTAL;i++) {
            if(!isHand[i]) {
                this.m_pRemain[cntRemain].m_number =  i / 4 + 1;
                this.m_pRemain[cntRemain].m_type = this.ConValToType(i % 4);
                cntRemain++;
            }
        }
    } // test
    GenerateCARDForTest() {        
        var isHand = new Array(NUM_TOTAL);
        for(var i=0;i<NUM_TOTAL;i++){
            isHand[i] = false;
        }

        var handIdx = new Array(NUM_HAND);
        handIdx[0] = 26;
        handIdx[1] = 44;
        handIdx[2] = 8;
        handIdx[3] = 19;
        handIdx[4] = 14;

        for(var i=0;i<NUM_HAND;i++){
            this.m_pHand[i].m_number = cards[i].m_number;
            this.m_pHand[i].m_type = cards[i].m_type;
            isHand[this.ConTypeToVal(cards[i].m_type) + (cards[i].m_number - 1) * 4] = true;
        }
        var cntRemain = 0;
        for(var i=0;i<NUM_TOTAL;i++) {
            if(!isHand[i]) {
                this.m_pRemain[cntRemain].m_number =  i / 4 + 1;
                this.m_pRemain[cntRemain].m_type = this.ConValToType(i % 4);
                cntRemain++;
            }
        }

    }
    ComputeOptimumChange(handIdx) {
        var tempHandIdx  = new Array(NUM_HAND);
        for(var i=0;i<NUM_HAND;i++){
            tempHandIdx[i] = handIdx[i];
        }
        
        var numChangeCard  = 0
        var credit = 0.0

        var optimumCredit = this.ComputeAvgCreditForCardChange(this.m_pHand, handIdx, 0)

        for(var i=0;i<NUM_HAND;i++) {
            tempHandIdx[0] = i;
            credit = this.ComputeAvgCreditForCardChange(this.m_pHand, tempHandIdx, 1);
            if(credit > optimumCredit) {
                optimumCredit = credit;
                numChangeCard = 1;
                for(var idx=0;idx < numChangeCard;idx++) {
                    handIdx[idx] = tempHandIdx[idx];
                }
            }
        }
        //print(numChangeCard, optimumCredit)

        for(var i=0;i<NUM_HAND;i++) {
            for(var j=i+1;j < NUM_HAND;j++) {
                tempHandIdx[0] = i;
                tempHandIdx[1] = j;
                credit = this.ComputeAvgCreditForCardChange(this.m_pHand, tempHandIdx, 2);

                if(credit > optimumCredit) {
                    optimumCredit = credit;
                    numChangeCard = 2;
                    for(var idx=0;idx < numChangeCard;idx++) {
                        handIdx[idx] = tempHandIdx[idx];
                    }
                }

            }
        }
        //print(numChangeCard, optimumCredit)

        for(var i=0;i<NUM_HAND;i++) {
            for(var j=i+1;j < NUM_HAND;j++) {
                for(var k=j+1;k < NUM_HAND;k++) {
                    tempHandIdx[0] = i;
                    tempHandIdx[1] = j;
                    tempHandIdx[2] = k;
                    credit = this.ComputeAvgCreditForCardChange(this.m_pHand, tempHandIdx, 3)

                    if(credit > optimumCredit) {
                        optimumCredit = credit;
                        numChangeCard = 3;
                        for(var idx=0;idx < numChangeCard;idx++) {
                            handIdx[idx] = tempHandIdx[idx];
                        }
                    }
                }

            }
        }
        //print(numChangeCard, optimumCredit)

        for(var i=0;i<NUM_HAND;i++) {
            for(var j=i+1;j < NUM_HAND;j++) {
                for(var k=j+1;k < NUM_HAND;k++) {
                    for(var l=k+1;l < NUM_HAND;l++) {
                        tempHandIdx[0] = i;
                        tempHandIdx[1] = j;
                        tempHandIdx[2] = k;
                        tempHandIdx[3] = l;
                        credit = this.ComputeAvgCreditForCardChange(this.m_pHand, tempHandIdx, 4)

                        if(credit > optimumCredit) {
                            optimumCredit = credit;
                            numChangeCard = 4;
                            for(var idx=0;idx < numChangeCard;idx++) {
                                handIdx[idx] = tempHandIdx[idx];
                            }
                        }
                    }
                }

            }
        }
        //print(numChangeCard, optimumCredit)

        for(var i=0;i<NUM_HAND;i++) {
            for(var j=i+1;j < NUM_HAND;j++) {
                for(var k=j+1;k < NUM_HAND;k++) {
                    for(var l=k+1;l < NUM_HAND;l++) {
                        for(var m=l+1;m < NUM_HAND;m++) {
                            tempHandIdx[0] = i;
                            tempHandIdx[1] = j;
                            tempHandIdx[2] = k;
                            tempHandIdx[3] = l;
                            tempHandIdx[4] = m;
                            credit = this.ComputeAvgCreditForCardChange(this.m_pHand, tempHandIdx, 5)

                            if(credit > optimumCredit) {
                                optimumCredit = credit;
                                numChangeCard = 5;
                                for(var idx=0;idx < numChangeCard;idx++) {
                                    handIdx[idx] = tempHandIdx[idx];
                                }
                            }
                        }
                    }
                }

            }
        }
        //print(numChangeCard, optimumCredit)

        return {
            first : numChangeCard, 
            second : optimumCredit,
        }
    }
    ChangeHandIdx() {
        var handIdx = new Array(NUM_HAND);
        for(var i=0;i<NUM_HAND;i++){
            handIdx[i] = -1;
        }
        
        values = this.ComputeOptimumChange(handIdx)

        return {
            first : handIdx,
            second : valuse.first,
        }
    }

    ReplaceChangeHandIdx(handIdx, numChangeCard) {
        var changeIdx = new Array(NUM_HAND);
        for(var i=0;i<NUM_HAND;i++){
            changeIdx[i] = -1;
        }
        this.GenerateNCard(changeIdx, NUM_TOTAL - NUM_HAND, numChangeCard);

        for(var i = 0;i<numChangeCard;i++) {
            m_pHand[handIdx[i]].AssignFrom(m_pRemain[changeIdx[i]]);
        }
    }
    ChangeHand()  {
        var handIdx = new Array(NUM_HAND);
        for(var i=0;i<NUM_HAND;i++){
            handIdx[i] = -1;
        }
        
        values = this.ComputeOptimumChange(handIdx)
        //print(optimumCredit)
        
        var changeIdx = new Array(values.first);
        for(var i=0;i<values.first;i++){
            changeIdx[i] = -1;
        }
        this.GenerateNCard(changeIdx, NUM_TOTAL - NUM_HAND, values.first)

        for(var i = 0;i<values.first;i++) {
            m_pHand[handIdx[i]].AssignFrom(m_pRemain[changeIdx[i]]);
        }
    }

    TotalProbability()  {
        var isHand  = new Array(NUM_TOTAL);
        var handIdx = new Array(NUM_HAND);
        for(var i=0;i<NUM_TOTAL;i++){
            isHand[i] = false;
        }
        for(var i=0;i<NUM_HAND;i++){
            handIdx[i] = -1;
        }
        
        var numChangeCard  = 0
        var cntRemain
        var optimumCredit
        var numGame = 0
        var totalCredit = 0.0

        for(var c1=0;c1<NUM_TOTAL;c1++) {
            for(var c2=c1+1;c2<NUM_TOTAL;c2++) {
                for(var c3=c2+1;c3<NUM_TOTAL;c3++) {
                    for(var c4=c3+1;c4<NUM_TOTAL;c4++) {
                        for(var c5=c4+1;c5<NUM_TOTAL;c5++) {
                            for(var i = 0;i<NUM_TOTAL;i++){
                                isHand[i] = false;
                            }
                            this.m_pHand[0].m_number = c1 / 4+1;
                            this.m_pHand[0].m_type = this.ConValToType(c1 % 4);
                            this.m_pHand[1].m_number = c2 / 4+1;
                            this.m_pHand[1].m_type = this.ConValToType(c2 % 4);
                            this.m_pHand[2].m_number = c3 / 4+1;
                            this.m_pHand[2].m_type = this.ConValToType(c3 % 4);
                            this.m_pHand[3].m_number = c4 / 4+1;
                            this.m_pHand[3].m_type = this.ConValToType(c4 % 4);
                            this.m_pHand[4].m_number = c5 / 4+1;
                            this.m_pHand[4].m_type = this.ConValToType(c5 % 4);

                            isHand[c1] = true;
                            isHand[c2] = true;
                            isHand[c3] = true;
                            isHand[c4] = true;
                            isHand[c5] = true;

                            cntRemain = 0;
                            for(var i = 0;i<NUM_TOTAL;i++){
                                if(!isHand[i]) {
                                    this.m_pRemain[cntRemain].m_number = i / 4 + 1;
                                    this.m_pRemain[cntRemain].m_type = this.ConValToType(i % 4);
                                    cntRemain++;
                                }
                            }

                            values = this.ComputeOptimumChange(handIdx)
                            totalCredit += values.second;
                            numGame++;
                            //print("Probability", numGame, totalCredit, Float(totalCredit) / Float(numGame))
                            console.log("Probability " + numGame.toString() + " " + optimumCredit.toString() + " " + totalCredit.toString())
                            /*if(numGame % 10 == 0) {
                                println("Probability" + numGame.toString() + "," + totalCredit.toString() + "," + ((totalCredit.toFloat()) / (numGame.toFloat())).toString())
                            }*/
                        }
                    }
                }
            }
        }
        console.log("Total Probability" + numGame.toString() + "," + totalCredit.toString() + "," + ((totalCredit.toFloat()) / (numGame.toFloat())).toString())
    }
}
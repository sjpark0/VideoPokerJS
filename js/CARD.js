export const TYPE = {
    UNKNOWN : 0,
    CARD_SPADE : 1,
    CARD_CLOVER : 2,
    CARD_HEART : 3,
    CARD_DIAMOND : 4
};
Object.freeze();

export class CARD{
    constructor(){
        this.m_number = -1;
        this.m_type = TYPE.UNKNOWN;
    }
    
    AssignFrom(card){
        this.m_number = card.m_number;
        this.m_type = card.m_type;
    }

    IsSameNumber(card){
        if(this.m_number == card.m_number){
            return true;
        }
        else return false;
    }
    IsSameType(card){
        if(this.m_type == card.m_type){
            return true;
        }
        else return false;
    }
    IsSameCard(card){
        if(this.IsSameNumber(card) && this.IsSameType(card)){
            return true;
        }
        else return false;
    }
    Print(){
        switch(this.m_number){
            case 1:
                console.log("A");
                break;
            case 11:
                console.log("J");
                break;
            case 12:
                console.log("Q");
                break;
            case 13:
                console.log("K");
                break;
            default:
                console.log(this.m_number);
                break;
        }

        switch(this.m_type){
            case TYPE.CARD_CLOVER:
                console.log("Clover");
                break;
            case TYPE.CARD_DIAMOND:
                console.log("Diamond");
                break;
            case TYPE.CARD_HEART:
                console.log("Heart");
                break;
            case TYPE.CARD_SPADE:
                console.log("Spade");
                break;
            default:
                console.log("Unknown");
                break;
        }
        
    }
}
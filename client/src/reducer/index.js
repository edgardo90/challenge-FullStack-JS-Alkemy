import { GET_BALANCE, GET_FINALEXPENDITURE, GET_FINALINCOME, GET_OPERATIONS } from "../actions/types";


const initialState ={
    operations:[],
    balance:[],
    finalIncome:[],
    finalExpenditure:[],
}



function reducer (state=initialState, {type,payload}){
    switch(type){
        case GET_OPERATIONS:
            return{
                ...state,
                operations: payload,
            }

        case GET_BALANCE:
            return{
                ...state,
                balance: payload,
            }

        case GET_FINALINCOME:
            return{
                ...state,
                finalIncome : payload,
            }

        case GET_FINALEXPENDITURE:
            return{
                ...state,
                finalExpenditure: payload
            }

        default: return state;
    }
}


export default reducer;
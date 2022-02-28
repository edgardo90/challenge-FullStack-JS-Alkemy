import { 
    GET_BALANCE,
    GET_FINAL_EXPENDITURE,
    GET_FINAL_INCOME, 
    GET_OPERATIONS,
    POST_OPERATION,
    DELETE_OPERATION } from "../actions/types";


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

        case GET_FINAL_INCOME:
            return{
                ...state,
                finalIncome : payload,
            }

        case GET_FINAL_EXPENDITURE:
            return{
                ...state,
                finalExpenditure: payload
            }

        case POST_OPERATION:
            return{
                ...state
            }

        case DELETE_OPERATION:{
            return{
                ...state
            }
        }

        default: return state;
    }
}


export default reducer;
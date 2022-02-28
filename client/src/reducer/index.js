import { 
    GET_BALANCE,
    GET_FINAL_EXPENDITURE,
    GET_FINAL_INCOME, 
    GET_OPERATIONS,
    POST_OPERATION,
    DELETE_OPERATION,
    FILTER_TYPE } from "../actions/types";


const initialState ={
    operations:[],
    copyOperations:[],
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
                copyOperations: payload,
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

    case FILTER_TYPE:
        // const allOperations = state.copyOperations; 
        // const statusFilter = payload === "All" ? allOperations :
        // allOperations.filter(el => el.type.toLowerCase()  === payload );
        return{
            ...state,
            operations: payload,
        }

        default: return state;
    }
}


export default reducer;
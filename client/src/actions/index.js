import {
    GET_OPERATIONS , 
    GET_BALANCE , 
    GET_FINALEXPENDITURE , 
    GET_FINALINCOME} from "./types";
import axios from "axios";

export function getOperations(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/operations");
        return dispatch({
            type: GET_OPERATIONS,
            payload: json.data
        })
    }
}

export function getBalance(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/balance");
        return dispatch({
            type: GET_BALANCE,
            payload: json.data
        })
    }
}

export function getFinalIncome(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/ingresos");
        return dispatch({
            type: GET_FINALINCOME,
            payload: json.data,
        })
    }
}

export function getFinalExpenditure(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/egresos");
        return dispatch({
            type: GET_FINALEXPENDITURE,
            payload: json.data,
        })
    }
}


import {
    GET_OPERATIONS , 
    GET_BALANCE , 
    GET_FINAL_EXPENDITURE , 
    GET_FINAL_INCOME,
    POST_OPERATION,
    DELETE_OPERATION,
    FILTER_TYPE,
    FILTER_CATEGORY,
    GET_ID_OPERATION,
    ORDER_BY_DATE,
    //
    GET_USERS,
} from "./types";
import axios from "axios";

export function getUsers(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/users/");
        return dispatch({
            type: GET_USERS,
            payload: json.data,
        })
    }
}

export function getOperations(userId){
    return async function(dispatch){
        const json = await axios.get( `http://localhost:3001/operations/${userId}` );
        return dispatch({
            type: GET_OPERATIONS,
            payload: json.data
        })
    }
}

export function getBalance(userId){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/balance/${userId}`);
        return dispatch({
            type: GET_BALANCE,
            payload: json.data
        })
    }
}

export function getFinalIncome(userId){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/ingresos/${userId}`);
        return dispatch({
            type: GET_FINAL_INCOME,
            payload: json.data,
        })
    }
}

export function getFinalExpenditure(userId){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/egresos/${userId}`);
        return dispatch({
            type: GET_FINAL_EXPENDITURE,
            payload: json.data,
        })
    }
}

export function postOperation(payload){
    return async function(dispatch){
        const json = await axios.post("http://localhost:3001/createOperation" , payload);
        return dispatch({
            type : POST_OPERATION,
            json
        })
    }
}

export function deleteOperation(idOperation){
    return async function(dispatch){
        try{
            const json = await axios.delete(`http://localhost:3001/operations/${idOperation}`);
            return dispatch({
                type: DELETE_OPERATION,
                payload: json.data,
            })
        }catch(error){
            alert("no se puede eleminar esa operacion") 
            console.log(error)
        }
    }
}

export function modifyOperation(idOperation , newData){
    return async function(){
        try{
            await axios.put(`http://localhost:3001/modifyOperation/${idOperation}`,{
                name: newData.name,
                money: newData.money,
                date: newData.date,
                category: newData.category,
            });

        }catch(error){
            alert("no se puede modificar esa operacion") 
            console.log(error)
        }
    }
}

export function filterType(userId ,type){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/filterOperations/${userId}/${type}`);
        return dispatch({
            type: FILTER_TYPE,
            payload: json.data,
        })
    }
}

export function filterCategory(userId,category){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/filterCategory/${userId}/${category}`);
        return dispatch({
            type: FILTER_CATEGORY,
            payload: json.data,
        })
    }
}

export function getIdOperation(id){
    return async function(dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/operation/${id}`);
            return dispatch({
                type: GET_ID_OPERATION,
                payload: json.data,
            })
        }catch(error){
            alert("upss hay un error") 
            console.log(error)
        }
    }
}

export function orderByDate(payload){
    return{
        type: ORDER_BY_DATE,
        payload
    }
}

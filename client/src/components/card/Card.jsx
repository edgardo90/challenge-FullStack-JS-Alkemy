import React from "react";
import { Link } from "react-router-dom";
import {useEffect } from "react"
import { useDispatch } from "react-redux";
import { deleteOperation , getBalance, getOperations  , getFinalIncome , getFinalExpenditure  } from "../../actions";

export default function Table({name ,money ,date , type , id ,  }){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getOperations() );
    },[dispatch]);

    useEffect(()=>{
        dispatch(getBalance() );
    },[dispatch]);

    useEffect(()=>{
        dispatch(getFinalIncome() );
    },[dispatch]);

    useEffect(()=>{
        dispatch(getFinalExpenditure() );
    },[dispatch])
    
    function handleDelete(event){
        event.preventDefault();
        let opcion = window.confirm("Estas seguro de eleminar esta operacion");
        if(opcion){
            alert("borando...")
            dispatch(deleteOperation(id.toLowerCase()) );
            console.log(id.toLowerCase() )
            dispatch(getBalance() );
            dispatch(getFinalIncome() );
            dispatch(getFinalExpenditure() );
            dispatch(getOperations() );
            alert("Operacion eleminada")
            dispatch(getBalance() );
            dispatch(getFinalIncome() );
            dispatch(getFinalExpenditure() );
            dispatch(getOperations() );
        }
    }

    return(
        <div>
            <div>
                <h4>Tipo: {type}</h4>
                <h2>Concepto: {name} </h2>
                <h5>Fecha: {date}
                <br />
                Monto: ${money} </h5>
                <Link to={`/modifyOperation/${id}`} ><button>Modificar</button></Link>
                <button onClick={event => handleDelete(event)}  >Eleminar</button>
            </div>
        </div>
    )
}
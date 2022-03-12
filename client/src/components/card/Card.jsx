import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteOperation , } from "../../actions";

import styles from "./css/Card.module.css"

export default function Table({name ,money ,date , type , id , getBalance, getOperations  , getFinalIncome , getFinalExpenditure  }){
    const dispatch = useDispatch();
    
    function handleDelete(event){
        event.preventDefault();
        let opcion = window.confirm("Estas seguro de eleminar esta operacion");
        if(opcion){
            alert("borando...")
            dispatch(deleteOperation(id.toLowerCase()) );
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
                <h4 className={styles.leter}>Tipo: {type}</h4>
                {name.length < 10 ?
                 <h2 className={styles.name} >{`Concepto: ${name}`} </h2> :
                 <h2 className={styles.nameLong} >{`Concepto: ${name}`}</h2> 
                 }
                {/* <h2 className={styles.name} > {name.length <12 ? `Concepto: ${name}` : name } </h2> */}
                <h5 className={styles.leter}>Fecha: {date}
                <br />
                Monto: ${money} </h5>
                <Link to={`/modifyOperation/${id}`} ><button className={styles.buttonModify} >Modificar</button></Link>
                <button onClick={event => handleDelete(event)} className={styles.button}   >Eleminar</button>
            </div>
        </div>
    )
}
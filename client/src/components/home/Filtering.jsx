import React from "react";
import { useDispatch } from "react-redux";
import { filterType } from "../../actions";

import styles from "./css/Filtrado.module.css"

export default function Filtering(){
    const dispatch = useDispatch();

    const types = ["Todos", "Ingresos" , "Egresos"]

    function handleFilter(event){
        dispatch(filterType(event.target.value))
    }

    return(
        <div>
            <label  >Filtrar por Tipo : 
            <select onChange={handleFilter} className={styles.select}>
                {types.map(el => {
                    return(
                        <option value={el.toLocaleLowerCase()} key={el} >{el} </option>
                    )
                })}
            </select>
            </label>
        </div>
    )
}
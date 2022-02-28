import React from "react";
import { useDispatch } from "react-redux";
import { filterType } from "../../actions";

import styles from "./css/Filtrado.module.css"

export default function Filtering(){
    const dispatch = useDispatch();

    function handleFilter(event){
        dispatch(filterType(event.target.value))
    }

    // const types = ["ingreso" , "egreso"]

    return(
        <div>
            <select onChange={handleFilter} className={styles.select}>
                <option value="All">Filtrado por tipo /ingresos y egresos</option>
                <option value="ingreso" >Ingresos</option>
                <option value="egreso">Egresos</option>
            </select>
        </div>
    )
}
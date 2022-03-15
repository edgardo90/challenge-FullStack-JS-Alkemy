import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { filterType } from "../../actions";

import styles from "./css/Filtrado.module.css"

export default function Filtering(){
    const dispatch = useDispatch();

    const [data , setData] = useState({type:"" })

    const types = ["Todos", "Ingresos" , "Egresos"];

    const categories = [
        "Alimentacion",
        "Cuentas y pagos",
        "Casa",
        "Transporte",
        "Ropa" ,
        " Salud e hingiene",
        "Diversion",
        "Otros gastos" ];

    function handleFilter(event){
        setData(({
            ...data,
            type: event.target.value
        }))
        dispatch(filterType(event.target.value))
        // console.log(data.type)
    }
    
    return(
        <div>
            <label  >Filtrar por Tipo : 
            <select onChange={event=> handleFilter(event)}  className={styles.select}>
                {types.map(el => {
                    return(
                        <option value={el.toLocaleLowerCase()} key={el} >{el} </option>
                    )
                })}
            </select>
            </label>
            {data.type === "egresos" &&
            <select className={styles.select}>
                <option value="">Filtrar por categorias/ todos</option>
                {categories.map(el => {
                    return(
                        <option value={el.toLocaleLowerCase()} key={el} >{el}</option>
                    )
                })}
            </select>
            }
        </div>
    )
}
import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { filterType , filterCategory } from "../../actions";

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
        "Salud e hingiene",
        "Diversion",
        "Otros gastos" ];

    function handleFilterType(event){
        setData(({
            ...data,
            type: event.target.value
        }))
        dispatch(filterType(event.target.value))
        // console.log(data.type)
    }

    function handleFilterCategory(event){
        dispatch(filterCategory(event.target.value));
    }


    
    return(
        <div>
            {/* <label  >Filtrar por Tipo: </label> */}
            <select onChange={event=> handleFilterType(event)}  className={styles.select}>
                {types.map(el => {
                    return(
                        <option value={el.toLocaleLowerCase()} key={el} >{el} </option>
                    )
                })}
            </select>
            {data.type === "egresos" &&
            <select className={styles.select} onChange={event => handleFilterCategory(event)} >
                <option value="all">Filtrar por categorias/ todos</option>
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
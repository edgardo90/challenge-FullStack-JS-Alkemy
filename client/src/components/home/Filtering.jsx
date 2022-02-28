import React from "react";
import { useDispatch } from "react-redux";
import { filterType } from "../../actions";

export default function Filtering(){
    const dispatch = useDispatch();

    function handleFilter(event){
        dispatch(filterType(event.target.value))
    }

    const types = ["ingreso" , "egreso"]

    return(
        <div>
            <select onChange={event => handleFilter(event)}>
                <option value="All">Filtrado por tipo /ingresos y egresos</option>
                {types.map(el =>{
                    return(
                        <option value={el} key={el} >{el}</option>
                    )
                })}
            </select>
        </div>
    )
}
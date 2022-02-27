import React from "react";

export default function Table({name ,money ,date , type }){
    return(
        <div>
            <div>
                <h4>Tipo: {type}</h4>
                <h2>Concepto: {name} </h2>
                <h5>Fecha: {date}
                <br />
                Monto: {money} </h5>
                <button>Modificar</button>
                <button>Eleminar</button>
            </div>
        </div>
    )
}
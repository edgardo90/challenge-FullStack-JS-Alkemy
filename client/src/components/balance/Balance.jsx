import React from "react";

export default function Balance( {finalBalance , finalIncome , finalExpenditure } ){
    return(
        <div>
            <h1>Balance actual:
                <br />
                ${finalBalance}
            </h1>
            <h5>Total de ingresos:  {finalIncome}</h5>
            <h5>Total de egresos:   {finalExpenditure}</h5>
        </div>
    )
}
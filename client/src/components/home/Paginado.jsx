import React from "react";


export default function Paginado({allOperations , operationsPerPage, paginado }){
    const pageNumber = [];
    let number = Math.ceil(allOperations / operationsPerPage);
    for(let i=1; i <= number ; i++){
        pageNumber.push(i);
    }
    return(
        <nav>
            <ul>
                {pageNumber && 
                pageNumber.map( el => {
                    return(
                        <button key={el} onClick= {() => paginado(el) }  >{el}</button>
                    )
                }) }
            </ul>
        </nav>
    )
}
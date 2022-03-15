import React from "react";
import {useEffect, useState } from "react"
import {useDispatch , useSelector} from "react-redux";
import {getOperations , getBalance , getFinalIncome , getFinalExpenditure} from "../../actions/index"
import Balance from "../balance/Balance";
import Card from "../card/Card";
import {Link} from "react-router-dom"
import Paginado from "./Paginado";
import Filtering from "./Filtering";


// import logo from "./css/logo512.png"
import loading from "./css/cargando.gif"
import styles from "./css/Home.module.css"


export default function Home(){
     const dispatch = useDispatch();
     const allOperations = useSelector(state => state.operations);
     const finalBalance = useSelector(state => state.balance);
     const finalIncome = useSelector(state => state.finalIncome);
     const finalExpenditure = useSelector(state => state.finalExpenditure)

     const [currentPage , setCurrentPage] = useState(1);
     const [operationsPerPage] = useState(10);
     const indexOfLastOperations = currentPage * operationsPerPage;
     const indexOfFirstOperations = indexOfLastOperations - operationsPerPage;
     const currentOperations = allOperations.slice(indexOfFirstOperations , indexOfLastOperations);
    //  console.log(currentOperations)
     
     const paginado = (pageNumber) =>{
         setCurrentPage(pageNumber);
     }



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

    //  console.log(allOperations)
    //  console.log(finalBalance)
    //  console.log(finalIncome)
    //  console.log(finalExpenditure)

    function handleClick(event){ // handle para recargar la pagina
        event.preventDefault();
        dispatch(getBalance() );
        dispatch(getFinalIncome() );
        dispatch(getFinalExpenditure() );
        dispatch(getOperations() );
    }


    const [time , setTime] = useState("cargando...")
    useEffect(()=>{ // cuando pase x tiempo el setTime se va a setear a un strig vacio para dejar de mostar el "time"
        setTimeout(()=>{
            setTime("") 
        },15000)
    },[])
    // console.log(time)

    if(time){ // un time para simular que la pagina esta cargando
        return(
            <div>
                <div className={styles.selectAndButton}>
                 <button  className={styles.button}  onClick={event => handleClick(event)}>Recargar la app</button>
                 <Filtering/>
                 <Link to="/createOperation"  ><button  className={styles.button} >Crear operacion</button> </Link>
                </div>
                <br />
                <h1 className={styles.h1} >Presopuesto App</h1>
                <div className={styles.notCountryes} >
                    {/* <img src={logo} alt="cargando ..." /> */}
                     <img className= {styles.imag} src={loading} alt="Loading" /> 
                    <h1>{time} </h1> 
                </div>
            </div>
        )
    }

     return(
         <div>
             <div className={styles.selectAndButton}>
                 <button  className={styles.button}  onClick={event => handleClick(event)}>Recargar la app</button>
                 <Filtering/>
                 <Link to="/createOperation"  ><button  className={styles.button} >Crear operacion</button> </Link>
             </div>
                <h1 className={styles.h1} >Presopuesto App</h1>
             <br />
             <div className={styles.balance} >
                <Balance
                 finalBalance = {finalBalance}
                 finalIncome = {finalIncome}
                 finalExpenditure = {finalExpenditure} 
                 />
             </div>
             <br />
             <div className={styles.divCard} >
                 { currentOperations.length > 0 ? currentOperations.map(el =>{
                     return(
                         <div key={el.id} className={el.type === "egreso" ? styles.cardEgreso : styles.card} >
                             <Card
                             name = {el.name}
                             type = {el.type}
                             date = {el.date}
                             money = {el.money}
                             id = {el.id}
                             getBalance={getBalance}
                             getOperations={getOperations}
                             getFinalIncome={getFinalIncome}
                             getFinalExpenditure={getFinalExpenditure}
                             />
                         </div>
                     )
                 }) : <h1 className={styles.notCountryes}>No hay operaciones</h1>
                   }
             </div>
             <div className={styles.paginado}>
                 <footer>
                 <Paginado
                 operationsPerPage={operationsPerPage}
                 allOperations={allOperations.length}
                 paginado= {paginado}
                 />
                 </footer>
             </div>
         </div>
     )
}

// export default Home;
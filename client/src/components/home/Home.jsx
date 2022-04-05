import React from "react";
import {useEffect, useState } from "react"
import {useDispatch , useSelector} from "react-redux";
import {getOperations , getBalance , getFinalIncome , getFinalExpenditure, getEmailUser } from "../../actions/index"
import {Link} from "react-router-dom"
import Balance from "../balance/Balance";
import Card from "../card/Card";
import Paginado from "./Paginado";
import Filtering from "./Filtering";
import OrderDate from "./OrderDate";

import { useAuth } from "../AuthProvider";


import loading from "./css/cargando.gif"
import styles from "./css/Home.module.css"


export default function Home(){
     const {logout ,user ,} = useAuth() // traigo el user importado de AuthProvider.js
     console.log(user.email)

     const dispatch = useDispatch();
     const allOperations = useSelector(state => state.operations);
     const finalBalance = useSelector(state => state.balance);
     const finalIncome = useSelector(state => state.finalIncome);
     const finalExpenditure = useSelector(state => state.finalExpenditure);
     const userByEmail =  useSelector( state =>  state.userEmail);
     const [ , setOrder] = useState("");
     

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
         dispatch(getOperations(userByEmail.id) );
     },[dispatch, userByEmail.id]);

     useEffect(()=>{
         dispatch(getBalance(userByEmail.id) );
     },[dispatch, userByEmail.id]);

     useEffect(()=>{
         dispatch(getFinalIncome(userByEmail.id) );
     },[dispatch,userByEmail.id]);

     useEffect(()=>{
         dispatch(getFinalExpenditure(userByEmail.id) );
     },[dispatch, userByEmail.id ])

     useEffect(()=>{
         dispatch(getEmailUser( user.email)) 
     },[dispatch,user.email]) 
    //  console.log(userByEmail)

    //  console.log(allOperations)
    //  console.log(finalBalance)
    //  console.log(finalIncome)
    //  console.log(finalExpenditure)

    function handleClick(event){ // handle para recargar la pagina
        event.preventDefault();
        dispatch(getBalance(userByEmail.id) );
        dispatch(getFinalIncome(userByEmail.id) );
        dispatch(getFinalExpenditure(userByEmail.id) );
        dispatch(getOperations(userByEmail.id) );
    }


    function handleLogout(){
        logout();
    }


    const [time , setTime] = useState("cargando...")
    useEffect(()=>{ // cuando pase x tiempo el setTime se va a setear a un strig vacio para dejar de mostar el "time"
        setTimeout(()=>{
            setTime("") 
        },9000)
    },[])
    // console.log(time)


    if(time){ // un time para simular que la pagina esta cargando
        return(
            <div>
                <div className={styles.selectAndButton}>
                 <button  className={styles.button}  onClick={event => handleClick(event)}>Recargar la app</button>
                 <Filtering userId={userByEmail.id}/>
                 <OrderDate setCurrentPage={setCurrentPage} setOrder={setOrder} />
                 <Link to="/createOperation"  ><button   className={styles.button} >Crear operacion</button> </Link>
                 <button className={styles.button}  onClick={handleLogout} >Salir de la sesion</button>
                </div>
                <br />
                <h1 className={styles.h1} >Presopuesto App, bienbenido {userByEmail && userByEmail.name}</h1>
                <div className={styles.notOperation} >
                    <img className= {styles.imag} src={loading} alt="Loading" /> 
                    <h2>{time} </h2> 
                </div>
            </div>
        )
    }

     return(
         <div>
             <div className={styles.selectAndButton}>
                 <button  className={styles.button}  onClick={event => handleClick(event)}>Recargar la app</button>
                 <Filtering userId={userByEmail.id}/>
                 <OrderDate setCurrentPage={setCurrentPage} setOrder={setOrder} />
                 <Link to="/createOperation"  ><button  className={styles.button} >Crear operacion</button> </Link>
                 <button className={styles.button} onClick={handleLogout} >Salir de la sesion</button>
             </div>
                <h1 className={styles.h1} >Presopuesto App, bienbenido {userByEmail && userByEmail.name}</h1>
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
                             category={el.category}
                             id = {el.id}
                             getBalance={getBalance}
                             getOperations={getOperations}
                             getFinalIncome={getFinalIncome}
                             getFinalExpenditure={getFinalExpenditure}
                             />
                         </div>
                     )
                 }) : <h1 className={styles.notOperation}>No hay operaciones</h1>
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
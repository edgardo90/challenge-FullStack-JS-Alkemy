import React from "react";
import {useEffect, useState } from "react"
import {useDispatch , useSelector} from "react-redux";
import {getOperations , getBalance , getFinalIncome , getFinalExpenditure} from "../../actions/index"
import Balance from "../balance/Balance";
import Card from "../card/Card";
import {Link} from "react-router-dom"
import Paginado from "./Paginado";
import Filtering from "./Filtering";
import OrderDate from "./OrderDate";


// import logo from "./css/logo512.png"
import loading from "./css/cargando.gif"
import styles from "./css/Home.module.css"
import "../../index.css"


export default function Home(){
     const dispatch = useDispatch();
     const allOperations = useSelector(state => state.operations);
     const finalBalance = useSelector(state => state.balance);
     const finalIncome = useSelector(state => state.finalIncome);
     const finalExpenditure = useSelector(state => state.finalExpenditure)
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

    // function handleClick(event){ // handle para recargar la pagina
    //     event.preventDefault();
    //     dispatch(getBalance() );
    //     dispatch(getFinalIncome() );
    //     dispatch(getFinalExpenditure() );
    //     dispatch(getOperations() );
    // }


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
                <div className= {styles.selectAndButton}>
                <div className="dropdown ">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content" >
                        <label tabindex="0" className="btn btn-ghost btn-circle ml-1 " for="my-drawer"  >
                            <svg id="my-drawer"  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 6h16M4 12h16M4 18h15" /></svg>
                        </label>
                    </div> 
                    <div class="drawer-side">
                        <label for="my-drawer" className="drawer-overlay"></label>
                        <ul tabindex="0"  className="menu menu-compact dropdown-content mt-1 p-2 shadow bg-sky-300 rounded-box w-100">
                            <li>
                                <Filtering/>
                            </li>
                            <li>
                                <OrderDate setCurrentPage={setCurrentPage} setOrder={setOrder} /> 
                            </li>
                            <li>
                                <Link to="/createOperation" className={styles.create} >Crear operacion</Link>
                            </li>
                        </ul>
                    </div>
            </div>
            <a href="/" className={styles.reload} >Presopuesto App </a>
                </div>
                <br />
                <h1 className={styles.h1} >Bienvenido</h1>
                <div className={styles.notOperation} >
                     <img className= {styles.imag} src={loading} alt="Loading" /> 
                    <h1>{time} </h1> 
                </div>
            </div>
        )
    }
    
    
     return(
         <div>
            <div className= {styles.selectAndButton}>
            <div className="dropdown ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content" >
                    <label tabindex="0" className="btn btn-ghost btn-circle ml-1 " for="my-drawer"  >
                            <svg id="my-drawer"  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 6h16M4 12h16M4 18h15" /></svg>
                    </label>
                </div> 
                    <div class="drawer-side">
                        <label for="my-drawer" className="drawer-overlay"></label>
                        <ul tabindex="0"  className="menu menu-compact dropdown-content mt-1 p-2 shadow bg-sky-300 rounded-box w-100">
                            <li>
                                <Filtering/>
                            </li>
                            <li>
                                <OrderDate setCurrentPage={setCurrentPage} setOrder={setOrder} /> 
                            </li>
                            <li>
                                <Link to="/createOperation" className={styles.create} >Crear operacion</Link>
                            </li>
                        </ul>
                    </div>
            </div>
            <a href="/" className={styles.reload} >Presopuesto App </a>


                {/* <div className="navbar-start"> // "menu que no  se cierra apretando el botton"
                    <div className="dropdown">
                        <label tabindex="0" className="btn btn-ghost btn-circle ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabindex="0" className="menu menu-compact dropdown-content mt-0 p-2 shadow bg-sky-200 rounded-box w-100">
                            <li>
                                <Filtering/> 
                            </li>
                            <li>
                                <OrderDate setCurrentPage={setCurrentPage} setOrder={setOrder} />        
                            </li>
                            <li>
                                <Link to="/createOperation" className={styles.create} >Crear operacion</Link>
                            </li>
                        </ul>
                    </div>
                    <a href="/" className={styles.reload}>Presopuesto App</a>
                </div> */}

            </div>
                <h1 className={styles.h1} >Bienvenido </h1>
             <br />
             <div className={styles.box} >
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

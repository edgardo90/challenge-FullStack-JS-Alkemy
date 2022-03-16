import React from "react";
import {  useState, useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Link ,useParams , useNavigate} from "react-router-dom";
import { modifyOperation , getIdOperation } from "../../actions";

import styles from "../create/css/OperationCreate.module.css"
import SelectCategories from "../create/SelectCategories";


function validate(input){
    const errors={}
    if(input.name.length > 19){
        errors.name = "Tiene que ser menor de 20 caracteres"
    }
    if(input.money < 0 || (input.money % 1) !== 0  ){
        errors.money= "El monto tiene que ser mayor a 0 y un numero entero"
    }
    return errors
}


export default function ModifyOperation(){
    const {id} = useParams()
    const idOperation = useSelector(state => state.operationId)

    console.log(id)
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() =>{
        dispatch(getIdOperation(id))
    },[dispatch,id])

    console.log(idOperation.id !== id ? "esto es una prueba" : idOperation )
    // const {name , date , money , category} =  idOperation.id === id && idOperation


    const [data , setData] = useState({
        name: "",
        date: "",
        money: "",
        category: "",
    })
    const [errors , setErrors] = useState({})

    function handleSelect(event){
        setData(({
            ...data,
            category: event.target.value === "nada" ? data.category
            : event.target.value
        }));
        console.log(data)
    };

    function handleChange(event){
        setData(({
            ...data,
            [event.target.name] : event.target.value
        }))
        console.log(data)
        setErrors(validate({
            ...data,
            [event.target.name] : event.target.value
        }))
    }

    function handleSubmit(event){
        event.preventDefault();
        if(Object.values(errors).length > 0  ){
            return alert("Observa los errores que estan en color rojo!")
        }
        dispatch(modifyOperation(id, data) );
        alert("Operacion modificada!")
        setData({
            name: "",
            date: "",
            money:"",
            category:"", 
        })
        navigate("/")
    }

        return(
            <div>
                <Link to="/" ><button className={styles.botonHome} >Volver al inicio</button> </Link>
                <h1 className={styles.titulo} >Modifica la operacion</h1>
                <form  onSubmit={event => handleSubmit(event)}  className={styles.formulario} >
                    <div>
                        {idOperation.type === "egreso" &&
                        <SelectCategories handleSelect={event => handleSelect(event)}/>}
                        {!data.category && idOperation.type === "egreso" && 
                        <p style={{color:"black" ,fontWeight:700 , fontSize:14 }}>categoria actual: {idOperation.category} </p>}
                        {idOperation.type === "egreso" && <br/>}
                    </div>
                    <div>
                        <label >Conpeto: </label>
                        <input
                         placeholder={idOperation.name}
                         type="text"
                         value={data.name}
                         name="name"
                         onChange={event => handleChange(event)}
                        />
                        {errors.name && 
                         <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >{errors.name}</p>
                         }
                    </div>
                    <br />
                    <div>
                        <label >Fecha: </label>
                        <input
                         type="date"
                         name="date"
                         value={data.date}
                         onChange={event => handleChange(event)}
                        />
                        {!data.date && 
                        <p style={{color:"black" ,fontWeight:700 , fontSize:14 }}>fecha actual: {idOperation.date} </p>}
                    </div>
                    <br />
                    <div>
                        <label >Monto: </label>
                        <input
                         placeholder={idOperation.money}
                         type="number"
                         name="money"
                         value={data.money}
                         onChange={event => handleChange(event)}
                        />
                        {errors.money && 
                         <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >{errors.money}</p>
                         }
                    </div>
                    <br />
    
                    <button  className={ styles.btnCreate} type="submit"> Agregar operacion </button>
                </form>
            </div>
        )

}
import React from "react";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { Link ,useParams , useNavigate} from "react-router-dom";
import { modifyOperation } from "../../actions";

import styles from "../create/css/OperationCreate.module.css"


function validate(input){
    const errors={}
    if(input.money < 1 || (input.money % 1) !== 0  ){
        errors.money= "El monto tiene que ser mayor a 0 y un numero entero"
    }
    return errors
}


export default function ModifyOperation(){
    const {id} = useParams()
    // console.log(id)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [data , setData] = useState({
        name: "",
        date: "",
        money:"",
    })
    const [errors , setErrors] = useState({})


    function handleChange(event){
        setData(({
            ...data,
            [event.target.name] : event.target.value
        }))
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
        })
        navigate("/")
    }

    return(
        <div>
            <Link to="/" ><button className={styles.botonHome} >Volver al inicio</button> </Link>
            <h1 className={styles.titulo} >Agrega una nueva Operacion</h1>
            <form  onSubmit={event => handleSubmit(event)}  className={styles.formulario} >
                <div>
                    <label >Conpeto: </label>
                    <input
                     type="text"
                     value={data.name}
                     name="name"
                     onChange={event => handleChange(event)}
                    />
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
                </div>
                <br />
                <div>
                    <label >Monto: </label>
                    <input
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
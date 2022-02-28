import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux"
import {Link , useNavigate} from "react-router-dom";
import { postOperation} from "../../actions";

import styles from "./css/OperationCreate.module.css"


function validate(input){
    const errors={}
    if(!input.name){
        errors.name = "Tienes que ingresar un concepto"
    }
    if(!input.money){
        errors.money = "Tienes que ingresar el monto"
    }else if(input.money <= 0 || (input.money % 1) !== 0  ){
        errors.money= "El monto tiene que ser mayor a 0 y un numero entero"
    }
    return errors
}


export default function OperationCreate(){
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [data , setData] = useState({
        type: "",
        name: "",
        date: "",
        money:"",
    })
    const [errors , setErrors] = useState({})

    const type = ["ingreso" , "egreso"]

    function handleRadio(event){
        setData(({
            ...data,
            type: event.target.value
        }))
        console.log(data)
    }
    const errorRadioType = !data.type ? 1 : 0 ;
    const errorDate = !data.date ? 1 : 0 ;

    function handleChange(event){
        setData(({
            ...data,
            [event.target.name] : event.target.value
        }))
        console.log(data)
        setErrors(validate({
            ...data,
            [event.target.value] : event.target.value
        }))
    }

    function handleSubmit(event){
        event.preventDefault();
        if(Object.values(errors).length > 0 || errorRadioType > 0 || errorDate > 0 ){
            return alert("Observa los errores que estan en color rojo!")
        }
        dispatch(postOperation(data) );
        alert("Operacion creada!")
        setData({
            type: "",
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
                    <label >Tipo :  /</label>
                    {type.map( el =>{
                        return(
                            <label key={el}> {el} 
                                <input
                                 type="radio"
                                 id={el}
                                 name="type"
                                 value={el}
                                 onChange={event => handleRadio(event)}
                                />/
                            </label>
                        )
                    })}
                    {!data.type &&
                    <p style={{color:"red" ,fontWeight:700 , fontSize:14 }}> Seleciona si el tipo es ingreso o egreso </p>
                     }
                </div>
                <br />
                <div>
                    <label >Conpeto: </label>
                    <input
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
                     <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >Ingresa una fecha</p>
                     }
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

                <button disabled={!data.name || !data.money} className={!data.name || !data.money ? styles.btn  : styles.btnCreate} type="submit"> Agregar operacion </button>
            </form>
        </div>
    )
}
